import { createAdminClient } from "@/lib/supabase/admin";
import { bootstrapProviders } from "@/lib/providers/bootstrap";
import { getProvider } from "@/lib/providers/registry";
import { analyzeResponse } from "./analyze";
import type { AIProviderId } from "@/lib/providers/types";

export async function processJobAdmin(jobId: string) {
  bootstrapProviders();
  const supabase = createAdminClient();
  const { data: job, error } = await supabase.from("run_jobs").select("*, prompts(prompt), projects(brand_name)").eq("id", jobId).single();
  if (error || !job) throw error ?? new Error("Job not found");
  if (job.status !== "queued" && job.status !== "failed") return;

  await supabase.from("run_jobs").update({ status: "running", attempts: job.attempts + 1, locked_at: new Date().toISOString() }).eq("id", jobId);
  try {
    const adapter = getProvider(job.provider as AIProviderId);
    const result = await adapter.run({ prompt: job.prompts.prompt });
    const analysis = analyzeResponse(result.rawText, job.projects.brand_name, result.citations);
    const { data: run, error: runError } = await supabase.from("provider_runs").insert({
      project_id: job.project_id, prompt_id: job.prompt_id, provider: job.provider, status: "completed",
      response_text: result.rawText, brand_mentioned: analysis.brandMentioned, brand_position: analysis.brandPosition,
      citation_count: analysis.citationCount, started_at: job.locked_at ?? new Date().toISOString(), completed_at: new Date().toISOString(),
      metadata: { captured_at: result.capturedAt },
    }).select("id").single();
    if (runError) throw runError;
    if (result.citations.length) await supabase.from("citations").insert(result.citations.map(c=>({ run_id: run.id, url:c.url, domain:c.domain, title:c.title ?? null })));
    await supabase.from("run_jobs").update({ status:"completed", last_error:null, updated_at:new Date().toISOString() }).eq("id",jobId);
  } catch (e) {
    const message=e instanceof Error?e.message:"Unknown provider error";
    const retry=job.attempts + 1 < job.max_attempts;
    await supabase.from("run_jobs").update({ status:retry?"queued":"failed", last_error:message, available_at:new Date(Date.now()+60000).toISOString(), updated_at:new Date().toISOString() }).eq("id",jobId);
    throw e;
  }
}

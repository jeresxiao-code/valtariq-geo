import { createClient } from "@/lib/supabase/server";
import { getProvider } from "@/lib/providers/registry";
import { analyzeResponse } from "./analyze";
import type { AIProviderId } from "@/lib/providers/types";

export async function processJob(jobId: string) {
  const supabase = await createClient();
  const { data: job, error } = await supabase
    .from("run_jobs")
    .select("*, prompts(prompt), projects(brand_name)")
    .eq("id", jobId)
    .single();
  if (error || !job) throw error ?? new Error("Job not found");

  await supabase.from("run_jobs").update({ status: "running", locked_at: new Date().toISOString() }).eq("id", jobId);

  try {
    const adapter = getProvider(job.provider as AIProviderId);
    const result = await adapter.run({ prompt: job.prompts.prompt });
    const analysis = analyzeResponse(result.rawText, job.projects.brand_name, result.citations);

    const { data: run, error: runError } = await supabase.from("provider_runs").insert({
      project_id: job.project_id,
      prompt_id: job.prompt_id,
      provider: job.provider,
      status: "completed",
      response_text: result.rawText,
      brand_mentioned: analysis.brandMentioned,
      brand_position: analysis.brandPosition,
      citation_count: analysis.citationCount,
      completed_at: new Date().toISOString(),
    }).select("id").single();
    if (runError) throw runError;

    if (result.citations.length) {
      await supabase.from("citations").insert(result.citations.map(c => ({
        run_id: run.id, url: c.url, domain: c.domain, title: c.title ?? null,
      })));
    }
    await supabase.from("run_jobs").update({ status: "completed", updated_at: new Date().toISOString() }).eq("id", jobId);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown provider error";
    await supabase.from("run_jobs").update({ status: "failed", last_error: message, updated_at: new Date().toISOString() }).eq("id", jobId);
    throw e;
  }
}

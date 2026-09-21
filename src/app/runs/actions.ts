"use server";

import { revalidatePath } from "next/cache";
import { after } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { processJobAdmin } from "@/lib/pipeline/process-job-admin";
import type { AIProviderId } from "@/lib/providers/types";

function configuredProviders(): AIProviderId[] {
  const providers: AIProviderId[] = [];
  if (process.env.OPENAI_API_KEY) providers.push("chatgpt");
  if (process.env.GEMINI_API_KEY) providers.push("gemini");
  if (process.env.ANTHROPIC_API_KEY) providers.push("claude");
  if (process.env.PERPLEXITY_API_KEY) providers.push("perplexity");
  if (process.env.DEEPSEEK_API_KEY) providers.push("deepseek");
  return providers;
}

export async function queuePromptRun(formData: FormData) {
  const supabase = await createClient();
  const projectId = String(formData.get("project_id") ?? "");
  const promptId = String(formData.get("prompt_id") ?? "");
  if (!projectId || !promptId) return;

  const providers = configuredProviders();
  if (!providers.length) {
    throw new Error("No AI provider API keys are configured.");
  }

  const jobs = providers.map((provider) => ({
    project_id: projectId,
    prompt_id: promptId,
    provider,
    status: "queued",
  }));

  const { data, error } = await supabase
    .from("run_jobs")
    .insert(jobs)
    .select("id");

  if (error) throw error;

  const jobIds = (data ?? []).map((job) => job.id);
  after(async () => {
    for (const jobId of jobIds) {
      try {
        await processJobAdmin(jobId);
      } catch (error) {
        console.error("Background provider run failed", { jobId, error });
      }
    }
  });

  revalidatePath("/prompts");
  revalidatePath("/results");
}

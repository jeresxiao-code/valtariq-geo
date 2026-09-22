"use server";

import { after } from "next/server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireRunCapacity } from "@/lib/billing/enforce";
import { processJobAdmin } from "@/lib/pipeline/process-job-admin";
import type { AIProviderId } from "@/lib/providers/types";

const providers: AIProviderId[] = ["chatgpt", "gemini", "claude", "perplexity", "deepseek"];

export async function queuePromptRun(fd: FormData) {
  const supabase = await createClient();
  const projectId = String(fd.get("project_id") ?? "");
  const promptId = String(fd.get("prompt_id") ?? "");
  if (!projectId || !promptId) return;

  await requireRunCapacity(providers.length);

  const { data: jobs, error } = await supabase
    .from("run_jobs")
    .insert(providers.map((provider) => ({
      project_id: projectId,
      prompt_id: promptId,
      provider,
      status: "queued",
    })))
    .select("id");

  if (error) throw error;

  // V1 dispatcher: process the jobs after the response is sent. This keeps the
  // database queue/retry model while avoiding a permanently idle queue on Vercel.
  const jobIds = (jobs ?? []).map((job) => job.id);
  after(async () => {
    await Promise.allSettled(jobIds.map((jobId) => processJobAdmin(jobId)));
  });

  revalidatePath("/prompts");
}

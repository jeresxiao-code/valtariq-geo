import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { processJobAdmin } from "@/lib/pipeline/process-job-admin";

function authorized(request: Request) {
  const secret = process.env.WORKER_SECRET;
  return Boolean(secret) && request.headers.get("authorization") === `Bearer ${secret}`;
}

async function drainQueuedJobs() {
  const supabase = createAdminClient();
  const { data: jobs, error } = await supabase
    .from("run_jobs")
    .select("id")
    .eq("status", "queued")
    .lte("available_at", new Date().toISOString())
    .order("created_at")
    .limit(5);

  if (error) throw error;

  const results = [];
  for (const job of jobs ?? []) {
    try {
      await processJobAdmin(job.id);
      results.push({ id: job.id, status: "completed" });
    } catch (error) {
      results.push({
        id: job.id,
        status: "error",
        error: error instanceof Error ? error.message : "unknown",
      });
    }
  }
  return results;
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  try {
    const results = await drainQueuedJobs();
    return NextResponse.json({ processed: results.length, results });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "worker failed" },
      { status: 500 },
    );
  }
}

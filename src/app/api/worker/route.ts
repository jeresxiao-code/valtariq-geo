import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { processJobAdmin } from "@/lib/pipeline/process-job-admin";

function authorized(request: Request) {
  const token = request.headers.get("authorization");
  const workerSecret = process.env.WORKER_SECRET;
  const cronSecret = process.env.CRON_SECRET;

  return Boolean(
    token &&
      ((workerSecret && token === `Bearer ${workerSecret}`) ||
        (cronSecret && token === `Bearer ${cronSecret}`))
  );
}

async function processQueuedJobs() {
  const supabase = createAdminClient();
  const { data: jobs, error } = await supabase
    .from("run_jobs")
    .select("id")
    .eq("status", "queued")
    .lte("available_at", new Date().toISOString())
    .order("created_at")
    .limit(5);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

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

  return NextResponse.json({ processed: results.length, results });
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return processQueuedJobs();
}

export async function GET(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  return processQueuedJobs();
}

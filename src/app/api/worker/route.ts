import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { processJobAdmin } from "@/lib/pipeline/process-job-admin";

export async function POST(request: Request) {
  const token = request.headers.get("authorization");
  if (!process.env.WORKER_SECRET || token !== `Bearer ${process.env.WORKER_SECRET}`) return NextResponse.json({ error:"unauthorized" },{ status:401 });

  const supabase=createAdminClient();
  const { data:jobs,error }=await supabase.from("run_jobs").select("id").eq("status","queued").lte("available_at",new Date().toISOString()).order("created_at").limit(5);
  if(error) return NextResponse.json({ error:error.message },{ status:500 });

  const results=[];
  for(const job of jobs ?? []) {
    try { await processJobAdmin(job.id); results.push({ id:job.id,status:"completed" }); }
    catch(e) { results.push({ id:job.id,status:"error",error:e instanceof Error?e.message:"unknown" }); }
  }
  return NextResponse.json({ processed:results.length,results });
}

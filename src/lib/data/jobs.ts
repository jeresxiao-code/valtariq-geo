import { createClient } from "@/lib/supabase/server";
export async function getJobs(projectId:string,limit=50){const supabase=await createClient();const {data,error}=await supabase.from("run_jobs").select("id,provider,status,attempts,last_error,created_at,prompts(prompt)").eq("project_id",projectId).order("created_at",{ascending:false}).limit(limit);if(error)throw error;return data??[];}

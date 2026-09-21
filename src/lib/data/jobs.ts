import { createClient } from "@/lib/supabase/server";
export async function getJobs(projectId:string){
 const supabase=await createClient();
 const {data,error}=await supabase.from("run_jobs").select("id,prompt_id,provider,status,attempts,last_error,created_at").eq("project_id",projectId).order("created_at",{ascending:false}).limit(100);
 if(error) throw error; return data ?? [];
}

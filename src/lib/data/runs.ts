import { createClient } from "@/lib/supabase/server";

export async function getRecentRuns(projectId: string, limit = 100) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("provider_runs").select("*, prompts(prompt)").eq("project_id", projectId).order("created_at", { ascending: false }).limit(limit);
  if (error) throw error;
  return data;
}

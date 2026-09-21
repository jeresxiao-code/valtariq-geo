import { createClient } from "@/lib/supabase/server";

export async function getPrompts(projectId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("prompts").select("*").eq("project_id", projectId).order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

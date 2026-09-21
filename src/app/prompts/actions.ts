"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createPrompt(formData: FormData) {
  const supabase = await createClient();
  const projectId = String(formData.get("project_id") ?? "");
  const prompt = String(formData.get("prompt") ?? "").trim();
  const category = String(formData.get("category") ?? "Commercial");
  if (!projectId || !prompt) return;
  const { error } = await supabase.from("prompts").insert({ project_id: projectId, prompt, category });
  if (error) throw error;
  revalidatePath("/prompts");
}

export async function deletePrompt(formData: FormData) {
  const supabase = await createClient();
  const id = String(formData.get("id") ?? "");
  if (!id) return;
  const { error } = await supabase.from("prompts").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/prompts");
}

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { AIProviderId } from "@/lib/providers/types";

const defaultProviders: AIProviderId[]=["chatgpt","gemini","claude","perplexity","deepseek"];
export async function queuePromptRun(formData:FormData){const supabase=await createClient();const projectId=String(formData.get("project_id")??"");const promptId=String(formData.get("prompt_id")??"");if(!projectId||!promptId)return;const jobs=defaultProviders.map(provider=>({project_id:projectId,prompt_id:promptId,provider,status:"queued"}));const {error}=await supabase.from("run_jobs").insert(jobs);if(error)throw error;revalidatePath("/prompts");}

"use server";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
export async function addCompetitor(formData:FormData){
 const supabase=await createClient(); const project_id=String(formData.get("project_id")??""); const name=String(formData.get("name")??"").trim(); const domain=String(formData.get("domain")??"").trim();
 if(!project_id||!name)return; const {error}=await supabase.from("competitors").insert({project_id,name,domain:domain||null}); if(error)throw error; revalidatePath("/competitors");
}
export async function removeCompetitor(formData:FormData){
 const supabase=await createClient(); const id=String(formData.get("id")??""); if(!id)return; const {error}=await supabase.from("competitors").update({active:false}).eq("id",id); if(error)throw error; revalidatePath("/competitors");
}

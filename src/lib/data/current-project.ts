import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
export async function requireCurrentProject(){const supabase=await createClient();const {data:{user}}=await supabase.auth.getUser();if(!user)redirect("/login");const {data:project}=await supabase.from("projects").select("*").order("created_at",{ascending:true}).limit(1).maybeSingle();if(!project)redirect("/onboarding");return project;}

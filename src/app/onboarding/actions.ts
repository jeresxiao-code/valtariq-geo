"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function createProject(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const name = String(formData.get("name") ?? "");
  const brandName = String(formData.get("brand_name") ?? "");
  const domain = String(formData.get("domain") ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");

  const { error } = await supabase.from("projects").insert({
    owner_id: user.id, name, brand_name: brandName, domain,
  });
  if (error) redirect("/onboarding?error=project_create_failed");
  redirect("/");
}

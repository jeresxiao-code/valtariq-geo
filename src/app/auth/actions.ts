"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signIn(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    const reason = error.message.toLowerCase().includes("email not confirmed")
      ? "email_not_confirmed"
      : "invalid_credentials";
    redirect(`/login?error=${reason}`);
  }
  redirect("/");
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) redirect("/signup?error=signup_failed");

  // When email confirmation is enabled Supabase creates the user without a
  // session. Do not send that user to an authenticated onboarding route yet.
  if (!data.session) {
    redirect(`/signup?status=check_email&email=${encodeURIComponent(email)}`);
  }

  redirect("/onboarding");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}

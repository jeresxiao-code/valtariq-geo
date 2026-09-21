import Link from "next/link";
import { signUp } from "@/app/auth/actions";

type SignupPageProps = {
  searchParams: Promise<{ status?: string; error?: string; email?: string }>;
};

export default async function SignupPage({ searchParams }: SignupPageProps) {
  const params = await searchParams;
  const checkEmail = params.status === "check_email";
  const failed = params.error === "signup_failed";

  return <main className="flex min-h-screen items-center justify-center bg-background p-6">
    <div className="w-full max-w-md rounded-xl border border-border bg-panel p-8">
      <div className="mb-8">
        <div className="text-xl font-semibold">{checkEmail ? "Check your email" : "Create account"}</div>
        <div className="mt-1 text-sm text-muted">
          {checkEmail ? "Confirm your email address, then return to VALTARIQ and sign in." : "Start monitoring your brand in AI search."}
        </div>
      </div>

      {checkEmail ? (
        <div className="space-y-5">
          {params.email ? <p className="rounded-md border border-border bg-background p-3 text-sm">Confirmation sent to <span className="font-medium">{params.email}</span>.</p> : null}
          <p className="text-sm text-muted">If you do not see the message, check your spam folder. After confirming the email, use the same email and password to sign in.</p>
          <Link className="block w-full rounded-md bg-accent p-3 text-center text-sm font-medium text-black" href="/login">Continue to sign in</Link>
        </div>
      ) : (
        <>
          {failed ? <p className="mb-4 rounded-md border border-border bg-background p-3 text-sm">Account creation failed. Check the email and password and try again.</p> : null}
          <form action={signUp} className="space-y-4">
            <input name="email" type="email" required placeholder="Work email" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
            <input name="password" type="password" minLength={8} required placeholder="Password" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
            <button className="w-full rounded-md bg-accent p-3 text-sm font-medium text-black">Create account</button>
          </form>
          <p className="mt-5 text-sm text-muted">Already have an account? <Link className="text-accent" href="/login">Sign in</Link></p>
        </>
      )}
    </div>
  </main>;
}

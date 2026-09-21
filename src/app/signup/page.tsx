import Link from "next/link";
import { signUp } from "@/app/auth/actions";

export default function SignupPage() {
  return <main className="flex min-h-screen items-center justify-center bg-background p-6">
    <div className="w-full max-w-md rounded-xl border border-border bg-panel p-8">
      <div className="mb-8"><div className="text-xl font-semibold">Create account</div><div className="mt-1 text-sm text-muted">Start monitoring your brand in AI search.</div></div>
      <form action={signUp} className="space-y-4">
        <input name="email" type="email" required placeholder="Work email" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
        <input name="password" type="password" minLength={8} required placeholder="Password" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
        <button className="w-full rounded-md bg-accent p-3 text-sm font-medium text-black">Create account</button>
      </form>
      <p className="mt-5 text-sm text-muted">Already have an account? <Link className="text-accent" href="/login">Sign in</Link></p>
    </div>
  </main>;
}

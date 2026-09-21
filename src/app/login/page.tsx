import Link from "next/link";
import { signIn } from "@/app/auth/actions";

export default function LoginPage() {
  return <main className="flex min-h-screen items-center justify-center bg-background p-6">
    <div className="w-full max-w-md rounded-xl border border-border bg-panel p-8">
      <div className="mb-8"><div className="text-xl font-semibold">VALTARIQ</div><div className="mt-1 text-sm text-muted">Sign in to GEO Intelligence</div></div>
      <form action={signIn} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
        <button className="w-full rounded-md bg-accent p-3 text-sm font-medium text-black">Sign in</button>
      </form>
      <p className="mt-5 text-sm text-muted">New to VALTARIQ? <Link className="text-accent" href="/signup">Create account</Link></p>
    </div>
  </main>;
}

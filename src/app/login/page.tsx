import Link from "next/link";
import { signIn } from "@/app/auth/actions";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const message = params.error === "email_not_confirmed"
    ? "Confirm your email address before signing in."
    : params.error === "invalid_credentials"
      ? "Email or password is incorrect."
      : null;

  return <main className="flex min-h-screen items-center justify-center bg-background p-6">
    <div className="w-full max-w-md rounded-xl border border-border bg-panel p-8">
      <div className="mb-8"><div className="text-xl font-semibold">VALTARIQ</div><div className="mt-1 text-sm text-muted">Sign in to GEO Intelligence</div></div>
      {message ? <p className="mb-4 rounded-md border border-border bg-background p-3 text-sm">{message}</p> : null}
      <form action={signIn} className="space-y-4">
        <input name="email" type="email" required placeholder="Email" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
        <input name="password" type="password" required placeholder="Password" className="w-full rounded-md border border-border bg-background p-3 text-sm"/>
        <button className="w-full rounded-md bg-accent p-3 text-sm font-medium text-black">Sign in</button>
      </form>
      <p className="mt-5 text-sm text-muted">New to VALTARIQ? <Link className="text-accent" href="/signup">Create account</Link></p>
    </div>
  </main>;
}

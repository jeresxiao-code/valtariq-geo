import { createProject } from "@/app/onboarding/actions";

export default function OnboardingPage() {
  return <main className="flex min-h-screen items-center justify-center bg-background p-6">
    <div className="w-full max-w-xl rounded-xl border border-border bg-panel p-8">
      <div className="mb-8"><div className="text-2xl font-semibold">Create your first project</div><p className="mt-2 text-sm text-muted">Tell VALTARIQ which brand and domain to monitor.</p></div>
      <form action={createProject} className="space-y-5">
        <label className="block text-sm">Project name<input name="name" required placeholder="Global AI Visibility" className="mt-2 w-full rounded-md border border-border bg-background p-3"/></label>
        <label className="block text-sm">Brand name<input name="brand_name" required placeholder="HUACPOWER" className="mt-2 w-full rounded-md border border-border bg-background p-3"/></label>
        <label className="block text-sm">Website domain<input name="domain" required placeholder="huacpower.com" className="mt-2 w-full rounded-md border border-border bg-background p-3"/></label>
        <button className="rounded-md bg-accent px-4 py-3 text-sm font-medium text-black">Create project</button>
      </form>
    </div>
  </main>;
}

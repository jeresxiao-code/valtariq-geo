import { Sidebar } from "@/components/sidebar";

export function PageShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <main className="flex min-h-screen bg-background">
    <Sidebar />
    <section className="flex-1">
      <header className="flex h-16 items-center justify-between border-b border-border px-8">
        <div><div className="text-xs text-muted">Project</div><div className="text-sm font-medium">HUACPOWER</div></div>
        <button className="rounded-md border border-border px-3 py-2 text-sm">Last 30 days</button>
      </header>
      <div className="p-8">
        <div className="mb-7"><h1 className="text-2xl font-semibold">{title}</h1><p className="mt-1 text-sm text-muted">{description}</p></div>
        {children}
      </div>
    </section>
  </main>;
}

export function StatCard({ label, value, note }: { label:string; value:string; note?:string }) {
  return <div className="rounded-lg border border-border bg-panel p-5"><div className="text-sm text-muted">{label}</div><div className="mt-3 text-3xl font-semibold">{value}</div>{note && <div className="mt-2 text-xs text-accent">{note}</div>}</div>;
}

import { PageShell, StatCard } from "@/components/page-shell";
import { prompts } from "@/lib/mock-data";
export default function PromptsPage() {
 return <PageShell title="Prompts" description="Manage the questions used to measure AI search visibility.">
  <div className="grid grid-cols-3 gap-4"><StatCard label="Active prompts" value="24"/><StatCard label="Runs / month" value="4,320"/><StatCard label="Prompt groups" value="5"/></div>
  <div className="mt-6 rounded-lg border border-border bg-panel"><div className="flex items-center justify-between border-b border-border p-5"><span className="font-medium">Prompt library</span><button className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-black">New prompt</button></div>
  <table className="w-full text-sm"><thead className="text-left text-muted"><tr><th className="p-4">Prompt</th><th>Group</th><th>Runs</th><th>Visibility</th></tr></thead><tbody>{prompts.map(p=><tr key={p.id} className="border-t border-border"><td className="p-4">{p.text}</td><td>{p.group}</td><td>{p.runs}</td><td>{p.visibility}%</td></tr>)}</tbody></table></div>
 </PageShell>
}

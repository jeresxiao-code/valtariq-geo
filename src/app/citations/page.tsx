import { PageShell, StatCard } from "@/components/page-shell";
import { citations } from "@/lib/mock-data";
export default function CitationsPage() {
 return <PageShell title="Citations" description="See which domains AI engines use as evidence and where citation gaps exist.">
  <div className="grid grid-cols-3 gap-4"><StatCard label="Citation rate" value="42%" note="+5.4%"/><StatCard label="Unique domains" value="37"/><StatCard label="Owned citations" value="18"/></div>
  <div className="mt-6 rounded-lg border border-border bg-panel p-6"><h2 className="font-medium">Top cited domains</h2><div className="mt-4 divide-y divide-border">{citations.map(c=><div key={c.domain} className="grid grid-cols-[1fr_120px_120px] py-4 text-sm"><span>{c.domain}</span><span>{c.count} citations</span><span className="text-muted">{c.share}% share</span></div>)}</div></div>
 </PageShell>
}

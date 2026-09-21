import { PageShell, StatCard } from "@/components/page-shell";
import { providers } from "@/lib/mock-data";
export default function VisibilityPage() {
 return <PageShell title="AI Visibility" description="Track brand discovery and mentions across AI engines.">
  <div className="grid grid-cols-4 gap-4"><StatCard label="Visibility" value="68%" note="+8.2%"/><StatCard label="Mentions" value="730"/><StatCard label="Engines" value="6"/><StatCard label="Avg. Position" value="3.2"/></div>
  <div className="mt-6 rounded-lg border border-border bg-panel"><div className="border-b border-border p-5 font-medium">Engine performance</div>
   <table className="w-full text-sm"><thead className="text-left text-muted"><tr><th className="p-4">Engine</th><th>Visibility</th><th>Mentions</th><th>Citations</th></tr></thead>
   <tbody>{providers.map(p=><tr key={p.name} className="border-t border-border"><td className="p-4 font-medium">{p.name}</td><td>{p.visibility}%</td><td>{p.mentions}</td><td>{p.citations}</td></tr>)}</tbody></table>
  </div>
 </PageShell>
}

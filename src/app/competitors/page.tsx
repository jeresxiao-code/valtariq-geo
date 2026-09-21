import { PageShell, StatCard } from "@/components/page-shell";
import { competitors } from "@/lib/mock-data";
export default function CompetitorsPage() {
 return <PageShell title="Competitors" description="Compare share of voice, citations and AI visibility.">
  <div className="grid grid-cols-3 gap-4"><StatCard label="Tracked brands" value="4"/><StatCard label="Your SOV" value="22%"/><StatCard label="Visibility gap" value="14 pts"/></div>
  <div className="mt-6 rounded-lg border border-border bg-panel"><table className="w-full text-sm"><thead className="text-left text-muted"><tr><th className="p-4">Brand</th><th>Visibility</th><th>Citations</th><th>Share of voice</th></tr></thead><tbody>{competitors.map(c=><tr key={c.name} className="border-t border-border"><td className="p-4 font-medium">{c.name}</td><td>{c.visibility}%</td><td>{c.citations}</td><td>{c.sov}%</td></tr>)}</tbody></table></div>
 </PageShell>
}

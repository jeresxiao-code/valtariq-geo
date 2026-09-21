import { PageShell, StatCard } from "@/components/page-shell";
const checks=[["AI-readable content","Pass"],["Organization schema","Pass"],["Product schema","Needs work"],["Robots access","Pass"],["llms.txt","Missing"],["Entity consistency","Needs work"]];
export default function AuditPage(){
 return <PageShell title="GEO Audit" description="Technical and content checks that affect AI discovery and citation readiness.">
  <div className="grid grid-cols-3 gap-4"><StatCard label="GEO Score" value="74/100" note="+6 since last audit"/><StatCard label="Passed" value="3"/><StatCard label="Issues" value="3"/></div>
  <div className="mt-6 rounded-lg border border-border bg-panel p-6"><div className="flex justify-between"><h2 className="font-medium">Audit checks</h2><button className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-black">Run audit</button></div><div className="mt-4 divide-y divide-border">{checks.map(([name,status])=><div key={name} className="flex justify-between py-4 text-sm"><span>{name}</span><span className={status==="Pass"?"text-accent":"text-muted"}>{status}</span></div>)}</div></div>
 </PageShell>
}

import { redirect } from "next/navigation";
import { PageShell, StatCard } from "@/components/page-shell";
import { getProjects } from "@/lib/data/projects";
import { getDashboard } from "@/lib/data/dashboard";

export default async function Dashboard() {
 const projects=await getProjects(); if(!projects.length) redirect("/onboarding"); const project=projects[0]; const data=await getDashboard(project.id);
 return <PageShell title="Overview" description="Live AI visibility data from completed monitoring runs." projectName={project.brand_name}>
  <div className="grid grid-cols-4 gap-4"><StatCard label="AI Visibility" value={`${data.mentionRate}%`}/><StatCard label="Citation Rate" value={`${data.citationRate}%`}/><StatCard label="GEO Score" value={String(data.score)}/><StatCard label="Avg. Position" value={data.avgPosition}/></div>
  <div className="mt-6 rounded-lg border border-border bg-panel p-6"><h2 className="font-medium">AI visibility by engine</h2><p className="mt-1 text-xs text-muted">{data.totalRuns} completed runs</p><div className="mt-6 space-y-5">{data.byProvider.map(p=><div key={p.provider}><div className="mb-2 flex justify-between text-sm"><span className="capitalize">{p.provider}</span><span className="text-muted">{p.visibility}% · {p.citations} citations</span></div><div className="h-2 overflow-hidden rounded-full bg-[#242a34]"><div className="h-full rounded-full bg-accent" style={{width:`${p.visibility}%`}}/></div></div>)}</div></div>
 </PageShell>;
}

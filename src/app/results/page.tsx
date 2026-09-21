import { redirect } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getProjects } from "@/lib/data/projects";
import { getRecentRuns } from "@/lib/data/runs";
import { getJobs } from "@/lib/data/jobs";
export default async function ResultsPage(){
 const projects=await getProjects(); if(!projects.length) redirect("/onboarding"); const project=projects[0];
 const [runs,jobs]=await Promise.all([getRecentRuns(project.id,50),getJobs(project.id)]);
 return <PageShell title="Run Results" description="Inspect live AI monitoring jobs and completed responses." projectName={project.brand_name}>
  <div className="grid grid-cols-3 gap-4">{["queued","running","failed"].map(s=><div key={s} className="rounded-lg border border-border bg-panel p-5"><div className="text-sm text-muted">{s}</div><div className="mt-2 text-3xl font-semibold">{jobs.filter(j=>j.status===s).length}</div></div>)}</div>
  <div className="mt-6 rounded-lg border border-border bg-panel"><div className="border-b border-border p-5 font-medium">Completed runs</div><table className="w-full text-sm"><thead className="text-left text-muted"><tr><th className="p-4">Provider</th><th>Prompt</th><th>Mention</th><th>Position</th><th>Citations</th></tr></thead><tbody>{runs.map((r:any)=><tr key={r.id} className="border-t border-border"><td className="p-4">{r.provider}</td><td className="max-w-md truncate">{r.prompts?.prompt}</td><td>{r.brand_mentioned?"Yes":"No"}</td><td>{r.brand_position ?? "—"}</td><td>{r.citation_count ?? 0}</td></tr>)}</tbody></table></div>
 </PageShell>
}

import { redirect } from "next/navigation";
import { PageShell, StatCard } from "@/components/page-shell";
import { getProjects } from "@/lib/data/projects";
import { getPrompts } from "@/lib/data/prompts";
import { createPrompt, deletePrompt } from "./actions";
import { queuePromptRun } from "@/app/runs/actions";

export default async function PromptsPage() {
 const projects=await getProjects(); if(!projects.length) redirect("/onboarding"); const project=projects[0]; const prompts=await getPrompts(project.id);
 return <PageShell title="Prompts" description="Create procurement questions and run them across configured AI providers." projectName={project.brand_name}>
  <div className="grid grid-cols-2 gap-4"><StatCard label="Active prompts" value={String(prompts.filter(p=>p.active).length)}/><StatCard label="Project" value={project.brand_name}/></div>
  <form action={createPrompt} className="mt-6 flex gap-3 rounded-lg border border-border bg-panel p-5"><input type="hidden" name="project_id" value={project.id}/><input name="prompt" required placeholder="e.g. best transformer testing equipment suppliers" className="flex-1 rounded-md border border-border bg-background p-3 text-sm"/><select name="category" className="rounded-md border border-border bg-background px-3 text-sm"><option>Commercial</option><option>Product</option><option>Competitor</option><option>Informational</option></select><button className="rounded-md bg-accent px-4 text-sm font-medium text-black">Add prompt</button></form>
  <div className="mt-6 rounded-lg border border-border bg-panel"><table className="w-full text-sm"><thead className="text-left text-muted"><tr><th className="p-4">Prompt</th><th>Category</th><th>Actions</th></tr></thead><tbody>{prompts.map(p=><tr key={p.id} className="border-t border-border"><td className="p-4">{p.prompt}</td><td>{p.category ?? "—"}</td><td><div className="flex gap-2"><form action={queuePromptRun}><input type="hidden" name="project_id" value={project.id}/><input type="hidden" name="prompt_id" value={p.id}/><button className="rounded-md bg-accent px-3 py-2 text-xs font-medium text-black">Run now</button></form><form action={deletePrompt}><input type="hidden" name="id" value={p.id}/><button className="rounded-md border border-border px-3 py-2 text-xs">Delete</button></form></div></td></tr>)}</tbody></table></div>
 </PageShell>;
}

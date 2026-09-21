import { createClient } from "@/lib/supabase/server";
import { calculateVisibilityScore } from "@/lib/scoring/visibility";

export async function getDashboard(projectId: string) {
  const supabase = await createClient();
  const { data: runs, error } = await supabase.from("provider_runs").select("provider,brand_mentioned,brand_position,citation_count").eq("project_id", projectId).eq("status","completed");
  if (error) throw error;
  const rows=runs ?? [];
  const positions=rows.map(r=>r.brand_position).filter((v):v is number=>typeof v==="number");
  const mentioned=rows.filter(r=>r.brand_mentioned).length;
  const citationRuns=rows.filter(r=>(r.citation_count ?? 0)>0).length;
  const score=calculateVisibilityScore({totalRuns:rows.length,mentionedRuns:mentioned,citationRuns,positions});
  const byProvider=Object.entries(rows.reduce<Record<string,{total:number,mentioned:number,citations:number}>>((acc,r)=>{
    const key=r.provider; acc[key]??={total:0,mentioned:0,citations:0}; acc[key].total++; if(r.brand_mentioned) acc[key].mentioned++; acc[key].citations+=r.citation_count ?? 0; return acc;
  },{})).map(([provider,v])=>({provider,visibility:v.total?Math.round(v.mentioned/v.total*100):0,citations:v.citations}));
  return { totalRuns:rows.length, mentionRate:rows.length?Math.round(mentioned/rows.length*100):0, citationRate:rows.length?Math.round(citationRuns/rows.length*100):0, avgPosition:positions.length?(positions.reduce((a,b)=>a+b,0)/positions.length).toFixed(1):"—", score, byProvider };
}

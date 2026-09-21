import { createClient } from "@/lib/supabase/server";
export async function getCompetitorIntelligence(projectId:string){
 const supabase=await createClient();
 const [{data:competitors,error:cError},{data:runs,error:rError}]=await Promise.all([
  supabase.from("competitors").select("id,name,domain,aliases,active").eq("project_id",projectId).eq("active",true),
  supabase.from("provider_runs").select("id,brand_mentioned").eq("project_id",projectId).eq("status","completed")
 ]);
 if(cError) throw cError; if(rError) throw rError;
 const runIds=(runs??[]).map(r=>r.id);
 let mentions:any[]=[];
 if(runIds.length){const {data,error}=await supabase.from("competitor_mentions").select("competitor_id,position,run_id").in("run_id",runIds); if(error) throw error; mentions=data??[];}
 const totalRuns=(runs??[]).length;
 const ownMentions=(runs??[]).filter(r=>r.brand_mentioned).length;
 const brands=(competitors??[]).map(c=>{const ms=mentions.filter(m=>m.competitor_id===c.id);return {...c,mentions:ms.length,visibility:totalRuns?Math.round(ms.length/totalRuns*100):0,avgPosition:ms.length?(ms.reduce((s,m)=>s+(m.position??10),0)/ms.length).toFixed(1):"—"};});
 const allMentions=ownMentions+brands.reduce((s,b)=>s+b.mentions,0);
 return {own:{mentions:ownMentions,sov:allMentions?Math.round(ownMentions/allMentions*100):0},brands:brands.map(b=>({...b,sov:allMentions?Math.round(b.mentions/allMentions*100):0}))};
}

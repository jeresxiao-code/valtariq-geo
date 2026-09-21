import { createClient } from "@/lib/supabase/server";
export async function getCitationIntelligence(projectId:string){
 const supabase=await createClient();
 const {data,error}=await supabase.from("citations").select("domain,url,title,provider_runs!inner(project_id,provider)").eq("provider_runs.project_id",projectId);
 if(error) throw error;
 const rows=data ?? [];
 const grouped=Object.values(rows.reduce<Record<string,{domain:string,count:number,providers:Set<string>,urls:Set<string>}>>((a:any,r:any)=>{
  const g=a[r.domain]??={domain:r.domain,count:0,providers:new Set<string>(),urls:new Set<string>()}; g.count++; g.providers.add(r.provider_runs.provider); g.urls.add(r.url); a[r.domain]=g; return a;
 },{})).map((g:any)=>({domain:g.domain,count:g.count,providers:[...g.providers],uniqueUrls:g.urls.size})).sort((a:any,b:any)=>b.count-a.count);
 return {total:rows.length,uniqueDomains:grouped.length,domains:grouped};
}

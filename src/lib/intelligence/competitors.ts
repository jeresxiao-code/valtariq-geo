export interface TrackedCompetitor { id:string; name:string; aliases?:string[]; }

export function findCompetitorMentions(text:string, competitors:TrackedCompetitor[]) {
 const haystack=text.toLocaleLowerCase();
 return competitors.flatMap(c=>{
  const terms=[c.name,...(c.aliases ?? [])].filter(Boolean);
  const indexes=terms.map(t=>haystack.indexOf(t.toLocaleLowerCase())).filter(i=>i>=0);
  if(!indexes.length) return [];
  const first=Math.min(...indexes);
  return [{ competitorId:c.id, position:Math.max(1,Math.ceil(first/500)+1) }];
 });
}

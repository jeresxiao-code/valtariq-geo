export type AuditStatus="pass"|"warning"|"fail";
export interface AuditFinding{key:string;label:string;status:AuditStatus;score:number;maxScore:number;evidence:string;recommendation?:string}
export interface GeoAuditResult{url:string;score:number;findings:AuditFinding[];summary:{passed:number;warnings:number;failed:number}}

create table recommendations (
 id uuid primary key default gen_random_uuid(),
 project_id uuid not null references projects(id) on delete cascade,
 source text not null,
 source_key text,
 title text not null,
 description text not null,
 action text not null,
 priority text not null check(priority in('critical','high','medium','low')),
 impact_score integer not null default 0,
 effort_score integer not null default 0,
 status text not null default 'open' check(status in('open','in_progress','done','dismissed')),
 metadata jsonb not null default '{}'::jsonb,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index recommendations_project_status_idx on recommendations(project_id,status,impact_score desc);
alter table recommendations enable row level security;
create policy "project owners can manage recommendations" on recommendations for all using(exists(select 1 from projects p where p.id=project_id and p.owner_id=auth.uid()));

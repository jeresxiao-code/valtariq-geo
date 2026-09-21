create table run_jobs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  prompt_id uuid not null references prompts(id) on delete cascade,
  provider text not null,
  status text not null default 'queued' check (status in ('queued','running','completed','failed')),
  attempts integer not null default 0,
  max_attempts integer not null default 3,
  last_error text,
  available_at timestamptz not null default now(),
  locked_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index run_jobs_queue_idx on run_jobs(status, available_at);
create index provider_runs_project_created_idx on provider_runs(project_id, created_at desc);
create index citations_run_idx on citations(run_id);

alter table run_jobs enable row level security;
create policy "project owners can manage run jobs"
on run_jobs for all using (
  exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
);

alter table provider_runs add column if not exists metadata jsonb not null default '{}'::jsonb;
alter table provider_runs add column if not exists citation_count integer not null default 0;
alter table provider_runs add column if not exists response_hash text;

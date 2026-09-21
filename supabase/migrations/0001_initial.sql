create extension if not exists "pgcrypto";

create table projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  domain text not null,
  brand_name text not null,
  created_at timestamptz not null default now()
);

create table competitors (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  domain text,
  created_at timestamptz not null default now()
);

create table prompts (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  prompt text not null,
  category text,
  locale text default 'en-US',
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table provider_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  prompt_id uuid not null references prompts(id) on delete cascade,
  provider text not null,
  status text not null default 'queued',
  response_text text,
  brand_mentioned boolean,
  brand_position integer,
  sentiment numeric,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table citations (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references provider_runs(id) on delete cascade,
  url text not null,
  domain text not null,
  title text,
  created_at timestamptz not null default now()
);

create table audit_runs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  score integer,
  findings jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

alter table projects enable row level security;
alter table competitors enable row level security;
alter table prompts enable row level security;
alter table provider_runs enable row level security;
alter table citations enable row level security;
alter table audit_runs enable row level security;

create policy "project owners can manage projects"
on projects for all using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);

create policy "project owners can manage competitors"
on competitors for all using (
  exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
);

create policy "project owners can manage prompts"
on prompts for all using (
  exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
);

create policy "project owners can manage runs"
on provider_runs for all using (
  exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
);

create policy "project owners can read citations"
on citations for select using (
  exists (
    select 1 from provider_runs r
    join projects p on p.id = r.project_id
    where r.id = run_id and p.owner_id = auth.uid()
  )
);

create policy "project owners can manage audits"
on audit_runs for all using (
  exists (select 1 from projects p where p.id = project_id and p.owner_id = auth.uid())
);

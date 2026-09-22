create table competitor_mentions (
 id uuid primary key default gen_random_uuid(),
 run_id uuid not null references provider_runs(id) on delete cascade,
 competitor_id uuid not null references competitors(id) on delete cascade,
 mentioned boolean not null default false,
 position integer,
 created_at timestamptz not null default now(),
 unique(run_id, competitor_id)
);
create index competitor_mentions_run_idx on competitor_mentions(run_id);
alter table competitor_mentions enable row level security;
create policy "project owners can read competitor mentions" on competitor_mentions for select using (exists(select 1 from provider_runs r join projects p on p.id=r.project_id where r.id=run_id and p.owner_id=auth.uid()));

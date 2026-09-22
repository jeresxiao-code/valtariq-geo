alter table competitors add column if not exists aliases text[] not null default '{}';
alter table competitors add column if not exists active boolean not null default true;

-- competitor_mentions may already exist from the earlier migration.
-- Keep this migration idempotent so fresh and existing environments converge.
create table if not exists competitor_mentions (
  id uuid primary key default gen_random_uuid(),
  run_id uuid not null references provider_runs(id) on delete cascade,
  competitor_id uuid not null references competitors(id) on delete cascade,
  mentioned boolean not null default false,
  position integer,
  created_at timestamptz not null default now(),
  unique(run_id, competitor_id)
);

alter table competitor_mentions add column if not exists mentioned boolean not null default false;
create index if not exists competitor_mentions_run_idx on competitor_mentions(run_id);
create index if not exists competitor_mentions_competitor_idx on competitor_mentions(competitor_id);

alter table competitor_mentions enable row level security;
drop policy if exists "project owners can read competitor mentions" on competitor_mentions;
create policy "project owners can read competitor mentions"
on competitor_mentions for select using (
  exists (
    select 1 from provider_runs r
    join projects p on p.id = r.project_id
    where r.id = run_id and p.owner_id = auth.uid()
  )
);

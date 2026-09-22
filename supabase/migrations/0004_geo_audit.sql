alter table audit_runs add column if not exists status text not null default 'completed';
alter table audit_runs add column if not exists url text;
alter table audit_runs add column if not exists summary jsonb not null default '{}'::jsonb;
create index if not exists audit_runs_project_created_idx on audit_runs(project_id, created_at desc);

# Production hardening

Implemented in this stage: atomic-ish job claiming with lock tokens, provider-run idempotency keyed by job_id, exponential retry/backoff capped at 15 minutes, usage metering after successful provider persistence, free-checker hourly abuse limiting, and a protected provider-configuration health endpoint.

Before launch: apply migrations; run build/typecheck; configure production secrets; verify worker scheduler and stale-lock recovery; add centralized error reporting; verify database backups; test RLS with multiple accounts; load-test checker and queue; inspect provider terms and rate limits.
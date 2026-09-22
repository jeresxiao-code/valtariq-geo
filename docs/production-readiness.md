# Production readiness

Before public launch: apply all Supabase migrations in order; configure public and service-role Supabase environment variables server-side; seed at least one app_admins row manually; configure provider API keys only in server/worker environments; verify /api/health; enforce usage before queue insertion; record provider_run usage only after a job is accepted/completed according to the chosen billing rule; add worker retries/idempotency and provider health monitoring; enable application error logging and database backups; verify public checker abuse protection and rate limiting; never expose the service-role key to browser code.

Payment checkout is not implemented yet. Plan entitlements are ready for a billing-provider webhook later.
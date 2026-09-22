# Deployment readiness

## Implemented
- Stale worker locks can be recovered through a protected endpoint after 15 minutes.
- Readiness endpoint checks core Supabase/worker secrets and provider-key presence without exposing secret values.
- Production hardening already provides idempotent job persistence, retry/backoff, usage metering and checker throttling.

## External deployment gates
1. Connect the GitHub repository to a Vercel project.
2. Configure production and preview environment variables.
3. Apply Supabase migrations through 0008.
4. Run npm ci, npm run typecheck and npm run build in CI/deployment.
5. Schedule the worker endpoint and stale-lock recovery endpoint using a trusted scheduler with WORKER_SECRET.
6. Verify /api/health and /api/readiness after deployment.
7. Test signup, onboarding, prompt queue, provider run, audit, free checker and shared report with separate test accounts.

At the time this checklist was added, the connected Vercel team returned zero projects, so live build-log diagnosis/deployment verification cannot be performed until the repository is connected to a Vercel project.
# Production deployment

The product direction and application architecture remain unchanged. This checklist only makes the existing application deployable.

## 1. Supabase
Create a Supabase project and run migrations in order from `supabase/migrations`.

Configure:
- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY
- SUPABASE_SERVICE_ROLE_KEY

## 2. Provider secrets
Add only the providers you intend to enable:
- OPENAI_API_KEY
- ANTHROPIC_API_KEY
- GEMINI_API_KEY
- PERPLEXITY_API_KEY
- DEEPSEEK_API_KEY

Also configure `WORKER_SECRET`.

## 3. Vercel
Import this GitHub repository, use the Next.js preset, add the environment variables above, and deploy `main`.

## 4. Smoke test
1. Register and sign in.
2. Create a project.
3. Add a prompt.
4. Queue a run.
5. Invoke the protected worker endpoint.
6. Confirm Run Results and Overview update.
7. Run GEO Audit.
8. Confirm Citations, Competitors and Action Center render.

Do not expose service-role or provider keys to the browser.

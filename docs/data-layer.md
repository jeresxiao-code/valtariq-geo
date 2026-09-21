# Data layer

## Authentication
Supabase Auth is used for email/password authentication. Server actions handle sign-in, sign-up and sign-out.

## Tenant boundary
Each project is owned by an authenticated user. PostgreSQL RLS policies in `supabase/migrations/0001_initial.sql` enforce project ownership for project data.

## Primary flow
1. User signs up.
2. User creates a project with brand + domain.
3. Prompts belong to a project.
4. Provider runs belong to prompts/projects.
5. Citations belong to provider runs.
6. Audit runs belong to projects.

## Environment
Copy `.env.example` to `.env.local` and configure Supabase credentials before running authentication or database features.

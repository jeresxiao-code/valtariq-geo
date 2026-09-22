# Live product flow

The V1 UI now reads from Supabase rather than mock dashboard data.

1. Sign in.
2. Resolve current project.
3. Create prompts.
4. Click Run now.
5. Provider jobs are queued.
6. Worker processes supported providers.
7. Responses, mentions, positions and citations are persisted.
8. Dashboard, AI Visibility and Citations calculate from completed runs.

Google AI Overview remains a separate acquisition surface and is not handled by the API-model worker.

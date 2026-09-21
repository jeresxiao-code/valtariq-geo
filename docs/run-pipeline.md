# Prompt run pipeline

The monitoring pipeline is intentionally provider-agnostic.

```
Prompt
  -> run_jobs
  -> provider adapter
  -> normalized ProviderRunResult
  -> response analysis
  -> provider_runs
  -> citations
  -> visibility scoring
  -> dashboard
```

## Queue lifecycle
Jobs use: queued -> running -> completed / failed.

The database queue is sufficient for early V1. A dedicated Redis/BullMQ worker can replace the dispatcher later without changing the provider/result model.

## Scoring V1
The initial transparent score uses:
- Brand mention rate: 50%
- Citation rate: 30%
- Average position score: 20%

The formula is versionable and should remain explainable to customers.

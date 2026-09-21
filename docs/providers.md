# Provider adapters

V1 uses a replaceable adapter layer. API access is not treated as identical to consumer search UI behavior, so each run stores its provider and capture timestamp.

Implemented adapters:
- OpenAI / ChatGPT adapter
- Anthropic / Claude adapter
- Gemini adapter
- Perplexity adapter
- DeepSeek adapter

Google AI search/AI Overview remains a separate acquisition path because it should not be conflated with the Gemini API.

## Worker
POST `/api/worker` with `Authorization: Bearer $WORKER_SECRET`.
The route claims up to five queued jobs and processes them sequentially. Production can later move this same processing function to a dedicated worker service.

## Required secrets
See `.env.example`. Never expose provider keys in client-side code.

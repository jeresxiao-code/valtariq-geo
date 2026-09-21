import type { AIProvider, ProviderRunResult } from "./types";
import { postJson } from "./http";

export class PerplexityProvider implements AIProvider {
  id = "perplexity" as const;
  async run({ prompt }: { prompt: string }): Promise<ProviderRunResult> {
    const key = process.env.PERPLEXITY_API_KEY;
    if (!key) throw new Error("PERPLEXITY_API_KEY is not configured");
    const data = await postJson<any>("https://api.perplexity.ai/chat/completions", {
      method: "POST", headers: { authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: process.env.PERPLEXITY_MODEL ?? "sonar", messages: [{ role: "user", content: prompt }] }),
    });
    const rawText = data.choices?.[0]?.message?.content ?? "";
    const citations = (data.citations ?? []).map((url:string) => ({ url, domain: new URL(url).hostname.replace(/^www\./, "") }));
    return { provider: this.id, rawText, citations, capturedAt: new Date().toISOString() };
  }
}

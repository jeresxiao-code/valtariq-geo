import type { AIProvider, ProviderRunResult } from "./types";
import { postJson, urlsFromText } from "./http";

export class AnthropicProvider implements AIProvider {
  id = "claude" as const;
  async run({ prompt }: { prompt: string }): Promise<ProviderRunResult> {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) throw new Error("ANTHROPIC_API_KEY is not configured");
    const data = await postJson<any>("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": key, "anthropic-version": "2023-06-01" },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5", max_tokens: 2048, messages: [{ role: "user", content: prompt }] }),
    });
    const rawText = (data.content ?? []).filter((x:any)=>x.type==="text").map((x:any)=>x.text).join("\n");
    return { provider: this.id, rawText, citations: urlsFromText(rawText), capturedAt: new Date().toISOString() };
  }
}

import type { AIProvider, ProviderRunResult } from "./types";
import { postJson, urlsFromText } from "./http";

export class DeepSeekProvider implements AIProvider {
  id = "deepseek" as const;
  async run({ prompt }: { prompt: string }): Promise<ProviderRunResult> {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) throw new Error("DEEPSEEK_API_KEY is not configured");
    const data = await postJson<any>("https://api.deepseek.com/chat/completions", {
      method: "POST", headers: { authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: process.env.DEEPSEEK_MODEL ?? "deepseek-chat", messages: [{ role: "user", content: prompt }] }),
    });
    const rawText = data.choices?.[0]?.message?.content ?? "";
    return { provider: this.id, rawText, citations: urlsFromText(rawText), capturedAt: new Date().toISOString() };
  }
}

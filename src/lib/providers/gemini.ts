import type { AIProvider, ProviderRunResult } from "./types";
import { postJson, urlsFromText } from "./http";

export class GeminiProvider implements AIProvider {
  id = "gemini" as const;
  async run({ prompt }: { prompt: string }): Promise<ProviderRunResult> {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error("GEMINI_API_KEY is not configured");
    const model = process.env.GEMINI_MODEL ?? "gemini-2.5-flash";
    const data = await postJson<any>(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`, {
      method: "POST", body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    });
    const rawText = (data.candidates?.[0]?.content?.parts ?? []).map((x:any)=>x.text ?? "").join("\n");
    return { provider: this.id, rawText, citations: urlsFromText(rawText), capturedAt: new Date().toISOString() };
  }
}

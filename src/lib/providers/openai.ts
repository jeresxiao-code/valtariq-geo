import type { AIProvider, ProviderRunResult } from "./types";
import { postJson, urlsFromText } from "./http";

export class OpenAIProvider implements AIProvider {
  id = "chatgpt" as const;
  async run({ prompt }: { prompt: string }): Promise<ProviderRunResult> {
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error("OPENAI_API_KEY is not configured");
    const data = await postJson<any>("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { authorization: `Bearer ${key}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? "gpt-5", input: prompt }),
    });
    const rawText = data.output_text ?? (data.output ?? []).flatMap((x:any)=>x.content ?? []).map((x:any)=>x.text ?? "").join("\n");
    return { provider: this.id, rawText, citations: urlsFromText(rawText), capturedAt: new Date().toISOString() };
  }
}

export type AIProviderId =
  | "chatgpt"
  | "google-ai"
  | "gemini"
  | "claude"
  | "perplexity"
  | "deepseek";

export interface ProviderRunInput {
  prompt: string;
  locale?: string;
  country?: string;
}

export interface Citation {
  url: string;
  domain: string;
  title?: string;
}

export interface ProviderRunResult {
  provider: AIProviderId;
  rawText: string;
  citations: Citation[];
  capturedAt: string;
}

export interface AIProvider {
  id: AIProviderId;
  run(input: ProviderRunInput): Promise<ProviderRunResult>;
}

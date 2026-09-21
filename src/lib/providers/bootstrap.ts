import { registerProvider } from "./registry";
import { OpenAIProvider } from "./openai";
import { AnthropicProvider } from "./anthropic";
import { GeminiProvider } from "./gemini";
import { PerplexityProvider } from "./perplexity";
import { DeepSeekProvider } from "./deepseek";

let initialized = false;
export function bootstrapProviders() {
  if (initialized) return;
  [new OpenAIProvider(), new AnthropicProvider(), new GeminiProvider(), new PerplexityProvider(), new DeepSeekProvider()].forEach(registerProvider);
  initialized = true;
}

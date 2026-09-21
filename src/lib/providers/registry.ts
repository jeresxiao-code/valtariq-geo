import type { AIProvider, AIProviderId } from "./types";

const adapters = new Map<AIProviderId, AIProvider>();

export function registerProvider(adapter: AIProvider) {
  adapters.set(adapter.id, adapter);
}

export function getProvider(id: AIProviderId) {
  const adapter = adapters.get(id);
  if (!adapter) throw new Error(`Provider adapter not registered: ${id}`);
  return adapter;
}

export function registeredProviders() {
  return [...adapters.keys()];
}

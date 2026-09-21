import type { Citation } from "@/lib/providers/types";

export function analyzeResponse(text: string, brand: string, citations: Citation[]) {
  const normalizedText = text.toLocaleLowerCase();
  const normalizedBrand = brand.toLocaleLowerCase();
  const mentioned = normalizedText.includes(normalizedBrand);
  const firstIndex = mentioned ? normalizedText.indexOf(normalizedBrand) : -1;

  return {
    brandMentioned: mentioned,
    brandPosition: mentioned ? Math.max(1, Math.ceil(firstIndex / 500) + 1) : null,
    citationCount: citations.length,
  };
}

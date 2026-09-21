export interface VisibilityInput {
  totalRuns: number;
  mentionedRuns: number;
  citationRuns: number;
  positions: number[];
}

export function calculateVisibilityScore(input: VisibilityInput) {
  if (!input.totalRuns) return 0;
  const mentionRate = input.mentionedRuns / input.totalRuns;
  const citationRate = input.citationRuns / input.totalRuns;
  const avgPosition = input.positions.length
    ? input.positions.reduce((a, b) => a + b, 0) / input.positions.length
    : 10;
  const positionScore = Math.max(0, 1 - (avgPosition - 1) / 9);
  return Math.round((mentionRate * 0.5 + citationRate * 0.3 + positionScore * 0.2) * 100);
}

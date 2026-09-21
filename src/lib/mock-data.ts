export const providers = [
  { name: "ChatGPT", visibility: 78, mentions: 156, citations: 84 },
  { name: "Gemini", visibility: 65, mentions: 130, citations: 69 },
  { name: "Perplexity", visibility: 59, mentions: 118, citations: 92 },
  { name: "Claude", visibility: 47, mentions: 94, citations: 51 },
  { name: "DeepSeek", visibility: 61, mentions: 122, citations: 63 },
  { name: "Google AI", visibility: 55, mentions: 110, citations: 76 },
];

export const prompts = [
  { id: "p1", text: "best transformer testing equipment manufacturers", group: "Commercial", runs: 180, visibility: 72 },
  { id: "p2", text: "relay test set suppliers for substations", group: "Product", runs: 180, visibility: 64 },
  { id: "p3", text: "OMICRON alternatives for power testing", group: "Competitor", runs: 180, visibility: 58 },
  { id: "p4", text: "high voltage switch testing equipment supplier", group: "Commercial", runs: 180, visibility: 49 },
];

export const citations = [
  { domain: "omicronenergy.com", count: 24, share: 18.2 },
  { domain: "megger.com", count: 21, share: 15.9 },
  { domain: "huacpower.com", count: 18, share: 13.6 },
  { domain: "dv-power.com", count: 15, share: 11.4 },
  { domain: "linkedin.com", count: 12, share: 9.1 },
];

export const competitors = [
  { name: "OMICRON", visibility: 82, citations: 94, sov: 31 },
  { name: "Megger", visibility: 76, citations: 81, sov: 27 },
  { name: "HUACPOWER", visibility: 68, citations: 64, sov: 22 },
  { name: "DV Power", visibility: 57, citations: 53, sov: 20 },
];

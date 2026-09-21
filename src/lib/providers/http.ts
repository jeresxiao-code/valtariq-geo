export async function postJson<T>(url: string, init: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, headers: { "content-type": "application/json", ...(init.headers ?? {}) } });
  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Provider request failed (${response.status}): ${body.slice(0, 500)}`);
  }
  return response.json() as Promise<T>;
}

export function urlsFromText(text: string) {
  const matches = text.match(/https?:\/\/[^\s)\]}>"]+/g) ?? [];
  return [...new Set(matches)].map(url => {
    try { return { url, domain: new URL(url).hostname.replace(/^www\./, "") }; }
    catch { return null; }
  }).filter((v): v is { url: string; domain: string } => Boolean(v));
}

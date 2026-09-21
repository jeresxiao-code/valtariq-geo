import { Sidebar } from "@/components/sidebar";

const metrics = [
  ["AI Visibility", "68%", "+8.2%"],
  ["Citation Rate", "42%", "+5.4%"],
  ["GEO Score", "74", "+6"],
  ["Avg. Position", "3.2", "+0.8"],
];

const providers = [
  ["ChatGPT", 78],
  ["Gemini", 65],
  ["Perplexity", 59],
  ["Claude", 47],
  ["DeepSeek", 61],
  ["Google AI", 55],
];

export default function Dashboard() {
  return (
    <main className="flex min-h-screen bg-background">
      <Sidebar />
      <section className="flex-1">
        <header className="flex h-16 items-center justify-between border-b border-border px-8">
          <div>
            <div className="text-xs text-muted">Project</div>
            <div className="text-sm font-medium">HUACPOWER</div>
          </div>
          <button className="rounded-md border border-border px-3 py-2 text-sm">Last 30 days</button>
        </header>

        <div className="p-8">
          <div className="mb-7">
            <h1 className="text-2xl font-semibold">Overview</h1>
            <p className="mt-1 text-sm text-muted">Monitor how AI engines discover, mention and cite your brand.</p>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {metrics.map(([name, value, delta]) => (
              <div key={name} className="rounded-lg border border-border bg-panel p-5">
                <div className="text-sm text-muted">{name}</div>
                <div className="mt-3 flex items-end justify-between">
                  <div className="text-3xl font-semibold">{value}</div>
                  <div className="text-xs text-accent">{delta}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-[1.6fr_1fr] gap-6">
            <div className="rounded-lg border border-border bg-panel p-6">
              <div className="mb-6">
                <h2 className="font-medium">AI visibility by engine</h2>
                <p className="mt-1 text-xs text-muted">Brand mention rate across monitored prompts</p>
              </div>
              <div className="space-y-5">
                {providers.map(([name, score]) => (
                  <div key={name}>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>{name}</span><span className="text-muted">{score}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-[#242a34]">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${score}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-border bg-panel p-6">
              <h2 className="font-medium">Top citations</h2>
              <p className="mt-1 text-xs text-muted">Domains most frequently cited by AI</p>
              <div className="mt-5 divide-y divide-border text-sm">
                {["omicronenergy.com", "megger.com", "huacpower.com", "dv-power.com", "linkedin.com"].map((domain, i) => (
                  <div key={domain} className="flex justify-between py-3">
                    <span>{domain}</span><span className="text-muted">{24 - i * 3}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

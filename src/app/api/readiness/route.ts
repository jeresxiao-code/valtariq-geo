import { NextResponse } from "next/server";

export async function GET() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "WORKER_SECRET",
  ];
  const providerKeys = [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GEMINI_API_KEY",
    "PERPLEXITY_API_KEY",
    "DEEPSEEK_API_KEY",
  ];

  const missingRequired = required.filter((key) => !process.env[key]);
  const configuredProviders = providerKeys.filter((key) => Boolean(process.env[key])).length;
  const ready = missingRequired.length === 0 && configuredProviders > 0;

  // Do not expose environment-variable names from a public readiness endpoint.
  return NextResponse.json(
    {
      ready,
      required_config_ok: missingRequired.length === 0,
      provider_keys_configured: configuredProviders,
      total_provider_keys: providerKeys.length,
    },
    { status: ready ? 200 : 503 },
  );
}

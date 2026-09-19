/**
 * Environment Variable Type Declarations — LeafBuck Console
 * ──────────────────────────────────────────────────────────
 * TypeScript will now know the shape of all env vars.
 * All NEXT_PUBLIC_* vars are available in the browser.
 * All others (no prefix) are server-only and NEVER exposed to clients.
 */

declare namespace NodeJS {
  interface ProcessEnv {
    // ── App URLs ──────────────────────────────────────────────
    NEXT_PUBLIC_SITE_URL: string;
    NEXT_PUBLIC_CONSOLE_URL: string;

    // ── Supabase ──────────────────────────────────────────────
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;

    // ── Email ─────────────────────────────────────────────────
    RESEND_API_KEY: string;

    // ── Offerwall — Public App IDs (passed to iframe URLs) ────
    NEXT_PUBLIC_BITLABS_APP_TOKEN: string;
    NEXT_PUBLIC_CPX_APP_ID: string;
    NEXT_PUBLIC_LOOTABLY_PLACEMENT_ID: string;
    NEXT_PUBLIC_ADGEM_APP_ID: string;
    NEXT_PUBLIC_OFFERTORO_PUB_ID: string;
    NEXT_PUBLIC_WANNADS_APP_KEY: string;
    NEXT_PUBLIC_AYET_APP_ID: string;

    // ── Offerwall — Secret Postback Keys (server only) ────────
    BITLABS_POSTBACK_SECRET: string;
    CPX_POSTBACK_SECRET: string;
    LOOTABLY_POSTBACK_SECRET: string;
    ADGEM_POSTBACK_SECRET: string;
    OFFERTORO_POSTBACK_SECRET: string;
    WANNADS_POSTBACK_SECRET: string;
    AYET_POSTBACK_SECRET: string;
  }
}

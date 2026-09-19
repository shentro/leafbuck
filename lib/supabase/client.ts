/**
 * Supabase Browser Client
 * ───────────────────────
 * Use this in Client Components ("use client") to interact with Supabase.
 *
 * ─── TO ACTIVATE ─────────────────────────────────────────────────
 * 1. Run: npm install @supabase/supabase-js @supabase/ssr
 * 2. Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 *    in .env.local (copy from Supabase project → Settings → API)
 * 3. Uncomment the code below and delete the stub.
 * ─────────────────────────────────────────────────────────────────
 *
 * USAGE EXAMPLE (in a client component):
 *   import { createClient } from '@/lib/supabase/client'
 *   const supabase = createClient()
 *   const { data, error } = await supabase.auth.signInWithPassword({ email, password })
 */

// ── STUB — uncomment after running npm install ─────────────────────
// import { createBrowserClient } from '@supabase/ssr'
//
// export function createClient() {
//   return createBrowserClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//   )
// }

// Placeholder export so TypeScript doesn't error on import before activation
export function createClient() {
  throw new Error(
    "Supabase client not configured. Follow the setup steps in lib/supabase/client.ts"
  );
}

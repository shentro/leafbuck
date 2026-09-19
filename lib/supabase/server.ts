/**
 * Supabase Server Client
 * ──────────────────────
 * Use this in Server Components and Route Handlers (no "use client").
 *
 * ─── TO ACTIVATE ─────────────────────────────────────────────────
 * 1. Run: npm install @supabase/supabase-js @supabase/ssr
 * 2. Fill in env vars in .env.local
 * 3. Uncomment the code below and delete the stub.
 * ─────────────────────────────────────────────────────────────────
 *
 * USAGE EXAMPLE (in a server component or route handler):
 *   import { createClient } from '@/lib/supabase/server'
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 */

// ── STUB — uncomment after running npm install ─────────────────────
// import { createServerClient } from '@supabase/ssr'
// import { cookies } from 'next/headers'
//
// export async function createClient() {
//   const cookieStore = await cookies()
//   return createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() { return cookieStore.getAll() },
//         setAll(cookiesToSet) {
//           try {
//             cookiesToSet.forEach(({ name, value, options }) =>
//               cookieStore.set(name, value, options)
//             )
//           } catch {} // Ignore in Server Components; middleware handles refresh
//         },
//       },
//     }
//   )
// }

export async function createClient() {
  throw new Error(
    "Supabase server client not configured. Follow the setup steps in lib/supabase/server.ts"
  );
}

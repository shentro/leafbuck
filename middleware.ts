/**
 * middleware.ts — LeafBuck Console Route Protection
 * ──────────────────────────────────────────────────
 * This file protects all dashboard routes. Unauthenticated users
 * are redirected to /login. Authenticated users visiting /login or
 * /signup are redirected to /dashboard.
 *
 * ─── TO ACTIVATE (after Supabase is installed) ───────────────────
 * 1. Run: npm install @supabase/supabase-js @supabase/ssr
 * 2. Replace the STUB implementation below with the ACTIVE implementation.
 * ─────────────────────────────────────────────────────────────────
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ── ACTIVE implementation (uncomment after installing @supabase/ssr) ──
//
// import { createServerClient } from '@supabase/ssr'
//
// export async function middleware(request: NextRequest) {
//   let supabaseResponse = NextResponse.next({ request })
//
//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL!,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
//     {
//       cookies: {
//         getAll() { return request.cookies.getAll() },
//         setAll(cookiesToSet) {
//           cookiesToSet.forEach(({ name, value, options }) =>
//             supabaseResponse.cookies.set(name, value, options)
//           )
//         },
//       },
//     }
//   )
//
//   // IMPORTANT: Do not add logic between createServerClient and getUser()
//   const { data: { user } } = await supabase.auth.getUser()
//
//   const isAuthRoute = ['/login', '/signup'].includes(request.nextUrl.pathname)
//   const isDashboardRoute = !isAuthRoute && !request.nextUrl.pathname.startsWith('/api')
//
//   if (!user && isDashboardRoute) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/login'
//     return NextResponse.redirect(url)
//   }
//
//   if (user && isAuthRoute) {
//     const url = request.nextUrl.clone()
//     url.pathname = '/dashboard'
//     return NextResponse.redirect(url)
//   }
//
//   return supabaseResponse
// }

// ── STUB — passthrough until auth is wired ─────────────────────────
export async function middleware(_request: NextRequest) {
  // WARNING: No auth protection active yet.
  // All routes are publicly accessible until Supabase is configured.
  // See activation instructions above.
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|logo-icon.jpg|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

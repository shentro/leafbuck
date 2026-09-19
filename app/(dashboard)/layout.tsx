import DashboardShell from "@/components/dashboard/DashboardShell";

/**
 * Dashboard layout — wraps all authenticated dashboard pages with
 * the DashboardShell (sidebar + topbar).
 *
 * ─── ROUTE PROTECTION ────────────────────────────────────────────
 * Auth protection is handled in `middleware.ts` at the project root,
 * NOT here. This is the correct Next.js App Router pattern with
 * @supabase/ssr.
 *
 * To activate protection:
 * 1. Install: npm install @supabase/supabase-js @supabase/ssr
 * 2. Uncomment the active implementation in middleware.ts
 * 3. Fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local
 * ────────────────────────────────────────────────────────────────
 */
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}

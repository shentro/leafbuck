"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ui/ThemeProvider";

const navItems = [
  { label: "Dashboard",  href: "/dashboard",  icon: "📊" },
  { label: "Earn",       href: "/earn",        icon: "💰" },
  { label: "Earnings",   href: "/earnings",    icon: "📈" },
  { label: "Referrals",  href: "/referrals",   icon: "🔗" },
  { label: "Settings",   href: "/settings",    icon: "⚙️" },
];

/**
 * DashboardShell — Persistent layout for all authenticated dashboard pages.
 *
 * Desktop: full sidebar with brand, nav links, user profile + theme toggle.
 * Mobile:  topbar with hamburger → slide-in drawer (full sidebar experience).
 *
 * ─── FOR AGENTS ──────────────────────────────────────────────────────────────
 * AUTH GATE: Add route protection in `middleware.ts` (at the project root),
 * not here. Use `@supabase/ssr` (NOT the deprecated @supabase/auth-helpers-nextjs).
 * Example middleware.ts structure:
 *
 *   import { createServerClient } from '@supabase/ssr'
 *   import { NextResponse } from 'next/server'
 *   import type { NextRequest } from 'next/server'
 *
 *   export async function middleware(request: NextRequest) {
 *     // ... refresh session, redirect to /login if no session
 *   }
 *   export const config = { matcher: ['/dashboard/:path*', '/earn', ...] }
 *
 * USER DATA: Replace the placeholder "Alex Smith" / "alex@example.com" below
 * with real values fetched from your Supabase session via server component or
 * a context provider.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  const NavLinks = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex-1 px-3 py-4 space-y-1" aria-label="Dashboard navigation">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClick}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
              isActive
                ? "bg-[#3CB54A] text-white shadow-sm shadow-[#3CB54A]/30"
                : "hover:bg-[#CDEBC5]/50 dark:hover:bg-[#1E5C28]/30"
            }`}
            style={isActive ? {} : { color: "var(--text-muted)" }}
          >
            <span className="text-base">{item.icon}</span>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  const UserFooter = ({ onClick }: { onClick?: () => void }) => (
    <div className="px-4 py-4 border-t" style={{ borderColor: "var(--border)" }}>
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3CB54A] text-sm font-bold text-white flex-shrink-0">
          A
        </div>
        <div className="min-w-0 flex-1">
          {/* TODO: Replace with real user name/email from Supabase session */}
          <p className="truncate text-sm font-semibold" style={{ color: "var(--text-primary)" }}>Alex Smith</p>
          <p className="truncate text-xs" style={{ color: "var(--text-faint)" }}>alex@example.com</p>
        </div>
        <ThemeToggle />
      </div>
      {/* TODO: Wire to supabase.auth.signOut() */}
      <button
        id="sidebar-signout"
        onClick={onClick}
        className="mt-3 w-full rounded-lg py-2 text-xs font-semibold transition hover:bg-red-50 dark:hover:bg-red-900/20"
        style={{ color: "var(--text-faint)" }}
      >
        Sign Out
      </button>
    </div>
  );

  return (
    <div className="flex min-h-screen">
      {/* ── Desktop Sidebar ──────────────────────────────── */}
      <aside
        className="hidden w-60 flex-shrink-0 flex-col border-r lg:flex"
        style={{ background: "var(--bg-sidebar)", borderColor: "var(--border)" }}
      >
        {/* Brand */}
        <div className="flex h-16 items-center gap-2.5 px-5 border-b" style={{ borderColor: "var(--border)" }}>
          <Image src="/logo-icon.jpg" alt="LeafBuck logo" width={28} height={28} className="rounded-md object-contain" />
          <Link href="/dashboard" className="text-lg font-bold text-[#1E5C28] dark:text-[#A3F07D] tracking-tight">
            LeafBuck
          </Link>
        </div>

        <NavLinks />
        <UserFooter />
      </aside>

      {/* ── Mobile Drawer Overlay ─────────────────────────── */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden"
          aria-modal="true"
          role="dialog"
          aria-label="Navigation menu"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDrawerOpen(false)}
          />
          {/* Drawer panel */}
          <aside
            className="absolute left-0 top-0 h-full w-72 flex flex-col shadow-2xl"
            style={{ background: "var(--bg-sidebar)" }}
          >
            {/* Drawer header */}
            <div className="flex h-16 items-center justify-between gap-2 px-5 border-b" style={{ borderColor: "var(--border)" }}>
              <div className="flex items-center gap-2.5">
                <Image src="/logo-icon.jpg" alt="LeafBuck logo" width={28} height={28} className="rounded-md object-contain" />
                <span className="text-lg font-bold text-[#1E5C28] dark:text-[#A3F07D] tracking-tight">LeafBuck</span>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="rounded-lg p-2 hover:bg-[#CDEBC5]/50 dark:hover:bg-[#1E5C28]/30 transition"
                aria-label="Close menu"
                style={{ color: "var(--text-muted)" }}
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <NavLinks onClick={() => setDrawerOpen(false)} />
            <UserFooter onClick={() => setDrawerOpen(false)} />
          </aside>
        </div>
      )}

      {/* ── Main Content ──────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0">

        {/* Mobile topbar */}
        <header
          className="sticky top-0 z-40 flex h-16 items-center justify-between px-4 lg:hidden border-b"
          style={{ background: "var(--bg-topbar)", borderColor: "var(--border)", backdropFilter: "blur(12px)" }}
        >
          <div className="flex items-center gap-2.5">
            <Image src="/logo-icon.jpg" alt="LeafBuck logo" width={26} height={26} className="rounded-md object-contain" />
            <span className="text-base font-bold text-[#1E5C28] dark:text-[#A3F07D]">LeafBuck</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              id="mobile-menu-toggle"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              className="flex h-9 w-9 items-center justify-center rounded-lg transition hover:bg-[#CDEBC5]/50 dark:hover:bg-[#1E5C28]/30"
              style={{ color: "var(--text-primary)" }}
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-6 sm:p-8" style={{ background: "var(--bg-page)" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

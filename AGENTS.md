<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

## ⚠️ READ THIS FIRST — LeafBuck Console Agent Rules

**Before writing any code in this directory, read the master agent instructions:**

📄 [`../../AGENT_INSTRUCTIONS.md`](../../AGENT_INSTRUCTIONS.md)

That file contains the full architecture plan, design system, auth strategy, what is built, and what needs to be built next for the console. All of that applies here.

### Quick Rules for This App (`leafbuck-console/` — console.leafbuck.com dashboard)

1. **ALL dashboard pages live in `app/(dashboard)/`**. They are all wrapped by `DashboardShell.tsx`.
2. **Auth pages live in `app/(auth)/`** — separate layout, centered card style.
3. **The root `app/page.tsx` redirects immediately to `/dashboard`** (or `/login` once auth is wired).
4. **CSS variables** (`var(--text-primary)`, `var(--bg-card)`, `var(--border)`, etc.) handle dark/light mode. Use them everywhere.
5. **No auth is wired yet.** All pages are publicly accessible. The next major task is adding auth middleware.
6. **Stub pages have placeholder data.** Replace with real API/DB calls as backend is built.
7. **Update `AGENT_INSTRUCTIONS.md`** after any significant feature addition.

### Current Dashboard Routes
| Route | File | Status |
|-------|------|--------|
| `/` | `app/page.tsx` | Redirects to `/dashboard` |
| `/login` | `app/(auth)/login/page.tsx` | UI stub, no auth |
| `/signup` | `app/(auth)/signup/page.tsx` | UI stub, no auth |
| `/dashboard` | `app/(dashboard)/page.tsx` | UI stub, placeholder data |
| `/earn` | `app/(dashboard)/earn/page.tsx` | UI stub, placeholder tasks |
| `/earnings` | `app/(dashboard)/earnings/page.tsx` | UI stub, placeholder history |
| `/referrals` | `app/(dashboard)/referrals/page.tsx` | UI stub, placeholder referrals |
| `/settings` | `app/(dashboard)/settings/page.tsx` | UI stub, no save actions |

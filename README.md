# LeafBuck Console — console.leafbuck.com

This is the **member dashboard** for the LeafBuck Get-Paid-To rewards platform.  
It runs at `console.leafbuck.com` and serves authenticated users.

> **All full documentation lives in the root README.**  
> Open [`../README.md`](../README.md) for the complete guide:  
> offerwall setup, Supabase auth, Coolify deployment, database schema, env vars, and more.

---

## Quick Start

```bash
npm install
npm run dev -- --port 3001
# Open http://localhost:3001
```

## Key Files

| File | What It Does |
|------|-------------|
| `consoleConfig.ts` | Enable/disable offerwalls, payout settings, feature flags |
| `middleware.ts` | Route protection — uncomment Supabase block to go live |
| `lib/supabase/client.ts` | Browser Supabase client — uncomment after npm install |
| `lib/supabase/server.ts` | Server Supabase client — uncomment after npm install |
| `app/api/webhooks/[provider]/route.ts` | Offerwall postback handler (all 7 providers) |
| `components/dashboard/DashboardShell.tsx` | Sidebar + mobile drawer layout |
| `env.d.ts` | TypeScript declarations for all env variables |

## Pages

| Route | Status | Notes |
|-------|--------|-------|
| `/login` | UI ready | Auth not wired |
| `/signup` | UI ready | Auth not wired |
| `/dashboard` | UI ready | Placeholder data |
| `/earn` | Dynamic | Reads live providers from consoleConfig.ts |
| `/earnings` | UI ready | Placeholder data |
| `/referrals` | UI ready | Placeholder data |
| `/settings` | UI ready | Placeholder data |

## Build

```bash
npm run build   # Must exit code 0 before every deploy
```

## Current Status

| Layer | Status |
|-------|--------|
| UI | Complete — all pages, dark mode, mobile drawer |
| Auth | Stub — code written, needs npm install + uncomment |
| Data | Placeholder — needs Supabase queries after auth is wired |
| Webhooks | Ready — postback handler built for 7 providers |
| Route protection | Stub — uncomment Supabase block in middleware.ts |

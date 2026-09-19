import type { Metadata } from "next";
import { getActiveOfferwalls, offerwalls, features } from "@/consoleConfig";

export const metadata: Metadata = {
  title: "Earn — LeafBuck Console",
  description: "Browse and complete tasks to earn LeafBuck rewards.",
};

/**
 * /earn page — Dynamically renders active offerwall providers from consoleConfig.ts.
 *
 * ─── HOW TO ADD A NEW OFFERWALL ──────────────────────────────────
 * 1. Open consoleConfig.ts
 * 2. Find the provider (BitLabs, CPX, Lootably, etc.)
 * 3. Set `enabled: true` and fill in your `appId`
 * 4. Done — it appears here automatically.
 *
 * ─── WHEN NO OFFERWALLS ARE ENABLED ─────────────────────────────
 * If no providers are enabled (all `enabled: false`), the placeholder
 * task cards below are shown as a preview/coming-soon state.
 *
 * ─── AFTER SUPABASE AUTH IS WIRED ───────────────────────────────
 * Replace the `PLACEHOLDER_USER_ID` constant with the real user ID
 * from the server session:
 *   const supabase = await createClient()
 *   const { data: { user } } = await supabase.auth.getUser()
 *   const userId = user?.id ?? ''
 * Then pass userId to `buildOfferwallUrl()`.
 * ────────────────────────────────────────────────────────────────
 */

// TODO: Replace with real user ID from Supabase session
const PLACEHOLDER_USER_ID = "demo-user-123";

// Static task cards shown when no offerwalls are enabled yet
const PREVIEW_TASKS = [
  {
    category: "Surveys",
    icon: "📋",
    tasks: [
      { id: "s1", title: "Consumer Habits Survey",   reward: "$0.75", time: "5 min", badge: "Popular" },
      { id: "s2", title: "Tech Preferences Q&A",     reward: "$1.20", time: "8 min", badge: null },
      { id: "s3", title: "Food & Lifestyle Poll",     reward: "$0.50", time: "3 min", badge: "Quick" },
    ],
  },
  {
    category: "Videos",
    icon: "🎬",
    tasks: [
      { id: "v1", title: "Watch a Brand Spotlight",   reward: "$0.10", time: "1 min", badge: "Easy" },
      { id: "v2", title: "Product Demo — 60 seconds", reward: "$0.15", time: "1 min", badge: null },
    ],
  },
  {
    category: "App Installs",
    icon: "📱",
    tasks: [
      { id: "a1", title: "Try GameApp Pro (free)",    reward: "$2.00", time: "10 min", badge: "High Pay" },
      { id: "a2", title: "Install ShopTrack",         reward: "$1.50", time: "5 min",  badge: null },
    ],
  },
];

export default function EarnPage() {
  if (!features.earn) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <p className="text-4xl">🔧</p>
          <h1 className="mt-4 text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Earn is temporarily offline
          </h1>
          <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
            We&apos;re adding new task providers. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  const activeOfferwalls = getActiveOfferwalls();
  const hasLiveOfferwalls = activeOfferwalls.length > 0;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Earn Rewards
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          {hasLiveOfferwalls
            ? "Pick a task type and start earning. New tasks refresh daily."
            : "Task integrations coming soon — here's a preview of what you'll earn."}
        </p>
      </div>

      {/* ── Live Offerwall Embeds (when enabled in consoleConfig.ts) ── */}
      {hasLiveOfferwalls && (
        <div className="space-y-8">
          {activeOfferwalls.map((provider) => {
            // Build the iframe URL with the user's ID injected
            const iframeUrl = provider.iframeUrlTemplate
              .replace("{APP_ID}", provider.appId)
              .replace("{USER_ID}", encodeURIComponent(PLACEHOLDER_USER_ID))
              .replace("{USER_EMAIL}", "");

            return (
              <div key={provider.id}>
                <div className="mb-3 flex items-center gap-2">
                  <h2
                    className="text-sm font-bold uppercase tracking-widest"
                    style={{ color: "var(--text-faint)" }}
                  >
                    {provider.name}
                  </h2>
                  <span
                    className="rounded-full bg-[#CDEBC5] dark:bg-[#1E5C28]/50 px-2 py-0.5 text-xs font-semibold text-[#1E5C28] dark:text-[#A3F07D]"
                  >
                    Live
                  </span>
                </div>
                <p className="mb-3 text-sm" style={{ color: "var(--text-muted)" }}>
                  {provider.description}
                </p>
                {/* Offerwall iframe */}
                <div
                  className="overflow-hidden rounded-2xl"
                  style={{ border: "1px solid var(--border)" }}
                >
                  <iframe
                    title={`${provider.name} offerwall`}
                    src={iframeUrl}
                    width="100%"
                    height="700"
                    frameBorder="0"
                    scrolling="yes"
                    allowFullScreen
                    className="block"
                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-top-navigation"
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Preview Task Cards (when NO offerwalls are enabled yet) ── */}
      {!hasLiveOfferwalls && (
        <>
          {/* Setup prompt */}
          <div
            className="mb-8 rounded-2xl p-5 flex items-start gap-4"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="flex-shrink-0 rounded-xl bg-[#CDEBC5] dark:bg-[#1E5C28]/40 p-3 text-xl">
              🔌
            </div>
            <div>
              <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                No offerwalls are enabled yet
              </p>
              <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
                Open <code className="rounded bg-[#CDEBC5] dark:bg-[#1E5C28]/40 px-1.5 py-0.5 text-xs font-mono text-[#1E5C28] dark:text-[#A3F07D]">consoleConfig.ts</code> and set <code className="rounded bg-[#CDEBC5] dark:bg-[#1E5C28]/40 px-1.5 py-0.5 text-xs font-mono text-[#1E5C28] dark:text-[#A3F07D]">enabled: true</code> on any provider to activate it. Each provider will appear here automatically.
              </p>
              <p className="mt-2 text-xs" style={{ color: "var(--text-faint)" }}>
                Available providers: {offerwalls.map(o => o.name).join(" · ")}
              </p>
            </div>
          </div>

          {/* Preview task cards */}
          <div className="space-y-10 opacity-60">
            {PREVIEW_TASKS.map((category) => (
              <div key={category.category}>
                <h2
                  className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
                  style={{ color: "var(--text-faint)" }}
                >
                  <span>{category.icon}</span>
                  {category.category}
                  <span className="ml-auto rounded-full bg-[#CDEBC5] dark:bg-[#1E5C28]/50 px-2.5 py-0.5 text-xs font-medium text-[#1E5C28] dark:text-[#A3F07D]">
                    Preview
                  </span>
                </h2>
                <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {category.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="flex flex-col justify-between rounded-2xl p-5"
                      style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
                    >
                      <div className="mb-4">
                        {task.badge && (
                          <span className="mb-2 inline-block rounded-full bg-[#CDEBC5] dark:bg-[#1E5C28]/50 px-2.5 py-0.5 text-xs font-semibold text-[#1E5C28] dark:text-[#A3F07D]">
                            {task.badge}
                          </span>
                        )}
                        <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                          {task.title}
                        </p>
                        <p className="mt-1 text-xs" style={{ color: "var(--text-muted)" }}>
                          ⏱ {task.time}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-extrabold text-[#3CB54A]">{task.reward}</span>
                        <span className="rounded-lg bg-[#CDEBC5]/50 dark:bg-[#1E5C28]/30 px-4 py-1.5 text-xs font-bold" style={{ color: "var(--text-muted)" }}>
                          Coming soon
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

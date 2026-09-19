import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard — LeafBuck Console",
};

/**
 * /dashboard page — Overview/home of the member console.
 *
 * ─── STATUS: UI STUB ────────────────────────────────────────
 * This page contains placeholder data. To make it real:
 * 1. Fetch the user's balance, tasks completed, and earnings from your API/DB.
 * 2. Replace the hardcoded numbers below with dynamic data.
 * 3. Add a real "available tasks" list by fetching from the task feed API.
 * ────────────────────────────────────────────────────────────
 */

// Placeholder stats — replace with real data from your API
const stats = [
  { label: "Available Balance", value: "$12.50", icon: "💵", color: "#3CB54A" },
  { label: "Tasks Completed",   value: "47",     icon: "✅", color: "#3CB54A" },
  { label: "Referrals",         value: "3",      icon: "👥", color: "#3CB54A" },
  { label: "Rank",              value: "Silver",  icon: "🥈", color: "#888" },
];

export default function DashboardPage() {
  return (
    <div>
      {/* Welcome header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Good morning, Alex 👋
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Here's what's happening with your account today.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#CDEBC5]/50 dark:bg-[#1E5C28]/30 text-xl">
              {stat.icon}
            </div>
            <p className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
              {stat.value}
            </p>
            <p className="mt-0.5 text-xs font-medium" style={{ color: "var(--text-muted)" }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Cash Out CTA */}
      <div
        className="mb-8 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
        style={{ background: "linear-gradient(135deg, #3CB54A 0%, #1E5C28 100%)" }}
      >
        <div>
          <h2 className="text-lg font-bold text-white">Ready to cash out?</h2>
          <p className="text-sm text-white/80 mt-0.5">You have $12.50 available for withdrawal.</p>
        </div>
        <button
          id="dashboard-cashout"
          className="rounded-xl bg-white px-6 py-2.5 text-sm font-bold text-[#1E5C28] shadow-md transition hover:opacity-90 active:scale-95"
        >
          Cash Out Now
        </button>
      </div>

      {/* Available tasks placeholder */}
      <div>
        <h2 className="mb-4 text-base font-bold" style={{ color: "var(--text-primary)" }}>
          Available Tasks
        </h2>
        <div className="space-y-3">
          {[
            { title: "Quick Survey — Shopping Habits", reward: "+$0.75", time: "5 min", type: "Survey" },
            { title: "Watch a 30-second Ad",           reward: "+$0.10", time: "1 min", type: "Video" },
            { title: "Install & Try SampleApp",        reward: "+$2.00", time: "10 min", type: "App" },
          ].map((task) => (
            <div
              key={task.title}
              className="flex items-center justify-between rounded-xl px-5 py-4 transition hover:shadow-sm"
              style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{task.title}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--text-muted)" }}>
                  {task.type} · {task.time}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#3CB54A]">{task.reward}</span>
                <button className="rounded-lg bg-[#3CB54A] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1E5C28]">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

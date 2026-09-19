import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Referrals — LeafBuck Console",
  description: "Invite friends to LeafBuck and earn bonus rewards for every successful referral.",
};

/**
 * /referrals page — Referral program hub.
 *
 * ─── STATUS: UI STUB ────────────────────────────────────────
 * Build this out by:
 * 1. Generating a real unique referral code/link per user from your DB
 * 2. Fetching referral history (who signed up, earnings per referral)
 * 3. Adding a copy-to-clipboard button for the referral link
 * 4. Wiring the email invite form to a transactional email service (Resend)
 * ────────────────────────────────────────────────────────────
 */

const REFERRALS = [
  { name: "Jane D.",   date: "Sep 10, 2026", status: "Qualified", earned: "$1.00" },
  { name: "Mike R.",   date: "Sep 05, 2026", status: "Qualified", earned: "$1.00" },
  { name: "Sara L.",   date: "Aug 28, 2026", status: "Pending",   earned: "$0.00" },
];

export default function ReferralsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Referral Program
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Earn <span className="font-semibold text-[#3CB54A]">$1.00</span> for every friend who joins and completes their first task.
        </p>
      </div>

      {/* Referral link card */}
      <div
        className="mb-8 rounded-2xl p-6"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        <p className="mb-3 text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
          Your Referral Link
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            id="referral-link"
            readOnly
            value="https://leafbuck.com?ref=ALEX123"
            className="flex-1 rounded-xl px-4 py-3 text-sm font-mono outline-none ring-1 ring-[var(--border)]"
            style={{ background: "var(--bg-page)", color: "var(--text-muted)" }}
          />
          <button
            id="referral-copy"
            className="rounded-xl bg-[#3CB54A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#1E5C28] active:scale-95 whitespace-nowrap"
          >
            Copy Link
          </button>
        </div>
        <p className="mt-3 text-xs" style={{ color: "var(--text-faint)" }}>
          Share this link via social media, email, or text. You earn $1.00 per qualified referral — no limit.
        </p>
      </div>

      {/* Stats row */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "Total Referrals", value: "3" },
          { label: "Qualified",       value: "2" },
          { label: "Bonus Earned",    value: "$2.00" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl p-4 text-center"
            style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
          >
            <p className="text-2xl font-extrabold text-[#3CB54A]">{stat.value}</p>
            <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Referral history */}
      <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
        Referral History
      </h2>
      <div className="overflow-hidden rounded-2xl" style={{ border: "1px solid var(--border)" }}>
        {REFERRALS.map((ref, i) => (
          <div
            key={ref.name}
            className="flex items-center justify-between px-5 py-4"
            style={{
              background: "var(--bg-card)",
              borderTop: i === 0 ? "none" : "1px solid var(--border)",
            }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#CDEBC5] dark:bg-[#1E5C28]/40 text-sm font-bold text-[#1E5C28] dark:text-[#A3F07D]">
                {ref.name[0]}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>{ref.name}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>Joined {ref.date}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  ref.status === "Qualified"
                    ? "bg-[#CDEBC5] dark:bg-[#1E5C28]/50 text-[#1E5C28] dark:text-[#A3F07D]"
                    : "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400"
                }`}
              >
                {ref.status}
              </span>
              <span className="text-sm font-bold text-[#3CB54A]">{ref.earned}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

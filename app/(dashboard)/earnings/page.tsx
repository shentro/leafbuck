import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Earnings — LeafBuck Console",
  description: "View your full earnings history and request payouts.",
};

/**
 * /earnings page — Balance, payout history, and withdrawal flow.
 *
 * ─── STATUS: UI STUB ────────────────────────────────────────
 * Build this out by:
 * 1. Fetching the user's transaction history from your DB
 * 2. Wiring the "Request Payout" button to a real payout flow
 *    (PayPal Payouts API, Tremendous, or manual approval queue)
 * 3. Showing real pending / completed payout status
 * ────────────────────────────────────────────────────────────
 */

// Placeholder transaction history
const TRANSACTIONS = [
  { id: "t1", date: "Sep 18, 2026", description: "Survey — Shopping Habits",  amount: "+$0.75",  status: "completed" },
  { id: "t2", date: "Sep 18, 2026", description: "Video — Brand Spotlight",    amount: "+$0.10",  status: "completed" },
  { id: "t3", date: "Sep 17, 2026", description: "App Install — GameApp Pro",  amount: "+$2.00",  status: "completed" },
  { id: "t4", date: "Sep 16, 2026", description: "Referral Bonus — Jane D.",   amount: "+$1.00",  status: "completed" },
  { id: "t5", date: "Sep 15, 2026", description: "Payout to PayPal",           amount: "-$5.00",  status: "paid" },
  { id: "t6", date: "Sep 14, 2026", description: "Survey — Food Lifestyle",    amount: "+$0.50",  status: "completed" },
  { id: "t7", date: "Sep 14, 2026", description: "Daily Spin Bonus",           amount: "+$0.05",  status: "completed" },
];

const STATUS_STYLES: Record<string, string> = {
  completed: "bg-[#CDEBC5] dark:bg-[#1E5C28]/50 text-[#1E5C28] dark:text-[#A3F07D]",
  paid:       "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  pending:    "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400",
};

export default function EarningsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Earnings & Payouts
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Your full transaction history and available balance.
        </p>
      </div>

      {/* Balance card + payout CTA */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div
          className="rounded-2xl p-6 sm:col-span-2"
          style={{ background: "linear-gradient(135deg, #3CB54A 0%, #1E5C28 100%)" }}
        >
          <p className="text-sm font-medium text-white/70">Available Balance</p>
          <p className="mt-1 text-4xl font-extrabold text-white">$12.50</p>
          <button
            id="earnings-payout"
            className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-[#1E5C28] shadow transition hover:opacity-90 active:scale-95"
          >
            Request Payout
          </button>
        </div>

        <div
          className="flex flex-col justify-between rounded-2xl p-5"
          style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
              All-Time Earned
            </p>
            <p className="mt-1 text-2xl font-extrabold text-[#3CB54A]">$23.40</p>
          </div>
          <div className="mt-4">
            <p className="text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-faint)" }}>
              Total Paid Out
            </p>
            <p className="mt-1 text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>$10.90</p>
          </div>
        </div>
      </div>

      {/* Transaction history */}
      <div>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
          Transaction History
        </h2>
        <div
          className="overflow-hidden rounded-2xl"
          style={{ border: "1px solid var(--border)" }}
        >
          {TRANSACTIONS.map((tx, i) => (
            <div
              key={tx.id}
              className="flex items-center justify-between px-5 py-4 transition hover:bg-[#3CB54A]/5"
              style={{
                background: "var(--bg-card)",
                borderTop: i === 0 ? "none" : `1px solid var(--border)`,
              }}
            >
              <div>
                <p className="text-sm font-semibold" style={{ color: "var(--text-primary)" }}>
                  {tx.description}
                </p>
                <p className="mt-0.5 text-xs" style={{ color: "var(--text-muted)" }}>{tx.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[tx.status] ?? ""}`}>
                  {tx.status}
                </span>
                <span
                  className={`text-sm font-bold tabular-nums ${tx.amount.startsWith("+") ? "text-[#3CB54A]" : ""}`}
                  style={tx.amount.startsWith("-") ? { color: "var(--text-muted)" } : {}}
                >
                  {tx.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

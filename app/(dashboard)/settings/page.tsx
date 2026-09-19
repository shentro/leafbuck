import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings — LeafBuck Console",
  description: "Manage your LeafBuck account settings, payout preferences, and notification options.",
};

/**
 * /settings page — Account management.
 *
 * ─── STATUS: UI STUB ────────────────────────────────────────
 * Build this out by:
 * 1. Pre-filling form values from the authenticated user's profile
 * 2. Wiring save actions to API routes / Supabase updates
 * 3. Adding real payout method management (PayPal email verification)
 * 4. Adding a "Delete Account" flow with confirmation modal
 * 5. Adding a "Change Password" flow (email link or inline form)
 * ────────────────────────────────────────────────────────────
 */
export default function SettingsPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Account Settings
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Manage your profile, payout methods, and notification preferences.
        </p>
      </div>

      {/* Profile section */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
          Profile
        </h2>
        <div className="rounded-2xl p-6 space-y-5" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="settings-firstname" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                First Name
              </label>
              <input
                id="settings-firstname"
                type="text"
                defaultValue="Alex"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
                style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
              />
            </div>
            <div>
              <label htmlFor="settings-lastname" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                Last Name
              </label>
              <input
                id="settings-lastname"
                type="text"
                defaultValue="Smith"
                className="w-full rounded-xl px-4 py-2.5 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
                style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
              />
            </div>
          </div>
          <div>
            <label htmlFor="settings-email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Email Address
            </label>
            <input
              id="settings-email"
              type="email"
              defaultValue="alex@example.com"
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
              style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
            />
          </div>
          <button
            id="settings-save-profile"
            className="rounded-xl bg-[#3CB54A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E5C28] active:scale-95"
          >
            Save Changes
          </button>
        </div>
      </section>

      {/* Payout methods */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
          Payout Method
        </h2>
        <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Choose how you want to receive your earnings. Minimum payout: <strong className="text-[#3CB54A]">$5.00</strong>.
          </p>
          {["PayPal", "Venmo", "Amazon Gift Card", "Visa Gift Card"].map((method) => (
            <label key={method} className="flex cursor-pointer items-center gap-3">
              <input
                type="radio"
                name="payout-method"
                value={method}
                defaultChecked={method === "PayPal"}
                className="accent-[#3CB54A] h-4 w-4"
              />
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{method}</span>
            </label>
          ))}
          <div>
            <label htmlFor="settings-payout-email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              PayPal Email
            </label>
            <input
              id="settings-payout-email"
              type="email"
              placeholder="paypal@example.com"
              className="w-full rounded-xl px-4 py-2.5 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
              style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
            />
          </div>
          <button
            id="settings-save-payout"
            className="rounded-xl bg-[#3CB54A] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#1E5C28] active:scale-95"
          >
            Save Payout Method
          </button>
        </div>
      </section>

      {/* Notifications */}
      <section className="mb-8">
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest" style={{ color: "var(--text-faint)" }}>
          Notifications
        </h2>
        <div className="rounded-2xl p-6 space-y-4" style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}>
          {[
            { id: "notif-new-tasks",  label: "New tasks available",    defaultChecked: true },
            { id: "notif-payout",     label: "Payout confirmed",        defaultChecked: true },
            { id: "notif-referral",   label: "Referral bonus earned",   defaultChecked: true },
            { id: "notif-newsletter", label: "Monthly earnings digest", defaultChecked: false },
          ].map((n) => (
            <label key={n.id} className="flex cursor-pointer items-center justify-between">
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{n.label}</span>
              <input
                id={n.id}
                type="checkbox"
                defaultChecked={n.defaultChecked}
                className="accent-[#3CB54A] h-4 w-4"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Danger zone */}
      <section>
        <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-red-500">
          Danger Zone
        </h2>
        <div className="rounded-2xl p-6 space-y-3" style={{ border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.03)" }}>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Deleting your account is permanent. All your earnings and data will be erased and cannot be recovered.
          </p>
          <button
            id="settings-delete-account"
            className="rounded-xl px-5 py-2.5 text-sm font-bold text-red-500 ring-1 ring-red-400/40 transition hover:bg-red-50 dark:hover:bg-red-900/20 active:scale-95"
          >
            Delete My Account
          </button>
        </div>
      </section>
    </div>
  );
}

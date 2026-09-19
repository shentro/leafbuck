import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up — LeafBuck Console",
  description: "Create your free LeafBuck account and start earning cash rewards today.",
};

/**
 * /signup page
 *
 * ─── FOR AGENTS BUILDING THIS ───────────────────────────────
 * This is a UI stub. To wire up real registration:
 * 1. Choose auth provider: Supabase Auth, Clerk, or NextAuth.
 * 2. Convert to "use client".
 * 3. On submit: call provider's signUp method.
 * 4. On success: redirect to /dashboard or an email-verification page.
 * 5. Add client-side validation (password strength, email format).
 * ─────────────────────────────────────────────────────────────
 */
export default function SignupPage() {
  return (
    <>
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold" style={{ color: "var(--text-primary)" }}>
          Start earning today
        </h1>
        <p className="mt-1 text-sm" style={{ color: "var(--text-muted)" }}>
          Create your free LeafBuck account — takes 30 seconds
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" action="#" method="POST">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="signup-firstname" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              First name
            </label>
            <input
              id="signup-firstname"
              name="firstName"
              type="text"
              autoComplete="given-name"
              required
              placeholder="Alex"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
              style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
            />
          </div>
          <div>
            <label htmlFor="signup-lastname" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
              Last name
            </label>
            <input
              id="signup-lastname"
              name="lastName"
              type="text"
              autoComplete="family-name"
              required
              placeholder="Smith"
              className="w-full rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
              style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Email address
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
            style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium" style={{ color: "var(--text-primary)" }}>
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            placeholder="At least 8 characters"
            className="w-full rounded-xl px-4 py-3 text-sm outline-none ring-1 ring-[var(--border)] transition-all focus:ring-2 focus:ring-[#3CB54A]"
            style={{ background: "var(--bg-page)", color: "var(--text-primary)" }}
          />
        </div>

        {/* Terms checkbox */}
        <div className="flex items-start gap-3">
          <input
            id="signup-terms"
            name="acceptTerms"
            type="checkbox"
            required
            className="mt-1 h-4 w-4 accent-[#3CB54A] cursor-pointer"
          />
          <label htmlFor="signup-terms" className="text-xs leading-relaxed cursor-pointer" style={{ color: "var(--text-muted)" }}>
            I agree to the{" "}
            <a href="https://leafbuck.com/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#3CB54A] hover:text-[#1E5C28]">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="https://leafbuck.com/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-[#3CB54A] hover:text-[#1E5C28]">
              Privacy Policy
            </a>
          </label>
        </div>

        {/* Submit */}
        <button
          id="signup-submit"
          type="submit"
          className="w-full rounded-xl bg-[#3CB54A] py-3 text-sm font-bold text-white shadow-md shadow-[#3CB54A]/25 transition-all hover:bg-[#1E5C28] hover:shadow-lg active:scale-[0.98]"
        >
          Create Free Account
        </button>
      </form>

      {/* Divider */}
      <div className="my-5 flex items-center gap-4">
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--text-faint)" }}>or</span>
        <div className="h-px flex-1" style={{ background: "var(--border)" }} />
      </div>

      {/* Google OAuth placeholder */}
      <button
        id="signup-google"
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl py-3 text-sm font-semibold transition-all hover:opacity-80 active:scale-[0.98]"
        style={{ background: "var(--bg-page)", color: "var(--text-primary)", border: "1px solid var(--border)" }}
      >
        <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Sign up with Google
      </button>

      {/* Login link */}
      <p className="mt-6 text-center text-sm" style={{ color: "var(--text-muted)" }}>
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-[#3CB54A] hover:text-[#1E5C28] transition-colors">
          Log in
        </Link>
      </p>
    </>
  );
}

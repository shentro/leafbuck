/**
 * Auth layout — wraps /login and /signup pages.
 * Centered card layout with the LeafBuck brand in the corner.
 */
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4 py-12"
      style={{ background: "var(--bg-page)" }}
    >
      {/* Subtle decorative blobs */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#A3F07D]/20 dark:bg-[#3CB54A]/10 blur-3xl" />
        <div className="absolute -bottom-20 right-0 h-80 w-80 rounded-full bg-[#CDEBC5]/30 dark:bg-[#1E5C28]/15 blur-3xl" />
      </div>

      {/* Brand mark top-left */}
      <a
        href="https://leafbuck.com"
        className="absolute left-6 top-6 text-lg font-bold text-[#1E5C28] dark:text-[#A3F07D] tracking-tight hover:opacity-80 transition"
        aria-label="Back to LeafBuck home"
      >
        🌿 LeafBuck
      </a>

      {/* Auth card */}
      <div
        className="w-full max-w-md rounded-2xl p-8 shadow-xl shadow-black/5"
        style={{ background: "var(--bg-card)", border: "1px solid var(--border)" }}
      >
        {children}
      </div>
    </div>
  );
}

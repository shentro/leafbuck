"use client";

import { useEffect, useState } from "react";

/**
 * ThemeProvider — Reads saved theme on mount and applies `.dark` to <html>.
 * Uses a custom window event `lb-theme-change` so that multiple ThemeToggle
 * instances on the same page (e.g. sidebar + mobile topbar) stay in sync.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const saved = localStorage.getItem("lb-theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "dark" || (!saved && prefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  return <>{children}</>;
}

/**
 * ThemeToggle — Sun / Moon icon button.
 * Listens to `lb-theme-change` window event so that toggling from one instance
 * (e.g., sidebar) is reflected in the other instance (e.g., mobile topbar).
 */
export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  // Sync icon state with whatever ThemeProvider set, and listen for changes
  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update(); // initial sync on mount

    window.addEventListener("lb-theme-change", update);
    return () => window.removeEventListener("lb-theme-change", update);
  }, []);

  const toggle = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("lb-theme", "light");
    } else {
      html.classList.add("dark");
      localStorage.setItem("lb-theme", "dark");
    }
    // Broadcast to all ThemeToggle instances on this page
    window.dispatchEvent(new Event("lb-theme-change"));
  };

  return (
    <button
      id="theme-toggle"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 hover:bg-[#CDEBC5]/50 dark:hover:bg-[#1E5C28]/50 text-[#3CB54A]"
    >
      {isDark ? (
        /* Sun icon — shown in dark mode to switch to light */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      ) : (
        /* Moon icon — shown in light mode to switch to dark */
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
        </svg>
      )}
    </button>
  );
}

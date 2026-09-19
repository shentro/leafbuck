import { redirect } from "next/navigation";

/**
 * Root page of console.leafbuck.com
 * Immediately redirects to the dashboard.
 * When auth is implemented, redirect to /login if no session.
 */
export default function ConsolRootPage() {
  redirect("/dashboard");
}

/**
 * ============================================================
 *  LEAFBUCK CONSOLE CONFIGURATION
 *  ============================================================
 *  This file controls ALL the settings for the member console:
 *  - Which offerwall providers are active
 *  - Payout settings and minimums
 *  - Feature flags (turn features on/off without touching code)
 *
 *  HOW TO ADD OR ENABLE AN OFFERWALL:
 *  1. Find the provider in the `offerwalls` array below.
 *  2. Set `enabled: true`.
 *  3. Fill in your `appId` (from the provider's dashboard).
 *  4. The offerwall will appear automatically on the /earn page.
 *
 *  HOW TO DISABLE AN OFFERWALL:
 *  1. Set `enabled: false` — it instantly disappears from the site.
 *
 *  See HOWTOCHANGE.md for a plain-English walkthrough.
 * ============================================================
 */

// ── Types ──────────────────────────────────────────────────────────

export type OfferwallProvider =
  | "bitlabs"
  | "cpx"
  | "lootably"
  | "adgem"
  | "offertoro"
  | "wannads"
  | "ayet";

export interface OfferwallConfig {
  /** Internal ID — used in API routes and postback URLs. Do not change after going live. */
  id: OfferwallProvider;
  /** Display name shown to users on the /earn page */
  name: string;
  /** Short description shown under the offerwall tab */
  description: string;
  /** Set to true to show this offerwall to users */
  enabled: boolean;
  /** The type of embed — iframe (most), or sdk (for providers with JS SDK) */
  embedType: "iframe" | "sdk";
  /**
   * The iframe URL template. Use these placeholders:
   *   {APP_ID}  — your provider App ID (from appId field below)
   *   {USER_ID} — the authenticated user's unique ID (injected at render time)
   *   {USER_EMAIL} — the user's email (some providers require it)
   */
  iframeUrlTemplate: string;
  /** Your publisher App ID / Token from the provider's dashboard */
  appId: string;
  /**
   * The query parameter name the provider uses for your user ID.
   * Most use 'uid' or 'user_id'. Check your provider's docs.
   */
  subIdParam: string;
  /** Sort order on the /earn page — lower number appears first */
  sortOrder: number;
}

// ── Offerwall Providers ────────────────────────────────────────────

export const offerwalls: OfferwallConfig[] = [
  {
    id:          "bitlabs",
    name:        "BitLabs Surveys",
    description: "High-paying surveys from top research companies.",
    enabled:     false,   // ← Change to true once you have your App Token
    embedType:   "iframe",
    iframeUrlTemplate: "https://web.bitlabs.ai/?token={APP_ID}&uid={USER_ID}",
    appId:       process.env.NEXT_PUBLIC_BITLABS_APP_TOKEN ?? "",
    subIdParam:  "uid",
    sortOrder:   1,
  },
  {
    id:          "cpx",
    name:        "CPX Research",
    description: "Earn with fast, mobile-friendly surveys.",
    enabled:     false,
    embedType:   "iframe",
    iframeUrlTemplate: "https://offers.cpx-research.com/index.php?app_id={APP_ID}&ext_user_id={USER_ID}&secure_hash={USER_ID}",
    appId:       process.env.NEXT_PUBLIC_CPX_APP_ID ?? "",
    subIdParam:  "ext_user_id",
    sortOrder:   2,
  },
  {
    id:          "lootably",
    name:        "Lootably Offers",
    description: "Complete app installs, free trials, and video offers.",
    enabled:     false,
    embedType:   "iframe",
    iframeUrlTemplate: "https://wall.lootably.com/?placementID={APP_ID}&uid={USER_ID}",
    appId:       process.env.NEXT_PUBLIC_LOOTABLY_PLACEMENT_ID ?? "",
    subIdParam:  "uid",
    sortOrder:   3,
  },
  {
    id:          "adgem",
    name:        "AdGem",
    description: "Download apps and complete offers for big rewards.",
    enabled:     false,
    embedType:   "iframe",
    iframeUrlTemplate: "https://api.adgem.com/v1/wall?appid={APP_ID}&playerid={USER_ID}",
    appId:       process.env.NEXT_PUBLIC_ADGEM_APP_ID ?? "",
    subIdParam:  "playerid",
    sortOrder:   4,
  },
  {
    id:          "offertoro",
    name:        "OfferToro",
    description: "Surveys, videos, and high-value app installs.",
    enabled:     false,
    embedType:   "iframe",
    iframeUrlTemplate: "https://www.offertoro.com/ifr/show/{APP_ID}/{USER_ID}/8483",
    appId:       process.env.NEXT_PUBLIC_OFFERTORO_PUB_ID ?? "",
    subIdParam:  "uid",
    sortOrder:   5,
  },
  {
    id:          "wannads",
    name:        "Wannads",
    description: "Simple tasks: surveys, videos, app downloads.",
    enabled:     false,
    embedType:   "iframe",
    iframeUrlTemplate: "https://run.wannads.com/widget/index.php?app_key={APP_ID}&user_id={USER_ID}",
    appId:       process.env.NEXT_PUBLIC_WANNADS_APP_KEY ?? "",
    subIdParam:  "user_id",
    sortOrder:   6,
  },
  {
    id:          "ayet",
    name:        "ayeT Studios",
    description: "App install offers with instant credit.",
    enabled:     false,
    embedType:   "iframe",
    iframeUrlTemplate: "https://www.ayetstudios.com/offers/web_offerwall/{APP_ID}?external_identifier={USER_ID}",
    appId:       process.env.NEXT_PUBLIC_AYET_APP_ID ?? "",
    subIdParam:  "external_identifier",
    sortOrder:   7,
  },
];

// ── Feature Flags ──────────────────────────────────────────────────
// Toggle console features without deploying code changes.

export const features = {
  /** Show the /referrals page and referral program UI */
  referrals: true,
  /** Show the /earn page with offerwall embeds */
  earn: true,
  /** Show the /earnings page with payout button */
  payouts: true,
  /** Show a maintenance banner at the top of every dashboard page */
  maintenanceMode: false,
  maintenanceMessage: "We're performing scheduled maintenance. Earnings are paused temporarily.",
};

// ── Payout Settings ────────────────────────────────────────────────

export const payoutSettings = {
  /** Minimum balance (in USD) before a user can request a payout */
  minimumPayout: 5.00,
  /** Currency symbol shown in the UI */
  currency: "$",
  /** Payout methods shown to the user (in order) */
  payoutMethods: [
    { id: "paypal",    label: "PayPal",           icon: "💳" },
    { id: "venmo",     label: "Venmo",             icon: "💜" },
    { id: "amazon",    label: "Amazon Gift Card",  icon: "📦" },
    { id: "visa",      label: "Visa Gift Card",    icon: "💳" },
  ],
};

// ── Referral Settings ──────────────────────────────────────────────

export const referralSettings = {
  /** Bonus paid to the referrer when their referral completes their first task */
  referrerBonus: 1.00,
  /** Bonus paid to the new user for signing up via a referral link */
  refereeBonus:  0.50,
  /** Base URL for constructing referral links — uses the marketing site URL */
  referralBaseUrl: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://leafbuck.com"}?ref=`,
};

// ── Helper: Get active offerwalls in sorted order ──────────────────

export function getActiveOfferwalls(): OfferwallConfig[] {
  return offerwalls
    .filter((o) => o.enabled && o.appId !== "")
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

/**
 * Build a fully-resolved iframe URL for a provider.
 * @param provider The offerwall config object
 * @param userId   The authenticated user's ID from Supabase
 * @param userEmail The user's email (optional, some providers require it)
 */
export function buildOfferwallUrl(
  provider: OfferwallConfig,
  userId: string,
  userEmail?: string
): string {
  return provider.iframeUrlTemplate
    .replace("{APP_ID}", provider.appId)
    .replace("{USER_ID}", encodeURIComponent(userId))
    .replace("{USER_EMAIL}", encodeURIComponent(userEmail ?? ""));
}

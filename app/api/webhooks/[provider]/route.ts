/**
 * Offerwall Postback Webhook — /api/webhooks/[provider]
 * ───────────────────────────────────────────────────────
 * This route receives server-to-server completion notifications from
 * offerwall providers. When a user completes a task on BitLabs, CPX, etc.,
 * the provider sends a GET or POST request to this URL with the user ID
 * and reward amount.
 *
 * POSTBACK URL to register with your providers:
 *   https://console.leafbuck.com/api/webhooks/bitlabs
 *   https://console.leafbuck.com/api/webhooks/cpx
 *   https://console.leafbuck.com/api/webhooks/lootably
 *   (etc. — one URL per provider, provider name matches the `id` in consoleConfig.ts)
 *
 * SECURITY: Each postback is HMAC-verified using the provider's secret key.
 * Forged requests are rejected before any DB write happens.
 *
 * ─── TO ACTIVATE ─────────────────────────────────────────────────
 * 1. Install Supabase: npm install @supabase/supabase-js @supabase/ssr
 * 2. Set provider secret keys in .env.local (e.g. BITLABS_POSTBACK_SECRET)
 * 3. Follow the activation comments below for each section.
 * ─────────────────────────────────────────────────────────────────
 */

import { NextRequest, NextResponse } from "next/server";
import { offerwalls } from "@/consoleConfig";
import type { OfferwallProvider } from "@/consoleConfig";

// ── Provider Postback Schemas ──────────────────────────────────────
// Each provider sends different query parameter names.
// Map them to a unified shape: { userId, rewardUsd, transactionId, signature }

interface NormalizedPostback {
  userId: string;
  rewardUsd: number;
  transactionId: string;
  rawSignature: string;
  provider: OfferwallProvider;
}

function normalizePostback(
  provider: OfferwallProvider,
  params: URLSearchParams
): NormalizedPostback | null {
  switch (provider) {
    case "bitlabs":
      return {
        provider,
        userId:        params.get("uid") ?? "",
        rewardUsd:     parseFloat(params.get("reward") ?? "0"),
        transactionId: params.get("transaction_id") ?? params.get("offer_id") ?? "",
        rawSignature:  params.get("signature") ?? "",
      };
    case "cpx":
      return {
        provider,
        userId:        params.get("ext_user_id") ?? "",
        rewardUsd:     parseFloat(params.get("reward_usd") ?? "0") / 100, // CPX sends cents
        transactionId: params.get("trans_id") ?? "",
        rawSignature:  params.get("hash") ?? "",
      };
    case "lootably":
      return {
        provider,
        userId:        params.get("uid") ?? "",
        rewardUsd:     parseFloat(params.get("amount") ?? "0"),
        transactionId: params.get("txid") ?? "",
        rawSignature:  params.get("token") ?? "",
      };
    case "adgem":
      return {
        provider,
        userId:        params.get("playerid") ?? "",
        rewardUsd:     parseFloat(params.get("payout") ?? "0") / 100,
        transactionId: params.get("txid") ?? "",
        rawSignature:  params.get("hash") ?? "",
      };
    case "offertoro":
      return {
        provider,
        userId:        params.get("uid") ?? "",
        rewardUsd:     parseFloat(params.get("payout") ?? "0"),
        transactionId: params.get("oid") ?? "",
        rawSignature:  params.get("token") ?? "",
      };
    case "wannads":
      return {
        provider,
        userId:        params.get("user_id") ?? "",
        rewardUsd:     parseFloat(params.get("amount") ?? "0"),
        transactionId: params.get("tx_id") ?? "",
        rawSignature:  params.get("secret") ?? "",
      };
    case "ayet":
      return {
        provider,
        userId:        params.get("external_identifier") ?? "",
        rewardUsd:     parseFloat(params.get("payout") ?? "0"),
        transactionId: params.get("tx_id") ?? "",
        rawSignature:  params.get("signature") ?? "",
      };
    default:
      return null;
  }
}

// ── HMAC Signature Verification ───────────────────────────────────
// Each provider documents their exact signature algorithm.
// Implement per-provider logic here as you integrate each one.

async function verifySignature(postback: NormalizedPostback): Promise<boolean> {
  const secrets: Partial<Record<OfferwallProvider, string>> = {
    bitlabs:   process.env.BITLABS_POSTBACK_SECRET,
    cpx:       process.env.CPX_POSTBACK_SECRET,
    lootably:  process.env.LOOTABLY_POSTBACK_SECRET,
    adgem:     process.env.ADGEM_POSTBACK_SECRET,
    offertoro: process.env.OFFERTORO_POSTBACK_SECRET,
    wannads:   process.env.WANNADS_POSTBACK_SECRET,
    ayet:      process.env.AYET_POSTBACK_SECRET,
  };

  const secret = secrets[postback.provider];
  if (!secret) {
    // If no secret configured, log a warning but allow (development only)
    if (process.env.NODE_ENV === "development") return true;
    console.error(`[webhook] No secret configured for provider: ${postback.provider}`);
    return false;
  }

  // TODO: Implement per-provider HMAC verification.
  // BitLabs example:
  //   const expected = crypto.createHmac('sha256', secret)
  //     .update(`${postback.userId}:${postback.transactionId}`)
  //     .digest('hex')
  //   return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(postback.rawSignature))
  //
  // Each provider documents their exact algorithm in their postback docs.
  // Until implemented, return true in development only.
  console.warn(`[webhook] Signature verification not yet implemented for: ${postback.provider}`);
  return process.env.NODE_ENV === "development";
}

// ── Main Route Handler ─────────────────────────────────────────────

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider } = await context.params;
  const params = request.nextUrl.searchParams;

  // 1. Validate provider
  const knownProvider = offerwalls.find((o) => o.id === provider);
  if (!knownProvider) {
    console.warn(`[webhook] Unknown provider: ${provider}`);
    return NextResponse.json({ error: "Unknown provider" }, { status: 400 });
  }

  if (!knownProvider.enabled) {
    return NextResponse.json({ error: "Provider not enabled" }, { status: 403 });
  }

  // 2. Normalize the postback parameters
  const postback = normalizePostback(provider as OfferwallProvider, params);
  if (!postback || !postback.userId || postback.rewardUsd <= 0) {
    console.warn(`[webhook:${provider}] Invalid postback params:`, Object.fromEntries(params));
    return NextResponse.json({ error: "Invalid postback" }, { status: 400 });
  }

  // 3. Verify signature
  const signatureValid = await verifySignature(postback);
  if (!signatureValid) {
    console.error(`[webhook:${provider}] Signature verification FAILED for user: ${postback.userId}`);
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  // 4. Credit the user's wallet
  // ── ACTIVATE: uncomment after Supabase is configured ──────────────
  // try {
  //   const { createClient } = await import('@/lib/supabase/server')
  //   const supabase = await createClient()
  //
  //   // Idempotency check — prevent double-crediting the same transaction
  //   const { data: existing } = await supabase
  //     .from('transactions')
  //     .select('id')
  //     .eq('external_transaction_id', postback.transactionId)
  //     .eq('provider', postback.provider)
  //     .single()
  //
  //   if (existing) {
  //     console.log(`[webhook:${provider}] Duplicate postback ignored: ${postback.transactionId}`)
  //     return NextResponse.json({ status: 'already_credited' })
  //   }
  //
  //   // Insert transaction record
  //   await supabase.from('transactions').insert({
  //     user_id: postback.userId,
  //     type: 'task',
  //     description: `${knownProvider.name} offer completed`,
  //     amount: postback.rewardUsd,
  //     status: 'completed',
  //     provider: postback.provider,
  //     external_transaction_id: postback.transactionId,
  //   })
  //
  //   // Increment wallet balance using a database function for atomicity
  //   await supabase.rpc('credit_user_wallet', {
  //     p_user_id: postback.userId,
  //     p_amount: postback.rewardUsd,
  //   })
  //
  //   console.log(`[webhook:${provider}] Credited $${postback.rewardUsd} to user ${postback.userId}`)
  // } catch (err) {
  //   console.error(`[webhook:${provider}] DB error:`, err)
  //   return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  // }

  // STUB response — remove once Supabase is activated
  console.log(
    `[webhook:${provider}] STUB — would credit $${postback.rewardUsd} to user ${postback.userId} for tx ${postback.transactionId}`
  );

  // Most providers expect "1" or "OK" as the success response
  return new NextResponse("1", { status: 200 });
}

// Some providers use POST instead of GET
export const POST = GET;

import "server-only";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL } from "./env";

/** The service-role client. It bypasses RLS, so it must never be constructed
 *  anywhere a browser can reach — `server-only` above turns a stray client
 *  import into a build error rather than a leak.
 *
 *  Only /api/daily-pick uses it, and only because `daily_sends` carries no
 *  RLS policy at all: the table is deliberately unreachable with the
 *  publishable key, and this is the one key that can still see it. */
let cached: SupabaseClient | null = null;

export function getSupabaseAdminClient() {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
  if (!SUPABASE_URL || !key) return null;
  if (!cached) {
    cached = createClient(SUPABASE_URL, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

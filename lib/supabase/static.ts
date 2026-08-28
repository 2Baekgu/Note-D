import "server-only";

import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "./env";

/** Cookie-free client. `generateStaticParams` runs at build time, before any
 *  request exists, so it must not reach for `cookies()` — and it only ever
 *  needs rows that are public anyway. */
let cached: ReturnType<typeof createClient> | null = null;

export function getSupabaseStaticClient() {
  if (!isSupabaseConfigured()) return null;
  if (!cached) {
    cached = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return cached;
}

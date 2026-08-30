"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const VISITOR_KEY = "noted:visitor";

/** A tag this browser makes up for itself, so two visits can be told apart
 *  without anything being known about either. Lost when site data is cleared,
 *  which is the right amount of permanence for a reading count. */
function visitorId(): string {
  try {
    const kept = window.localStorage.getItem(VISITOR_KEY);
    if (kept) return kept;
    const made = crypto.randomUUID();
    window.localStorage.setItem(VISITOR_KEY, made);
    return made;
  } catch {
    // A private window still gets counted, just never as a returning reader.
    return `anon-${Math.random().toString(36).slice(2, 12)}`;
  }
}

/** Records that a page was opened.
 *
 *  Mounted once, in the layout, and never on a page as well: two of these on
 *  one screen would each record the same visit. Which article a view belongs
 *  to is read back from the path, which already carries the slug.
 *
 *  Failures are silent on purpose: a reader is here to read, and a counter
 *  that cannot count is not their problem. */
export function ViewBeacon() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  // React runs effects twice in development; one visit is one row.
  const last = useRef<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (last.current === pathname) return;
    last.current = pathname;

    const supabase = getSupabaseBrowserClient();
    if (!supabase) return;

    let host: string | null = null;
    try {
      // The host alone. A full referrer can carry someone's search terms.
      if (document.referrer) {
        const from = new URL(document.referrer);
        if (from.host !== window.location.host) host = from.host.slice(0, 120);
      }
    } catch {
      /* an unparseable referrer is simply no referrer */
    }

    void supabase.from("page_views").insert({
      path: pathname.slice(0, 300),
      visitor: visitorId(),
      is_member: Boolean(user),
      referrer_host: host,
    });
  }, [pathname, user, loading]);

  return null;
}

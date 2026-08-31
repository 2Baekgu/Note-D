"use client";

import { Analytics } from "@vercel/analytics/next";

/** Counting, minus the room where the counting is read.
 *
 *  The Studio and the admin screens are the three of us at work, not readers.
 *  Left in, every look at the stats page would raise the number the stats
 *  page reports — and on a site this quiet that is most of the number. */
export function PageAnalytics() {
  return (
    <Analytics
      beforeSend={(event) => {
        try {
          const { pathname } = new URL(event.url);
          if (pathname === "/studio" || pathname.startsWith("/studio/")) return null;
        } catch {
          /* an unparseable url is counted rather than lost */
        }
        return event;
      }}
    />
  );
}

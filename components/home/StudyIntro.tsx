"use client";

import { useEffect, useRef } from "react";
import { site } from "@/lib/site";

const LINES = ["WE STUDY PEOPLE", "THEN WE RETHINK DESIGN."];

/** How much ink is already down before any scrolling. Set so the first line
 *  reads "WE STUDY" at rest — the hero is short, so the gauge starts well
 *  along rather than from empty. */
const AT_REST = 0.28;

/** Fraction of the viewport height that completes the wipe. Small on purpose:
 *  the fill has to finish while the headline is still on screen. */
const SCROLL_RANGE = 0.18;

export function StudyIntro({
  articleCount,
  memberCount,
}: {
  articleCount: number;
  memberCount: number;
}) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const lines = Array.from(el.querySelectorAll<HTMLElement>("[data-line]"));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      lines.forEach((l) => l.style.setProperty("--fill", "100%"));
      return;
    }

    /* Reads scroll position once and then only writes, so there is no layout
       thrash and nothing depends on rAF being scheduled. */
    const paint = () => {
      const span = window.innerHeight * SCROLL_RANGE;
      const scrolled = span > 0 ? Math.min(1, Math.max(0, window.scrollY / span)) : 1;
      const progress = AT_REST + scrolled * (1 - AT_REST);

      // Line one fills completely before line two begins.
      const head = progress * lines.length;
      lines.forEach((line, i) => {
        const fill = Math.min(1, Math.max(0, head - i));
        line.style.setProperty("--fill", `${(fill * 100).toFixed(2)}%`);
      });

      // The blob lags the scroll slightly, so it feels attached to the page.
      el.style.setProperty("--scroll-p", scrolled.toFixed(4));
    };

    paint();
    window.addEventListener("scroll", paint, { passive: true });
    window.addEventListener("resize", paint);
    return () => {
      window.removeEventListener("scroll", paint);
      window.removeEventListener("resize", paint);
    };
  }, []);

  const facts = [
    [String(articleCount).padStart(2, "0"), "Articles"],
    [String(memberCount).padStart(2, "0"), "Members"],
    [String(site.since), "Since"],
  ];

  return (
    <section
      ref={root}
      className="hero shell section-pad text-center"
      aria-labelledby="intro"
      style={{ ["--scroll-p" as string]: 0 }}
    >
      <span
        className="hero-blob"
        aria-hidden="true"
        style={{
          transform:
            "translate3d(0, calc(var(--scroll-p) * -6rem), 0) rotate(calc(var(--scroll-p) * 26deg))",
        }}
      />

      <h1 id="intro" className="sr-only">
        {LINES.join(" ")}
      </h1>

      <p className="hero-line" aria-hidden="true">
        {LINES.map((line) => (
          <span key={line} data-line className="hero-fill block">
            {line}
          </span>
        ))}
      </p>

      <dl className="mt-12 flex flex-wrap items-baseline justify-center gap-x-8 gap-y-3">
        {facts.map(([value, label]) => (
          <div key={label} className="flex items-baseline gap-2">
            <dt className="sr-only">{label}</dt>
            <dd className="t-body font-semibold tabular-nums">{value}</dd>
            <span className="t-label text-ink-faint">{label}</span>
          </div>
        ))}
      </dl>
    </section>
  );
}

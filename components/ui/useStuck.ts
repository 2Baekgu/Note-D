"use client";

import { useEffect, useRef, useState } from "react";

/** Returns `[ref, stuck]`. `stuck` flips true once the sticky element has
 *  detached from its place in the flow — used to give a sticky bar a
 *  background only while content is passing underneath it. */
export function useStuck<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  boolean,
] {
  const ref = useRef<T>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const headerH = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--header-h"),
    );

    const check = () => {
      // Stuck once the bar can no longer sit below the header on its own.
      setStuck(el.getBoundingClientRect().top <= headerH + 0.5);
    };

    // Async so the first read happens after paint, not inside the effect body.
    const timer = window.setTimeout(check, 0);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  return [ref, stuck];
}

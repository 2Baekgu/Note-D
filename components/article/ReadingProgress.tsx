"use client";

import { useEffect, useState } from "react";

/** Hairline progress bar pinned under the header. */
export function ReadingProgress() {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      setRatio(max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="fixed inset-x-0 top-[var(--header-h)] z-40 h-px" aria-hidden="true">
      <div
        className="progress-bar h-px w-full bg-accent"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  );
}

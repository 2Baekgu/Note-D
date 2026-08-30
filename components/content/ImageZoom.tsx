"use client";

import { useEffect, useState } from "react";

type Shown = { src: string; alt: string; caption: string };

/** Open a picture in the article at its own size.
 *
 *  Listening on the body rather than binding to each picture: the article is
 *  set as HTML from the stored document, so there are no React elements here
 *  to hang a handler on. One listener also costs the same whether a piece has
 *  two pictures or forty.
 *
 *  A picture inside a link is left alone — a bookmark card's thumbnail is
 *  there to be followed, not enlarged. */
export function ImageZoom() {
  const [shown, setShown] = useState<Shown | null>(null);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      // Let a modified click do what the browser would.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const img = target?.closest?.("img");
      if (!(img instanceof HTMLImageElement)) return;
      if (!img.closest(".prose-body")) return;
      if (img.closest("a")) return;

      event.preventDefault();
      const figure = img.closest("figure");
      setShown({
        src: img.currentSrc || img.src,
        alt: img.alt,
        // A row's caption belongs to the row, so look outward for it.
        caption:
          figure?.querySelector(":scope > figcaption")?.textContent?.trim() ??
          figure?.closest(".tiptap-row")?.querySelector(":scope > figcaption")
            ?.textContent?.trim() ??
          "",
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  useEffect(() => {
    if (!shown) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShown(null);
    };
    document.addEventListener("keydown", onKey);
    // The page behind should not scroll away under the picture.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [shown]);

  if (!shown) return null;

  return (
    <div
      className="zoom-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={shown.alt || "확대한 사진"}
      onClick={() => setShown(null)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={shown.src} alt={shown.alt} />

      {shown.caption && <p className="zoom-caption">{shown.caption}</p>}

      <button type="button" className="zoom-close" aria-label="닫기" onClick={() => setShown(null)}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

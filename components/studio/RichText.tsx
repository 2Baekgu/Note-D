"use client";

import { useRef, useState } from "react";
import { elementToInline, inlineToHtml } from "@/lib/content/inline";
import { cn } from "@/lib/utils";

/** One editable line of rich text.
 *
 *  Deliberately uncontrolled: React seeds the HTML once and never writes to
 *  it again. That is what makes Korean input safe — re-rendering a
 *  `contenteditable` while the IME is mid-syllable is what drops and doubles
 *  characters. Changes flow one way, out to the parent's state; when the
 *  editor genuinely has to change the text (a markdown shortcut eating its
 *  own prefix) it does so on the DOM node through `setText`. */
export function RichText({
  id,
  text,
  placeholder,
  className,
  onChange,
  onKeyDown,
  onFocus,
  onPasteFiles,
}: {
  id?: string;
  text: string;
  placeholder?: string;
  className?: string;
  onChange: (next: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>, el: HTMLDivElement) => void;
  onFocus?: () => void;
  onPasteFiles?: (files: File[]) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const composing = useRef(false);
  // Captured once. Re-seeding on every render would fight the caret, so this
  // is state with an initialiser rather than a prop — the DOM is the source of
  // truth for what is typed, and it flows one way from here on.
  const [seed] = useState(() => inlineToHtml(text));

  const report = () => {
    const el = ref.current;
    if (!el || composing.current) return;
    el.dataset.empty = el.textContent?.trim() ? "false" : "true";
    onChange(elementToInline(el));
  };

  return (
    <div
      id={id}
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      role="textbox"
      aria-multiline="false"
      data-placeholder={placeholder}
      data-empty={text.trim() ? "false" : "true"}
      className={cn("rt", className)}
      dangerouslySetInnerHTML={{ __html: seed }}
      onInput={report}
      onCompositionStart={() => {
        composing.current = true;
      }}
      onCompositionEnd={() => {
        composing.current = false;
        report();
      }}
      onFocus={onFocus}
      onKeyDown={(e) => onKeyDown?.(e, e.currentTarget)}
      onPaste={(e) => {
        const files = Array.from(e.clipboardData.files).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length && onPasteFiles) {
          e.preventDefault();
          onPasteFiles(files);
          return;
        }
        // Paste as plain text — otherwise a copy from anywhere drags its
        // whole stylesheet in and nodeToInline has to guess what it meant.
        e.preventDefault();
        const plain = e.clipboardData.getData("text/plain");
        document.execCommand("insertText", false, plain);
      }}
    />
  );
}

/** Replace an editable node's text and drop the caret at the end. Used when a
 *  markdown shortcut consumes its own prefix. */
export function setText(el: HTMLElement, next: string) {
  el.textContent = next;
  el.dataset.empty = next.trim() ? "false" : "true";
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel?.removeAllRanges();
  sel?.addRange(range);
}

/** Caret offset within the element, counting only text. */
export function caretOffset(el: HTMLElement): number {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return 0;
  const range = sel.getRangeAt(0).cloneRange();
  range.selectNodeContents(el);
  range.setEnd(sel.getRangeAt(0).endContainer, sel.getRangeAt(0).endOffset);
  return range.toString().length;
}

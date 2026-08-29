"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/** A textarea that grows with what is typed into it, rather than keeping a
 *  fixed height and scrolling a long thought out of sight. */
export function AutoTextarea({
  value,
  minRows = 3,
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  value: string;
  minRows?: number;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Collapse first: scrollHeight only shrinks if the box is smaller than
    // its content.
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      value={value}
      rows={minRows}
      className={cn("resize-none overflow-hidden", className)}
      {...rest}
    />
  );
}

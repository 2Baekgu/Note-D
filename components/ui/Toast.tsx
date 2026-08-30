"use client";

import { cn } from "@/lib/utils";

export type ToastTone = "ok" | "error";

/** How long the message stays. Something gone wrong is worth a longer look
 *  than something that worked. */
const LIFE: Record<ToastTone, number> = { ok: 2800, error: 5200 };

/** A word about what just happened, at the foot of the screen.
 *
 *  It says its piece and leaves. A block that stays at the top of a page is
 *  read once and then sits there being wrong — the article was published a
 *  minute ago and the banner still announces it.
 *
 *  Coming and going is a CSS animation rather than React state, and the end
 *  of that animation is what clears the message. Nothing here has to be kept
 *  in step with anything else. */
export function Toast({
  message,
  tone = "ok",
  onDone,
}: {
  message: string | null;
  tone?: ToastTone;
  onDone?: () => void;
}) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      // Keyed by the message so a second one restarts the animation instead
      // of appearing already faded.
      key={message}
      className="toast-dock"
      style={{ animationDuration: `${LIFE[tone]}ms` }}
      // The animation's length is the message's life, so its end is the
      // moment to clear it. No timer to keep in step with the fade.
      onAnimationEnd={() => onDone?.()}
    >
      <p
        className={cn(
          "t-caption max-w-[min(90vw,44ch)] rounded-pill px-4 py-2.5 text-center shadow-float",
          tone === "error" ? "bg-accent text-paper" : "bg-ink text-paper",
        )}
      >
        {message}
      </p>
    </div>
  );
}

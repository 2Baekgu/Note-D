"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useAuth } from "@/components/auth/AuthProvider";
import { RichEditor } from "@/components/studio/RichEditor";
import { Button } from "@/components/ui/Button";
import { submitBugReport } from "@/lib/bugs";
import { toBlocks, toPlainText } from "@/lib/content/doc";

/** Report a bug from wherever you hit it. The body is the same editor an
 *  article is written in, minus the formatting — a screenshot dropped into
 *  the sentence about it is worth more than any styling would be. */
export function BugReportDialog({ onClose }: { onClose: () => void }) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  // Escape closes it, and the page behind must not scroll under the sheet.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  // Only ever rendered from a click, so the document is already there.
  if (!user) return null;

  // A screenshot on its own is a report; so is a sentence with no picture.
  const written =
    toPlainText(content).trim().length > 0 ||
    toBlocks(content).some((b) => b.type === "image");

  async function send() {
    if (!user) return;
    setBusy(true);
    setError("");
    const res = await submitBugReport(content, {
      id: user.id,
      name: user.name,
      email: user.email,
    });
    if (res.ok) {
      setSent(true);
    } else {
      setError(res.error ?? "보내지 못했습니다. 잠시 후 다시 시도해주세요.");
      setBusy(false);
    }
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-[rgba(22,21,15,0.55)] px-4 py-10 backdrop-blur-[2px]"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bug-report-title"
        className="surface my-auto w-full max-w-[42rem] p-6 shadow-float sm:p-10"
      >
        {sent ? (
          <div className="py-8 text-center">
            <p className="t-h1 serif-heads">보내주셔서 고맙습니다</p>
            <p className="t-body mt-4 text-ink-muted">
              운영자가 확인하고 하나씩 고쳐나가겠습니다.
            </p>
            <Button className="mt-8" onClick={onClose}>
              닫기
            </Button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="t-label text-accent">Bug report</p>
                <h2 id="bug-report-title" className="t-h1 serif-heads mt-3">
                  버그 리포트
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="닫기"
                className="t-body shrink-0 text-ink-faint transition-colors duration-[var(--duration-fast)] hover:text-ink"
              >
                ✕
              </button>
            </div>

            <p className="t-body mt-5 text-ink-muted">
              이 사이트를 쓰다가 만난 버그, 불편했던 점, 고쳐졌으면 하는 것,
              이렇게 바뀌면 더 좋겠다 싶은 것을 자유롭게 적어주세요. 화면을
              캡처해서 붙여넣어주시면 가장 빠릅니다.
            </p>

            <div className="mt-6">
              <RichEditor
                value={content}
                onChange={setContent}
                tools="image"
                compact
                folder="bug-reports"
                placeholder="어디에서 무엇이 어떻게 되었는지 적어주세요"
              />
            </div>

            {error && <p className="t-caption mt-4 text-accent">{error}</p>}

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              {/* Its own row on a phone, so the two buttons stay side by side. */}
              <p className="t-caption mr-auto w-full text-ink-faint sm:w-auto">
                {user.name} · {user.email}
              </p>
              <Button variant="secondary" onClick={onClose} disabled={busy}>
                취소
              </Button>
              <Button onClick={send} disabled={busy || !written}>
                {busy ? "보내는 중…" : "보내기"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}

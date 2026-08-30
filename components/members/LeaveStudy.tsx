"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

const CONFIRM = "탈퇴";

/** A way out, on your own page and nowhere else.
 *
 *  Two steps rather than one: the door is closed by default, and opening it
 *  spells out what leaving takes with it. The server refuses the cases that
 *  would cost the study something — see `app/api/account/route.ts` — so the
 *  worst this can do to a reader is remove the reader. */
export function LeaveStudy({ memberId }: { memberId: string }) {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!user || user.id !== memberId) return null;

  async function leave() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/account", { method: "DELETE" });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setError(body.error ?? "탈퇴하지 못했습니다.");
        setBusy(false);
        return;
      }
    } catch {
      setError("네트워크 오류로 탈퇴하지 못했습니다.");
      setBusy(false);
      return;
    }
    await signOut();
    router.replace("/");
  }

  return (
    <section className="mt-20 border-t border-line pt-8">
      {!open ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="t-caption text-ink-faint underline underline-offset-4 hover:text-accent"
        >
          스터디 탈퇴하기
        </button>
      ) : (
        <div className="surface max-w-[52ch] p-6">
          <p className="t-label text-accent">Leave</p>
          <h2 className="t-h2 mt-3">정말 탈퇴하시겠어요?</h2>
          <p className="t-body mt-4 text-ink-muted">
            계정과 프로필, 남긴 댓글과 반응이 모두 지워집니다. 되돌릴 수 없고, 다시
            들어오려면 처음부터 가입해야 합니다. 읽는 것은 로그인 없이도 할 수 있으니,
            글을 쓸 생각이 없어서 나가는 거라면 그냥 로그아웃해두셔도 됩니다.
          </p>

          <label htmlFor="leave-confirm" className="t-caption mt-6 block text-ink-muted">
            확인을 위해 <b className="text-ink">{CONFIRM}</b> 이라고 입력해 주세요.
          </label>
          <input
            id="leave-confirm"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            autoComplete="off"
            className="field mt-2"
          />

          {error && <p className="t-caption mt-4 text-accent">{error}</p>}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Button
              type="button"
              onClick={leave}
              disabled={busy || typed.trim() !== CONFIRM}
            >
              {busy ? "탈퇴하는 중…" : "탈퇴하기"}
            </Button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                setTyped("");
                setError(null);
              }}
              className="t-caption text-ink-faint underline underline-offset-4 hover:text-ink"
            >
              그대로 두기
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

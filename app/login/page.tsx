import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginPanel } from "@/components/auth/LoginPanel";
import { PageFrame } from "@/components/site/PageFrame";

export const metadata: Metadata = {
  title: "Sign in",
  description: "구글 계정으로 로그인하고 스터디에 참여하기.",
};

const ACCESS = [
  ["누구나", "아티클 읽기 · 멤버 보기 · 검색"],
  ["로그인", "댓글 남기기"],
  ["멤버", "아티클 작성 · 발행"],
];

export default function LoginPage() {
  return (
    <PageFrame>
      <div className="shell section-pad grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <p className="t-label text-accent">Join the study</p>
          <h1 className="t-display mt-6">
            Sign in
            <br />
            to join
          </h1>
          <p className="t-body-lg mt-8 max-w-[38ch] text-ink-muted">
            읽는 것은 누구나 할 수 있습니다. 구글 계정으로 로그인하면 바로 댓글을 남길 수
            있고, 글을 쓰고 싶다면 멤버로 승인해드립니다.
          </p>

          <ul className="mt-12 space-y-3">
            {ACCESS.map(([k, v]) => (
              <li key={k} className="flex flex-wrap items-baseline gap-3 border-t border-line pt-3">
                <span className="t-label w-14 shrink-0 text-ink-faint">{k}</span>
                <span className="t-body text-ink-muted">{v}</span>
              </li>
            ))}
          </ul>
        </div>

        <Suspense fallback={null}>
          <LoginPanel />
        </Suspense>
      </div>
    </PageFrame>
  );
}

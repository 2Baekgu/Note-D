import Link from "next/link";
import type { Metadata } from "next";
import { authorCounts, listMembers } from "@/lib/repo";
import { Avatar } from "@/components/ui/Avatar";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "Members",
  description: "이 저널을 함께 쓰는 사람들.",
};

export default async function MembersPage() {
  const [members, counts] = await Promise.all([listMembers(), authorCounts()]);

  return (
    <PageFrame>
      <header className="shell page-head">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="t-label text-accent">Who writes here</p>
            <h1 className="t-display mt-4">Members</h1>
          </div>
          <p className="t-body max-w-[34ch] pb-3 text-ink-muted">
            {members.length}명이 각자의 관심사로 글을 씁니다. 이름을 누르면 그 사람이 쓴 글만 모아볼
            수 있어요.
          </p>
        </div>
      </header>

      <GridRule />

      <ul className="shell section-pad flex flex-col gap-4">
        {members.map((m, i) => (
          <Reveal as="li" key={m.id} delay={i * 40}>
            <Link
              href={`/members/${m.handle}`}
              className="surface group grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-3 p-6 transition-colors duration-[var(--duration-base)] ease-out-quint hover:border-ink sm:grid-cols-[3rem_auto_minmax(0,1fr)_auto] sm:items-center sm:gap-x-6 sm:p-8"
            >
              <span className="t-caption hidden pt-2 text-ink-faint sm:block sm:pt-0">
                {String(i + 1).padStart(2, "0")}
              </span>

              <Avatar
                name={m.name}
                src={m.profileImage}
                size="lg"
                className="transition-transform duration-[var(--duration-base)] ease-out-quint group-hover:scale-105"
              />

              <span className="min-w-0">
                <span className="flex flex-wrap items-baseline gap-x-3">
                  <span className="t-h2 transition-colors duration-[var(--duration-base)] ease-out-quint group-hover:text-accent">
                    {m.name}
                  </span>
                  <span className="t-label text-ink-faint">{m.title}</span>
                </span>
                <span className="t-body mt-3 block max-w-[58ch] text-ink-muted">{m.bio}</span>
              </span>

              <span className="flex items-center gap-4 self-center">
                <span className="text-right">
                  <span className="t-h2 block tabular-nums">
                    {String(counts[m.id] ?? 0).padStart(2, "0")}
                  </span>
                  <span className="t-label mt-1 block text-ink-faint">Articles</span>
                </span>
                <span
                  className="text-ink-faint transition-all duration-[var(--duration-base)] ease-out-quint group-hover:translate-x-0.5 group-hover:text-accent"
                  aria-hidden="true"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>

      <GridRule />

      <section className="shell section-pad">
        <div className="surface-dashed p-8 sm:p-12">
          <p className="t-h1">함께 쓰고 싶은 사람을 기다립니다</p>
          <p className="t-body mt-4 text-ink-muted">
            일주일에 한 편, 자신이 공부한 것을 글로 남기는 일과 함께 공부하고 나눌 사람을 환영합니다.
          </p>
          <ButtonLink href="/about" variant="secondary" className="mt-8">
            운영 방식 보기 →
          </ButtonLink>
        </div>
      </section>
    </PageFrame>
  );
}

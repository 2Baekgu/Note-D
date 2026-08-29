import type { Metadata } from "next";
import { site } from "@/lib/site";
import { topics } from "@/lib/data/topics";
import { HowItWorks } from "@/components/home/HowItWorks";
import { OpenChatCard } from "@/components/site/OpenChatCard";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { ChipLink } from "@/components/ui/Chip";
import { ButtonLink } from "@/components/ui/Button";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
};

const PRINCIPLES = [
  [
    "완성보다 기록",
    "완벽하게 다듬어진 글일 필요는 없습니다. 지금 공부하면서 든 생각을 편하게 남겨주세요.",
  ],
  [
    "꾸준히 이어감",
    "각자의 속도는 다를 수 있습니다. 일주일에 한 편, 부담되지 않는 선에서 꾸준히 써봅니다.",
  ],
  [
    "다른의견 환영",
    "모두 같은 생각일 필요는 없습니다. 서로의 글을 읽고 다른 생각이 있다면 편하게 이야기해주세요.",
  ],
  [
    "인용과 출처",
    "다른 사람의 글이나 자료를 참고했다면 어디서 가져왔는지 함께 적어주세요. 잘 모르는 내용은 모른다고 적어도 괜찮습니다.",
  ],
];


export default function AboutPage() {
  return (
    <PageFrame>
      {/* Taller than an index header because the statement needs the room, but
          the eyebrow starts on the same line as every other page. */}
      <section className="shell page-head-top section-pad-b">
        <p className="t-label text-accent">About</p>
        <h1 className="t-display mt-6 text-balance">
          We study how
          <br />
          people experience
          <br />
          <span className="text-ink-faint">things.</span>
        </h1>
      </section>

      <GridRule />

      <Marquee
        items={["UX", "UI", "PSYCHOLOGY", "COGNITIVE SCIENCE", "INTERACTION", "DESIGN THEORY"]}
      />

      <GridRule />

      {/* Why */}
      <Reveal as="section" className="shell section-pad">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:gap-16">
          <h2 className="t-h1">Why we started</h2>
          <div className="prose-body t-body-lg space-y-6 text-ink-muted">
            <p>
              디자인을 하다 보면 매번 같은 질문에 도착합니다. 사람들은 왜 이 화면에서 멈출까, 왜 이
              버튼을 누르지 않을까, 왜 같은 정보를 다르게 기억할까.
            </p>
            <p>
              답을 찾으려면 화면 바깥을 봐야 했습니다. 심리학, 인지과학, 오래된 디자인 이론들. 혼자
              읽기에는 벅찼고, 읽어도 금방 잊었습니다. 그래서 2025년 가을, 같은 질문을 가진 사람들이
              모였습니다.
            </p>
          </div>
        </div>
      </Reveal>

      {/* How */}
      <GridRule />

      <Reveal as="section" className="shell section-pad">
        <div>
          <h2 className="t-h1">How we run it</h2>
          <p className="t-body-lg mt-6 text-ink-muted">
            멤버들은 일주일에 한 편씩, 각자 공부한 것을 정리해 이곳에 발행합니다. 발표 대신 글로
            남기고 질문과 반박은 댓글로 이어갑니다. 같은 시간에 모이지 않아도 대화는 계속됩니다.
          </p>
        </div>
        <HowItWorks />
      </Reveal>

      <GridRule />

      <Reveal as="section" className="shell section-pad">
        <OpenChatCard />
      </Reveal>

      {/* What */}
      <GridRule />

      <Reveal as="section" className="shell section-pad">
        <div>
          <h2 className="t-h1">What we study</h2>
          <ul className="mt-12 flex flex-wrap gap-2">
            {topics.map((t) => (
              <li key={t.slug}>
                <ChipLink href={`/articles?topic=${t.slug}`}>{t.name}</ChipLink>
              </li>
            ))}
          </ul>
          <p className="t-body mt-8 text-ink-muted">
            한 편의 글이 여러 주제에 걸쳐 있는 경우가 많습니다. 주제는 고정되어 있지 않고,
            누군가 재미있는 것을 발견하면 그것이 다음 주제가 됩니다.
          </p>
        </div>
      </Reveal>

      {/* Principles */}
      <GridRule />

      <Reveal as="section" className="shell section-pad">
        <div>
          <h2 className="t-h1">What we agree on</h2>
        </div>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2">
          {PRINCIPLES.map(([title, body], i) => (
            <li key={title} className="bg-paper p-8">
              <p className="t-label text-accent">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="t-h2 mt-4">{title}</h3>
              <p className="t-body mt-3 text-ink-muted">{body}</p>
            </li>
          ))}
        </ol>
      </Reveal>

      {/* CTA */}
      <GridRule />

      <Reveal as="section" className="shell section-pad">
        <div className="surface-inverse p-8 sm:p-16">
          <p className="t-h1 text-balance">What did you read this week?</p>
          <p className="t-body-lg mt-6 text-on-inverse-muted">
            멤버라면 Studio에서 바로 글을 쓸 수 있습니다.
          </p>
          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/articles" variant="onInverse">
              Read the archive →
            </ButtonLink>
            <ButtonLink href="/studio" variant="outlineInverse">
              Write an article
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </PageFrame>
  );
}

import {
  authorCounts,
  topicCounts,
  listArticles,
  listMembers,
} from "@/lib/repo";
import { site } from "@/lib/site";
import { StudyIntro } from "@/components/home/StudyIntro";
import { ArticleMasonry } from "@/components/article/ArticleMasonry";
import { TopicsIndex } from "@/components/home/TopicsIndex";
import { MembersStrip } from "@/components/home/MembersStrip";
import { SectionHead } from "@/components/ui/SectionHead";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageFrame } from "@/components/site/PageFrame";
import { GridRule } from "@/components/site/GridRule";
import { formatDate } from "@/lib/utils";

/** Home samples the archive rather than listing it — four columns, three
 *  rows deep, then a link into /articles. */
const HOME_ARTICLE_COUNT = 12;

export default async function HomePage() {
  const [all, members, counts, byAuthor] = await Promise.all([
    listArticles(),
    listMembers(),
    topicCounts(),
    authorCounts(),
  ]);

  const latest = all.slice(0, HOME_ARTICLE_COUNT);
  const today = new Date().toISOString().slice(0, 10);

  return (
    <PageFrame>
      <StudyIntro articleCount={all.length} memberCount={members.length} />

      <GridRule />

      {/* Masthead strip */}
      <div className="shell">
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 py-4">
          <p className="lede-serif t-body-lg text-ink-muted">{site.intro}</p>
          <p className="t-caption text-ink-faint">{formatDate(today)} · Seoul</p>
        </div>
      </div>

      <GridRule />

      <section className="shell section-pad" aria-labelledby="latest">
        <SectionHead
          bare
          label="The Archive"
          title="Latest"
          note={`${all.length}편의 아티클이 발행되어 있습니다.`}
          action={{ label: "All articles", href: "/articles" }}
        />
        <div id="latest" className="mt-12">
          <ArticleMasonry articles={latest} />
        </div>

        <div className="mt-12 flex justify-center">
          <ButtonLink href="/articles" variant="secondary">
            아티클 전체 보기 ({all.length}) →
          </ButtonLink>
        </div>
      </section>

      <GridRule />

      <section className="shell section-pad" aria-labelledby="topics">
        <SectionHead
          bare
          label="Index of subjects"
          title="Topics"
          note="관심 있는 주제부터 읽어보세요."
        />
        <div id="topics">
          <TopicsIndex counts={counts} />
        </div>
      </section>

      <GridRule />

      <section className="shell section-pad" aria-labelledby="members">
        <SectionHead
          bare
          label="Who writes here"
          title="Members"
          action={{ label: "All members", href: "/members" }}
        />
        <div id="members">
          <MembersStrip members={members} counts={byAuthor} />
        </div>
      </section>

      <GridRule />

      <Reveal as="section" className="shell section-pad-t">
        <p className="t-display text-balance">
          We study how people
          <br />
          experience things —
          <span className="text-ink-faint"> slowly, in writing.</span>
        </p>
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <ButtonLink href="/about" variant="secondary">
            About the study →
          </ButtonLink>
          <ButtonLink href="/studio" variant="ghost" className="px-4">
            멤버라면 글을 써주세요
          </ButtonLink>
        </div>
      </Reveal>
    </PageFrame>
  );
}

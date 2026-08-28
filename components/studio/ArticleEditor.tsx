"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article, Reference } from "@/lib/types";
import { topics } from "@/lib/data/topics";
import { members } from "@/lib/data/members";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContentBody } from "@/components/content/ContentBody";
import { CoverMedia } from "@/components/article/CoverArt";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { useStuck } from "@/components/ui/useStuck";
import { ContentComposer } from "./ContentComposer";
import { emptyArticle, persistArticle, uploadCover } from "@/lib/studio";
import { readingTime } from "@/lib/content/parse";
import { cn, formatDate, slugify } from "@/lib/utils";

const CHEATSHEET = [
  ["## 제목", "섹션 heading"],
  ["### 소제목", "하위 heading"],
  ["> 인용문", "인용 (다음 줄 `— 출처`)"],
  ["- 항목", "불릿 리스트"],
  ["1. 항목", "번호 리스트"],
  ["!! 문장", "하이라이트 박스"],
  ['![설명](url "캡션")', "이미지"],
  ["@embed <youtube-url>", "영상 임베드"],
  ["**굵게**  *기울임*  ==형광==", "인라인 서식"],
  ["[텍스트](url)", "링크"],
  ["---", "구분선"],
];

export function ArticleEditor({ initial }: { initial?: Article }) {
  const { user } = useAuth();
  const router = useRouter();

  const [article, setArticle] = useState<Article>(() => initial ?? emptyArticle(""));
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(Boolean(initial?.slug));
  const [actionsRef, actionsStuck] = useStuck<HTMLDivElement>();

  // The session may arrive after the first render, so the author falls back
  // rather than being written into state by an effect. RLS only accepts
  // `auth.uid() = author_id`, so this is never a choice — you publish as you.
  const authorId = article.authorId || user?.id || "";
  const author = useMemo(() => {
    if (user && authorId === user.id) {
      return { name: user.name, profileImage: user.image };
    }
    const known = members.find((m) => m.id === authorId);
    return { name: known?.name ?? "—", profileImage: known?.profileImage ?? null };
  }, [authorId, user]);

  const patch = (values: Partial<Article>) => setArticle((a) => ({ ...a, ...values }));

  const computedSlug = slugTouched ? article.slug : slugify(article.title);
  const valid = article.title.trim().length > 1 && article.content.trim().length > 10;

  async function save(status: Article["status"]) {
    if (!valid) {
      setNotice("제목과 본문을 먼저 채워주세요.");
      return;
    }
    setSaving(true);
    setNotice(null);
    if (!authorId) {
      setNotice("로그인이 필요합니다.");
      return;
    }

    const result = await persistArticle({ ...article, authorId, slug: computedSlug, status });
    setSaving(false);

    if (!result.ok) {
      setNotice(result.error ?? "저장에 실패했습니다.");
      return;
    }
    setNotice(
      result.storage === "local"
        ? status === "published"
          ? "발행했습니다 — 데모 모드라 이 브라우저에만 저장됩니다."
          : "초안을 이 브라우저에 저장했습니다."
        : status === "published"
          ? "발행했습니다."
          : "초안을 저장했습니다.",
    );
    patch({ status });
    if (!initial) router.replace("/studio");
  }

  if (!user) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">로그인이 필요합니다</p>
        <p className="t-body mt-3 text-ink-muted">아티클 작성은 스터디 멤버만 가능합니다.</p>
        <ButtonLink href="/login?next=/studio" className="mt-8">
          Sign in →
        </ButtonLink>
      </div>
    );
  }

  return (
    <div>
      {/* Action bar */}
      <div
        ref={actionsRef}
        className={cn(
          "sticky-bar flex flex-wrap items-center gap-3 py-3",
          actionsStuck && "is-stuck",
        )}
      >
        <ButtonLink href="/studio" variant="ghost" size="sm">
          ← Studio
        </ButtonLink>

        <Chip tone={article.status === "published" ? "solid" : "outline"} size="sm">
          {article.status}
        </Chip>

        <div className="ml-auto flex flex-wrap items-center gap-2">
          <div className="segmented segmented-sm">
            {(["write", "preview"] as const).map((m) => (
              <ChipButton
                key={m}
                size="sm"
                tone={mode === m ? "solid" : "outline"}
                className={mode === m ? "" : "border-transparent"}
                onClick={() => setMode(m)}
              >
                {m}
              </ChipButton>
            ))}
          </div>

          <Button variant="secondary" size="sm" disabled={saving} onClick={() => save("draft")}>
            Save draft
          </Button>
          <Button
            size="sm"
            disabled={saving || !valid}
            className="bg-accent text-on-accent hover:bg-accent hover:opacity-90"
            onClick={() => save("published")}
          >
            {saving ? "Saving…" : "Publish"}
          </Button>
        </div>
      </div>

      {notice && (
        <p className="surface t-caption mt-4 px-4 py-3 text-ink-muted">{notice}</p>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_20rem]">
        {/* ── Main pane ─────────────────────────────── */}
        <div className="min-w-0">
          {mode === "write" ? (
            <>
              <label htmlFor="title" className="t-label text-ink-faint">
                Title
              </label>
              <input
                id="title"
                value={article.title}
                onChange={(e) => patch({ title: e.target.value })}
                placeholder="무엇에 대해 쓰고 있나요?"
                className="t-display mt-3 w-full border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
              />

              <label htmlFor="subtitle" className="t-label mt-12 block text-ink-faint">
                Subtitle
              </label>
              <textarea
                id="subtitle"
                value={article.subtitle}
                onChange={(e) => patch({ subtitle: e.target.value })}
                rows={2}
                placeholder="한두 문장으로 이 글을 요약해주세요."
                className="field mt-3 resize-y"
              />

              <div className="mt-12 flex flex-wrap items-baseline justify-between gap-3">
                <label htmlFor="content" className="t-label text-ink-faint">
                  Content
                </label>
                <span className="t-caption text-ink-faint">
                  {article.content.length.toLocaleString()}자 · 약 {readingTime(article.content)}분
                </span>
              </div>
              <ContentComposer
                value={article.content}
                onChange={(update) =>
                  setArticle((a) => ({ ...a, content: update(a.content) }))
                }
                placeholder={"## 첫 번째 섹션\n\n여기에 본문을 씁니다.\n\n이미지는 끌어다 놓으세요.\n\n> 인용하고 싶은 문장\n> — 출처"}
              />

              <details className="surface mt-4 p-6">
                <summary className="t-label cursor-pointer text-ink-muted">
                  Formatting reference
                </summary>
                <dl className="mt-6 grid gap-x-8 sm:grid-cols-2">
                  {CHEATSHEET.map(([syntax, meaning]) => (
                    <div
                      key={syntax}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2"
                    >
                      <dt className="t-caption font-medium">{syntax}</dt>
                      <dd className="t-caption shrink-0 text-ink-faint">{meaning}</dd>
                    </div>
                  ))}
                </dl>
              </details>

              <p className="t-label mt-12 text-ink-faint">References</p>
              <div className="mt-3 space-y-3">
                {article.references.map((ref, i) => (
                  <div
                    key={i}
                    className="surface grid gap-2 p-3 sm:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)_auto]"
                  >
                    <input
                      value={ref.label}
                      onChange={(e) => {
                        const next = [...article.references];
                        next[i] = { ...ref, label: e.target.value };
                        patch({ references: next });
                      }}
                      placeholder="자료 제목"
                      className="field field-bare px-2 py-2"
                      aria-label={`참고자료 ${i + 1} 제목`}
                    />
                    <input
                      value={ref.source ?? ""}
                      onChange={(e) => {
                        const next = [...article.references];
                        next[i] = { ...ref, source: e.target.value };
                        patch({ references: next });
                      }}
                      placeholder="출처"
                      className="field field-bare px-2 py-2"
                      aria-label={`참고자료 ${i + 1} 출처`}
                    />
                    <input
                      value={ref.url ?? ""}
                      onChange={(e) => {
                        const next = [...article.references];
                        next[i] = { ...ref, url: e.target.value };
                        patch({ references: next });
                      }}
                      placeholder="https://"
                      className="field field-bare px-2 py-2"
                      aria-label={`참고자료 ${i + 1} 링크`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        patch({ references: article.references.filter((_, j) => j !== i) })
                      }
                      className="t-label px-3 text-ink-faint transition-colors duration-[var(--duration-base)] hover:text-accent"
                      aria-label={`참고자료 ${i + 1} 삭제`}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <ChipButton
                  tone="outline"
                  className="border-dashed"
                  onClick={() =>
                    patch({
                      references: [
                        ...article.references,
                        { label: "", source: "", url: "" } as Reference,
                      ],
                    })
                  }
                >
                  + Add reference
                </ChipButton>
              </div>
            </>
          ) : (
            <Preview article={{ ...article, slug: computedSlug }} authorName={author.name} />
          )}
        </div>

        {/* ── Sidebar ───────────────────────────────── */}
        <aside className="space-y-8 lg:sticky lg:top-[9rem] lg:self-start">
          <Field label="Author">
            <div className="flex items-center gap-3">
              <Avatar name={author.name} src={author.profileImage} size="md" />
              <div className="min-w-0">
                <p className="t-body truncate">{author.name}</p>
                <p className="t-caption text-ink-faint">본인 명의로만 발행됩니다.</p>
              </div>
            </div>
          </Field>

          <Field label="Topics">
            {/* Pick as many as apply — the first one picked leads the card. */}
            <div className="flex flex-wrap gap-2">
              {topics.map((t) => {
                const on = article.topics.includes(t.name);
                return (
                  <ChipButton
                    key={t.slug}
                    tone={on ? "solid" : "outline"}
                    size="sm"
                    aria-pressed={on}
                    onClick={() =>
                      patch({
                        topics: on
                          ? article.topics.filter((x) => x !== t.name)
                          : [...article.topics, t.name],
                      })
                    }
                  >
                    {t.name}
                  </ChipButton>
                );
              })}
            </div>
            <p className="t-caption mt-3 text-ink-faint">
              {article.topics.length > 0
                ? article.topics.join(" · ")
                : "하나 이상 선택해 주세요."}
            </p>
          </Field>

          <Field label="Cover image">
            <div className="media aspect-[4/3]">
              <CoverMedia
                src={article.coverImage}
                alt=""
                seed={computedSlug || "new-article"}
                topic={article.topics[0]}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const res = await uploadCover(file);
                if (res.url) patch({ coverImage: res.url });
                else setNotice(res.error ?? "업로드에 실패했습니다.");
              }}
              aria-label="커버 이미지 업로드"
              className="t-caption mt-3 block w-full text-ink-muted file:mr-3 file:rounded-pill file:border file:border-line file:bg-transparent file:px-3 file:py-2 file:text-[length:var(--text-label)] file:font-semibold file:uppercase file:tracking-[0.06em]"
            />
            <input
              value={article.coverImage ?? ""}
              onChange={(e) => patch({ coverImage: e.target.value || null })}
              placeholder="또는 이미지 URL"
              className="field mt-2"
              aria-label="커버 이미지 URL"
            />
            <p className="t-caption mt-2 text-ink-faint">
              비워두면 슬러그와 카테고리로 생성된 커버 아트가 사용됩니다.
            </p>
          </Field>

          <Field label="Published date">
            <input
              type="date"
              value={article.publishedAt}
              onChange={(e) => patch({ publishedAt: e.target.value })}
              className="field"
              aria-label="발행일"
            />
          </Field>

          <Field label="Slug">
            <input
              value={computedSlug}
              onChange={(e) => {
                setSlugTouched(true);
                patch({ slug: slugify(e.target.value) });
              }}
              placeholder="auto-from-title"
              className="field"
              aria-label="슬러그"
            />
            <p className="t-caption mt-2 text-ink-faint">/articles/{computedSlug || "…"}</p>
          </Field>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-line pt-4">
      <p className="t-label mb-3 text-ink-faint">{label}</p>
      {children}
    </div>
  );
}

function Preview({ article, authorName }: { article: Article; authorName: string }) {
  return (
    <div className="surface p-6 sm:p-12">
      <p className="t-label mb-8 text-ink-faint">Preview</p>

      <div className="flex flex-wrap items-center gap-3">
        {article.topics.map((t, i) => (
          <Chip key={t} tone={i === 0 ? "solid" : "outline"} size="sm">
            {t}
          </Chip>
        ))}
        <span className="t-caption text-ink-muted">{formatDate(article.publishedAt)}</span>
      </div>

      <h1 className="t-h1 mt-6 text-balance">{article.title || "제목 없음"}</h1>
      {article.subtitle && (
        <p className="t-body-lg mt-6 max-w-[50ch] text-ink-muted">{article.subtitle}</p>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 border-y border-line py-3">
        <span className="t-body">{authorName}</span>
        <span className="t-caption text-ink-faint">
          읽는 데 약 {readingTime(article.content)}분
        </span>
      </div>

      <div className="media mt-8 aspect-[21/9]">
        <CoverMedia
          src={article.coverImage}
          alt=""
          seed={article.slug || "preview"}
          topic={article.topics[0]}
        />
      </div>

      <div className="mt-12">
        {article.content.trim() ? (
          <ContentBody content={article.content} seed={article.slug || "preview"} />
        ) : (
          <p className="t-body py-16 text-center text-ink-faint">
            본문을 입력하면 여기에 미리보기가 나타납니다.
          </p>
        )}
      </div>
    </div>
  );
}

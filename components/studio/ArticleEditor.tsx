"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { Article, Reference } from "@/lib/types";
import { topics } from "@/lib/data/topics";
import { members } from "@/lib/data/members";
import { useAuth } from "@/components/auth/AuthProvider";
import { ContentBody } from "@/components/content/ContentBody";
import { ImageZoom } from "@/components/content/ImageZoom";
import { ArticleHead } from "@/components/article/ArticleHead";
import { Avatar } from "@/components/ui/Avatar";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Chip, ChipButton } from "@/components/ui/Chip";
import { Toast } from "@/components/ui/Toast";
import { useStuck } from "@/components/ui/useStuck";
import { RichEditor } from "./RichEditor";
import { emptyArticle, persistArticle } from "@/lib/studio";
import {
  firstLine,
  readingTime,
  toBlocks,
  toPlainText,
} from "@/lib/content/doc";
import { cn, slugify } from "@/lib/utils";

export function ArticleEditor({ initial }: { initial?: Article }) {
  const { user, isAdmin } = useAuth();
  const router = useRouter();

  const [article, setArticle] = useState<Article>(
    () => initial ?? emptyArticle(""),
  );
  const [mode, setMode] = useState<"write" | "preview">("write");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [noticeTone, setNoticeTone] = useState<"ok" | "error">("ok");
  const [actionsRef, actionsStuck] = useStuck<HTMLDivElement>();

  // The editor toolbar sticks directly under this bar, and the bar changes
  // height when it wraps. Measure it rather than guess, or the two overlap.
  useEffect(() => {
    const bar = actionsRef.current;
    if (!bar) return;
    const write = () =>
      document.documentElement.style.setProperty(
        "--studio-bar-h",
        `${Math.round(bar.getBoundingClientRect().height)}px`,
      );
    write();
    const ro = new ResizeObserver(write);
    ro.observe(bar);
    return () => {
      ro.disconnect();
      document.documentElement.style.removeProperty("--studio-bar-h");
    };
  }, [actionsRef]);

  // The session may arrive after the first render, so the author falls back
  // rather than being written into state by an effect. RLS only accepts
  // `auth.uid() = author_id`, so this is never a choice — you publish as you.
  const authorId = article.authorId || user?.id || "";
  const author = useMemo(() => {
    const known = members.find((m) => m.id === authorId);
    if (user && authorId === user.id) {
      // The session carries no job title, so the roster fills that in.
      return { name: user.name, profileImage: user.image, title: known?.title };
    }
    return {
      name: known?.name ?? "—",
      profileImage: known?.profileImage ?? null,
      title: known?.title,
    };
  }, [authorId, user]);

  const patch = (values: Partial<Article>) =>
    setArticle((a) => ({ ...a, ...values }));

  // A published article keeps the slug it went out with — changing it would
  // break its URL — so only a new one takes its slug from the title.
  const computedSlug = initial?.slug ? article.slug : article.slug || slugify(article.title);
  const [naming, setNaming] = useState(false);
  /** An address with Hangul in it works, but becomes forty percent-signs the
   *  moment anyone copies it — and every other article here is English. */
  const koreanSlug = /[^\u0000-\u007f]/.test(computedSlug);

  /** Ask for an English address. Used by the button, and once on publish when
   *  the writer never touched the field. */
  async function nameUrl(): Promise<string | null> {
    if (!article.title.trim()) return null;
    setNaming(true);
    try {
      const res = await fetch("/api/slug", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ title: article.title, subtitle: article.subtitle }),
      });
      const body = (await res.json()) as { slug?: string; error?: string };
      if (body.slug) {
        patch({ slug: body.slug });
        return body.slug;
      }
      say(body.error ?? "주소를 짓지 못했습니다.", "error");
      return null;
    } catch {
      say("주소를 짓지 못했습니다.", "error");
      return null;
    } finally {
      setNaming(false);
    }
  }

  /** A textarea does not size itself. Reset before measuring, or it can only
   *  ever get taller. */
  const titleRef = useRef<HTMLTextAreaElement>(null);
  useLayoutEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [article.title, mode]);

  /** Covers come from the article's own pictures — uploading a separate file
   *  only ever produced a cover that appeared nowhere in the piece. */
  const bodyImages = useMemo(() => {
    const seen = new Set<string>();
    for (const block of toBlocks(article.content)) {
      if (
        block.type === "image" &&
        block.src &&
        !block.src.startsWith("art:")
      ) {
        seen.add(block.src);
      }
    }
    return [...seen];
  }, [article.content]);
  const valid =
    article.title.trim().length > 1 && article.content.trim().length > 10;

  function say(message: string, tone: "ok" | "error" = "ok") {
    setNoticeTone(tone);
    setNotice(message);
  }

  async function save(status: Article["status"]) {
    if (!valid) {
      say("제목과 본문을 먼저 채워주세요.", "error");
      return;
    }
    setSaving(true);
    setNotice(null);
    if (!authorId) {
      // Without this the button sits on "Saving…" for good.
      setSaving(false);
      say("로그인이 필요합니다.", "error");
      return;
    }

    // A new piece with a Hangul address gets an English one first. Left to
    // the writer this is a decision at the worst possible moment; asked for
    // here, it is simply done, and the field above shows the answer.
    let slug = computedSlug;
    if (!initial?.slug && (!slug || koreanSlug)) {
      slug = (await nameUrl()) ?? slug;
    }

    const result = await persistArticle({
      ...article,
      authorId,
      slug,
      status,
      // Nothing chosen? Lead with the first picture in the piece.
      coverImage: article.coverImage ?? bodyImages[0] ?? null,
    });
    setSaving(false);

    if (!result.ok) {
      say(result.error ?? "저장에 실패했습니다.", "error");
      return;
    }
    say(
      result.storage === "local"
        ? status === "published"
          ? "발행했습니다 — 데모 모드라 이 브라우저에만 저장됩니다."
          : "초안을 이 브라우저에 저장했습니다."
        : status === "published"
          ? "발행했습니다."
          : "초안을 저장했습니다.",
    );
    // `freeSlug` may have stepped aside from an address already in use, so
    // the piece lives wherever it says, not where we asked.
    const finalSlug = result.slug ?? slug;
    patch({ status, slug: finalSlug });

    // Published means done writing: go and read it. The pause is the length
    // of the toast, so the word lands before the page changes under it.
    if (status === "published" && result.storage !== "local") {
      window.setTimeout(
        () => router.push(`/articles/${encodeURIComponent(finalSlug)}`),
        900,
      );
      return;
    }
    if (!initial) router.replace("/studio");
  }

  if (!user) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">로그인이 필요합니다</p>
        <p className="t-body mt-3 text-ink-muted">
          아티클 작성은 스터디 멤버만 가능합니다.
        </p>
        <ButtonLink href="/login?next=/studio" className="mt-8">
          Sign in →
        </ButtonLink>
      </div>
    );
  }

  // Someone else's article. The database refuses the write anyway, but an
  // editor that opens and then fails on save is worse than one that does not
  // open — so the URL is not a way around the missing Edit link.
  const someoneElses =
    Boolean(initial?.authorId) && initial?.authorId !== user.id && !isAdmin;

  if (someoneElses) {
    return (
      <div className="surface-dashed px-6 py-24 text-center">
        <p className="t-h1">다른 사람의 글입니다</p>
        <p className="t-body mx-auto mt-3 max-w-[40ch] text-ink-muted">
          {author.name}님이 쓴 글이라 수정할 수 없습니다. 읽는 것은 누구나 할 수
          있어요.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {initial?.status === "published" && (
            <ButtonLink href={`/articles/${initial.slug}`}>
              글 보러 가기 →
            </ButtonLink>
          )}
          <ButtonLink href="/studio" variant="secondary">
            ← Studio
          </ButtonLink>
        </div>
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

        <Chip
          tone={article.status === "published" ? "solid" : "outline"}
          size="sm"
        >
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

          <Button
            variant="secondary"
            size="sm"
            disabled={saving}
            onClick={() => save("draft")}
          >
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

      <Toast
        message={notice}
        tone={noticeTone}
        onDone={() => setNotice(null)}
      />

      {/* One column. The article column inside RichEditor already holds the
          measure, so the sidebar was only ever squeezing it. */}
      <div className="mt-12">
        <div className="min-w-0">
          {mode === "write" ? (
            <>
              {/* One sheet: the title sits at the top of the page you are
                  writing, above the rule, the way it reads when published. */}
              <RichEditor
                value={article.content}
                onChange={(content) => patch({ content })}
                meta={`${toPlainText(article.content).length.toLocaleString()}자 · 약 ${readingTime(article.content)}분`}
                header={
                  <>
                    <label htmlFor="title" className="sr-only">
                      Title
                    </label>
                    {/* A textarea, not an input: a title is one line of
                        meaning but not always one line of screen, and an
                        input hides whatever runs past its right edge. Enter
                        is swallowed so the one line stays one line. */}
                    <textarea
                      id="title"
                      ref={titleRef}
                      rows={1}
                      value={article.title}
                      onChange={(e) => patch({ title: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.preventDefault();
                      }}
                      placeholder="제목을 입력하세요"
                      className="editor-title w-full resize-none overflow-hidden border-0 bg-transparent p-0 outline-none placeholder:text-ink-faint"
                    />
                  </>
                }
              />

              <p className="t-label mt-16 text-ink-faint">References</p>
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
                        patch({
                          references: article.references.filter(
                            (_, j) => j !== i,
                          ),
                        })
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

              {/* ── Article details ─────────────────────────
                  Below the writing, not beside it — none of this needs to be
                  in view while you are actually writing. */}
              <section className="mt-16 border-t border-line pt-10">
                <p className="t-label text-ink-faint">Article details</p>

                <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                  <Field label="Author">
                    <div className="flex items-center gap-3">
                      <Avatar
                        name={author.name}
                        src={author.profileImage}
                        size="md"
                      />
                      <div className="min-w-0">
                        <p className="t-body truncate">{author.name}</p>
                        <p className="t-caption text-ink-faint">
                          본인 명의로만 발행됩니다.
                        </p>
                      </div>
                    </div>
                  </Field>

                  {!initial?.slug && (
                    <Field label="URL 주소">
                      <div className="flex items-center gap-2">
                        <input
                          value={article.slug}
                          onChange={(e) => patch({ slug: e.target.value })}
                          placeholder={slugify(article.title) || "제목에서 자동으로"}
                          className="field w-full font-mono text-[0.8125rem]"
                        />
                        <ChipButton
                          size="sm"
                          tone="outline"
                          disabled={naming || !article.title.trim()}
                          onClick={() => void nameUrl()}
                        >
                          {naming ? "짓는 중…" : "AI로 짓기"}
                        </ChipButton>
                      </div>
                      <p className="t-caption mt-2 break-all text-ink-faint">
                        note-d.co.kr/articles/{computedSlug || "…"}
                      </p>
                      {koreanSlug && (
                        <p className="t-caption mt-1 text-ink-faint">
                          한글 주소는 링크를 복사하면 깨져 보입니다. 비워두고 발행하면 영문
                          주소를 지어 넣습니다.
                        </p>
                      )}
                    </Field>
                  )}

                  <Field label="Published date">
                    <input
                      type="date"
                      value={article.publishedAt}
                      onChange={(e) => patch({ publishedAt: e.target.value })}
                      className="field"
                      aria-label="발행일"
                    />
                  </Field>
                </div>

                <div className="mt-8">
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
                </div>

                <div className="mt-8">
                  <Field label="Cover image">
                    <CoverPicker
                      images={bodyImages}
                      value={article.coverImage}
                      original={initial?.coverImage ?? null}
                      onPick={(src) => patch({ coverImage: src })}
                    />
                  </Field>
                </div>
              </section>
            </>
          ) : (
            <Preview
              article={{ ...article, slug: computedSlug }}
              author={author}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-t border-line pt-4">
      <p className="t-label mb-3 text-ink-faint">{label}</p>
      {children}
    </div>
  );
}

function Preview({
  article,
  author,
}: {
  article: Article;
  author: { name: string; title?: string; profileImage?: string | null };
}) {
  // Same padding as the write sheet, so switching tabs does not shift the
  // column. `serif-heads` is what the real article page puts around this.
  return (
    <div className="surface serif-heads px-6 py-12 sm:px-14 sm:py-16">
      <p className="t-label article-column mb-10 text-ink-faint">Preview</p>

      <ArticleHead
        topics={article.topics}
        title={article.title || "제목 없음"}
        // The same line saving would derive, so the preview is honest.
        subtitle={article.subtitle.trim() || firstLine(article.content)}
        author={author}
        publishedAt={article.publishedAt}
        readingMinutes={readingTime(article.content)}
      />

      {/* No cover, because the article page has none: it is the card
          thumbnail and nothing else. */}
      <div className="article-shell mt-16">
        {article.content.trim() ? (
          <>
            <ContentBody
              content={article.content}
              seed={article.slug || "preview"}
            />
            <ImageZoom />
          </>
        ) : (
          <p className="t-body py-16 text-center text-ink-faint">
            본문을 입력하면 여기에 미리보기가 나타납니다.
          </p>
        )}
      </div>
    </div>
  );
}

/** Pick the cover from the pictures already in the article. */
function CoverPicker({
  images,
  value,
  original,
  onPick,
}: {
  images: string[];
  value: string | null;
  /** The cover the article was opened with. */
  original: string | null;
  onPick: (src: string | null) => void;
}) {
  // Whatever the article opened with stays on offer, along with the current
  // pick — otherwise choosing a different cover made the old one vanish from
  // the list and there was no way back to it.
  const options = [
    ...new Set([
      ...(original ? [original] : []),
      ...(value ? [value] : []),
      ...images,
    ]),
  ];

  if (!options.length) {
    return (
      <p className="t-caption text-ink-muted">
        본문에 이미지를 넣으면 그중에서 커버를 고를 수 있습니다. 없으면 주제를
        시드로 한 커버 아트가 대신 그려집니다.
      </p>
    );
  }

  const active = value ?? options[0];

  return (
    <>
      <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {options.map((src) => {
          const on = src === active;
          return (
            <li key={src}>
              <button
                type="button"
                onClick={() => onPick(src)}
                aria-pressed={on}
                className={cn(
                  "media block w-full overflow-hidden rounded-md transition-all duration-[var(--duration-base)]",
                  "aspect-[4/3] ring-offset-2",
                  on ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100",
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt="" className="h-full w-full object-cover" />
              </button>
            </li>
          );
        })}
      </ul>
      <p className="t-caption mt-3 text-ink-faint">
        {value
          ? "카드와 목록에 이 이미지가 쓰입니다."
          : "고르지 않으면 첫 번째 이미지가 커버가 됩니다."}
      </p>
    </>
  );
}

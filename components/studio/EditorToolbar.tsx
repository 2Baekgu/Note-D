"use client";

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";

/** The writing toolbar, laid out the way a Korean blog editor lays it out:
 *  attach, block shape, typeface, then the marks, then alignment, then the
 *  things that insert a block. It sticks to the top of the window, because
 *  the reason to reach for it is usually halfway down a draft. */

/** Six steps down from the biggest in-body heading to the smallest body
 *  size. Headings carry weight as well as size, which is what keeps 제목3 and
 *  본문1 apart at two pixels. The preview column mirrors the real ramp. */
const BLOCKS = [
  { label: "제목1", level: 1, preview: "1.5rem", bold: true },
  { label: "제목2", level: 2, preview: "1.25rem", bold: true },
  { label: "제목3", level: 3, preview: "1.0625rem", bold: true },
  { label: "본문1", size: "1", preview: "1rem" },
  { label: "본문2", size: "2", preview: "0.9375rem" },
  { label: "본문3", size: "3", preview: "0.875rem" },
] as const;

/** The site's own two faces first — the serif here is the one the titles are
 *  set in, Fraunces over Noto Serif KR — then the system fallbacks. */
const FONTS = [
  { label: "기본서체", value: "" },
  { label: "프리텐다드", value: "var(--font-sans)" },
  { label: "세리프", value: "var(--font-serif)" },
  { label: "나눔고딕", value: "'Nanum Gothic', sans-serif" },
  { label: "궁서", value: "'Batang', 'UnBatang', serif" },
  { label: "모노", value: "ui-monospace, SFMono-Regular, monospace" },
];

const PALETTE = [
  "#16150f", "#4a4842", "#8a8578", "#c9c4b8", "#ffffff",
  "#e8452a", "#f08b28", "#f5c518", "#1f9d55", "#1d7fd4", "#6b4fd6", "#c2185b",
  "#f9d5cf", "#fbe4cb", "#fdf3c8", "#cfe9d8", "#cfe0f5", "#ddd5f7", "#f7d3e2",
];

/** The three quote shapes from the reference. `null` is the plain left bar,
 *  which is what a quote has always looked like here. */
const QUOTES = [
  ["pull", "가운데 인용", "❝"],
  [null, "세로선 인용", "▎"],
  ["box", "박스 인용", "▭"],
] as const;

const LISTS = [
  ["bullet", null, "글머리 기호", "•"],
  ["bullet", "circle", "속 빈 기호", "◦"],
  ["ordered", null, "번호 매기기", "1."],
] as const;

const RULES = [
  [null, "기본선"],
  ["dots", "점 세 개"],
  ["heavy", "굵은 선"],
  ["wave", "물결"],
  ["diamond", "마름모"],
  ["ring", "동그라미"],
] as const;

/** Drag across the grid to pick a size, the way the reference does. */
function TableGrid({ editor, close }: { editor: Editor; close: () => void }) {
  const [hover, setHover] = useState({ rows: 0, cols: 0 });
  const MAX = 8;

  return (
    <div className="p-2.5">
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${MAX}, 1.05rem)` }}
        onMouseLeave={() => setHover({ rows: 0, cols: 0 })}
      >
        {Array.from({ length: MAX * MAX }, (_, i) => {
          const row = Math.floor(i / MAX) + 1;
          const col = (i % MAX) + 1;
          const on = row <= hover.rows && col <= hover.cols;
          return (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setHover({ rows: row, cols: col })}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                editor
                  .chain()
                  .focus()
                  .insertTable({ rows: row, cols: col, withHeaderRow: true })
                  .run();
                close();
              }}
              className={cn(
                "h-[1.05rem] w-[1.05rem] border",
                on ? "border-ink bg-[rgba(22,21,15,0.12)]" : "border-line",
              )}
            />
          );
        })}
      </div>
      <p className="t-caption mt-2 text-center text-ink-muted">
        {hover.rows ? `${hover.cols} × ${hover.rows}` : "크기를 고르세요"}
      </p>
    </div>
  );
}

/** URL, the text it should read as, and whether it opens in a new tab —
 *  the panel the reference shows, instead of a browser prompt. */
function LinkForm({ editor, close }: { editor: Editor; close: () => void }) {
  const existing = editor.getAttributes("link").href as string | undefined;
  const [url, setUrl] = useState(existing ?? "");
  const [text, setText] = useState("");
  const [blank, setBlank] = useState(true);

  const apply = () => {
    const href = url.trim();
    if (!href) return;
    const chain = editor.chain().focus();
    const label = text.trim();
    if (label) chain.insertContent(label).setTextSelection({
      from: editor.state.selection.from,
      to: editor.state.selection.from + label.length,
    });
    chain
      .setLink({ href, target: blank ? "_blank" : null })
      .run();
    close();
  };

  return (
    <div className="p-3">
      <input
        autoFocus
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); apply(); }
        }}
        placeholder="URL"
        className="field w-full"
      />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") { e.preventDefault(); apply(); }
        }}
        placeholder="대체텍스트"
        className="field mt-2 w-full"
      />
      <label className="t-caption mt-3 flex items-center gap-2 text-ink-muted">
        <input
          type="checkbox"
          checked={blank}
          onChange={(e) => setBlank(e.target.checked)}
          className="h-3.5 w-3.5 accent-[var(--ink)]"
        />
        새창으로 열기
      </label>
      <div className="mt-3 flex justify-end gap-2">
        {existing && (
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => { editor.chain().focus().unsetLink().run(); close(); }}
            className="t-label text-ink-faint underline underline-offset-4"
          >
            해제
          </button>
        )}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={apply}
          className="chip chip-solid chip-sm"
        >
          확인
        </button>
      </div>
    </div>
  );
}

function Divider() {
  return <span className="mx-1.5 h-5 w-px shrink-0 bg-line" aria-hidden="true" />;
}

/** The small dark label the reference shows under whatever the mouse is on.
 *  `title` would do the same job a second and a half later. */
function Tip({ children }: { children: React.ReactNode }) {
  return <span className="editor-tip">{children}</span>;
}

function Btn({
  on,
  label,
  onClick,
  children,
}: {
  on?: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <span className="editor-tipwrap">
      <button
        type="button"
        aria-label={label}
        aria-pressed={on}
        onMouseDown={(e) => e.preventDefault()}
        onClick={onClick}
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-sm text-ink-muted transition-colors duration-[var(--duration-fast)]",
          on ? "bg-ink text-on-inverse" : "hover:bg-[rgba(22,21,15,0.06)] hover:text-ink",
        )}
      >
        {children}
      </button>
      <Tip>{label}</Tip>
    </span>
  );
}

/** A popover anchored under its trigger; closes on outside click or Escape. */
function Menu({
  label,
  trigger,
  children,
  width = "w-44",
}: {
  label: string;
  trigger: React.ReactNode;
  children: (close: () => void) => React.ReactNode;
  width?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrap} className="editor-tipwrap relative shrink-0">
      <button
        type="button"
        aria-label={label}
        aria-expanded={open}
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-8 items-center gap-1 rounded-sm px-2 text-ink-muted transition-colors duration-[var(--duration-fast)]",
          open ? "bg-ink text-on-inverse" : "hover:bg-[rgba(22,21,15,0.06)] hover:text-ink",
        )}
      >
        {trigger}
        <svg width="8" height="8" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-60">
          <path d="m2 4 3 3 3-3" />
        </svg>
      </button>
      {!open && <Tip>{label}</Tip>}
      {open && (
        <div className={cn("surface absolute left-0 top-[calc(100%+0.35rem)] z-40 py-1 shadow-float", width)}>
          {children(() => setOpen(false))}
        </div>
      )}
    </div>
  );
}

function Swatches({ onPick }: { onPick: (color: string) => void }) {
  return (
    // A fixed width, or the absolutely positioned popover shrinks to fit and
    // squeezes the grid into a column of slivers.
    <div className="w-[13.75rem] p-2.5">
      <div className="grid grid-cols-7 gap-2">
        {/* The stroke is drawn inside the circle — rotating a bordered box
            pushed its corners past the rim. */}
        <button
          type="button"
          title="없음"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick("")}
          className="h-5 w-5 overflow-hidden rounded-full border border-line bg-paper"
        >
          <svg viewBox="0 0 20 20" className="h-full w-full">
            <line x1="4" y1="16" x2="16" y2="4" stroke="var(--accent)" strokeWidth="1.5" />
          </svg>
        </button>
        {PALETTE.map((c) => (
          <button
            key={c}
            type="button"
            title={c}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onPick(c)}
            className="h-5 w-5 rounded-full border border-line"
            style={{ background: c }}
          />
        ))}
      </div>
    </div>
  );
}

export function EditorToolbar({
  editor,
  onPickImage,
  uploading,
  meta,
}: {
  editor: Editor;
  onPickImage: (files: File[]) => void;
  uploading: number;
  meta?: React.ReactNode;
}) {
  const item =
    "flex w-full items-center gap-2 px-3 py-2 text-left text-ink transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.05)]";

  const blockLabel =
    BLOCKS.find((b) =>
      "level" in b
        ? editor.isActive("heading", { level: b.level })
        : editor.isActive("paragraph", { size: b.size }),
    )?.label ?? "본문2";

  /** What the colour button should be showing right now. */
  const inkColor = (editor.getAttributes("textStyle").color as string) || "#16150f";
  // Nothing highlighted yet reads as no colour, not as a pending yellow.
  const markColor = (editor.getAttributes("highlight").color as string) || "#ffffff";

  return (
    <div className="editor-toolbar">
      {/* No overflow here: a scrolling row clips the popovers that open out
          of it, which is why nothing appeared on a click. It wraps instead. */}
      <div className="flex flex-wrap items-center gap-0.5 px-1.5 py-1">
        {/* 첨부 */}
        <label className="editor-tipwrap flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-sm text-ink-muted transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.06)] hover:text-ink">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="4" width="18" height="16" rx="2" />
            <circle cx="8.5" cy="9.5" r="1.5" />
            <path d="m4 17 4.5-5 3.5 4 3-2.5L20 17" />
          </svg>
          <input
            type="file"
            accept="image/*"
            multiple
            className="sr-only"
            onChange={(e) => {
              onPickImage(Array.from(e.target.files ?? []));
              e.target.value = "";
            }}
          />
          <Tip>첨부</Tip>
        </label>

        {/* 문단 모양 */}
        <Menu label="문단 모양" trigger={<span className="t-caption">{blockLabel}</span>}>
          {(close) => (
            <>
              {BLOCKS.map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const chain = editor.chain().focus();
                    if ("level" in b) chain.setNode("heading", { level: b.level }).run();
                    else chain.setNode("paragraph", { size: b.size }).run();
                    close();
                  }}
                  className={item}
                  style={{ fontSize: b.preview, fontWeight: "bold" in b ? 600 : 400 }}
                >
                  {b.label}
                </button>
              ))}
            </>
          )}
        </Menu>

        {/* 글꼴 */}
        <Menu label="글꼴" trigger={<span className="t-caption">서체</span>}>
          {(close) => (
            <>
              {FONTS.map((f) => (
                <button
                  key={f.label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const chain = editor.chain().focus();
                    if (f.value) chain.setFontFamily(f.value).run();
                    else chain.unsetFontFamily().run();
                    close();
                  }}
                  className={item}
                  style={{ fontFamily: f.value || undefined }}
                >
                  {f.label}
                </button>
              ))}
            </>
          )}
        </Menu>

        <Divider />

        <Btn label="굵게" on={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <strong className="text-[0.95rem]">B</strong>
        </Btn>
        <Btn label="기울임" on={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <em className="font-serif text-[0.95rem]">I</em>
        </Btn>
        <Btn label="밑줄" on={editor.isActive("underline")} onClick={() => editor.chain().focus().toggleUnderline().run()}>
          <span className="text-[0.9rem] underline underline-offset-[3px]">U</span>
        </Btn>
        <Btn label="취소선" on={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <span className="text-[0.9rem] line-through">T</span>
        </Btn>

        <Menu
          label="글자색"
          width="w-auto min-w-0"
          trigger={
            <span className="flex flex-col items-center leading-none">
              <span className="text-[0.85rem] font-semibold">T</span>
              <span
                className="mt-[1px] h-[3px] w-[13px] rounded-[1px] border border-line"
                style={{ background: inkColor }}
              />
            </span>
          }
        >
          {(close) => (
            <Swatches
              onPick={(c) => {
                const chain = editor.chain().focus();
                if (c) chain.setColor(c).run();
                else chain.unsetColor().run();
                close();
              }}
            />
          )}
        </Menu>

        <Menu
          label="배경색"
          width="w-auto min-w-0"
          trigger={
            <span
              className="flex h-[16px] w-[16px] items-center justify-center rounded-[2px] border border-current text-[0.72rem] font-semibold leading-none"
              style={{ background: markColor }}
            >
              {/* The glyph carries more side bearing on its right than its
                  left, so centring the box leaves the letter looking off. */}
              <span className="-translate-x-[0.5px]">T</span>
            </span>
          }
        >
          {(close) => (
            <Swatches
              onPick={(c) => {
                const chain = editor.chain().focus();
                if (c) chain.setHighlight({ color: c }).run();
                else chain.unsetHighlight().run();
                close();
              }}
            />
          )}
        </Menu>

        <Divider />

        {(
          [
            ["left", "왼쪽 정렬", "M3 5h18M3 10h11M3 15h18M3 20h11"],
            ["center", "가운데 정렬", "M3 5h18M6.5 10h11M3 15h18M6.5 20h11"],
            ["right", "오른쪽 정렬", "M3 5h18M10 10h11M3 15h18M10 20h11"],
            ["justify", "양쪽 정렬", "M3 5h18M3 10h18M3 15h18M3 20h18"],
          ] as const
        ).map(([value, label, d]) => (
          <Btn
            key={value}
            label={label}
            on={editor.isActive({ textAlign: value })}
            onClick={() => editor.chain().focus().setTextAlign(value).run()}
          >
            <svg width="16" height="16" viewBox="0 0 24 25" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d={d} />
            </svg>
          </Btn>
        ))}

        <Divider />

        <Menu
          label="인용"
          width="w-44"
          trigger={
            /* Two filled quote marks — a disc with a tail rising from it,
               which is what the glyph is when it is drawn rather than typed. */
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <circle cx="5.6" cy="15.4" r="5.2" />
              <path d="M1.1 14.2C.7 8.6 3.6 4.2 8.6 2.7c.7-.2 1.3.4 1.1 1.1l-.5 2.1c-.1.4-.4.7-.8.8-2.4.7-3.9 2.9-4.1 6z" />
              <circle cx="17.6" cy="15.4" r="5.2" />
              <path d="M13.1 14.2c-.4-5.6 2.5-10 7.5-11.5.7-.2 1.3.4 1.1 1.1l-.5 2.1c-.1.4-.4.7-.8.8-2.4.7-3.9 2.9-4.1 6z" />
            </svg>
          }
        >
          {(close) => (
            <>
              {QUOTES.map(([variant, label, glyph]) => (
                <button
                  key={label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    const chain = editor.chain().focus();
                    if (!editor.isActive("blockquote")) chain.toggleBlockquote();
                    chain.updateAttributes("blockquote", { variant }).run();
                    close();
                  }}
                  className={item}
                >
                  <span className="w-4 text-center text-ink-faint">{glyph}</span>
                  {label}
                </button>
              ))}
            </>
          )}
        </Menu>

        <Menu
          label="표"
          width="w-auto min-w-0"
          trigger={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <rect x="3" y="4" width="18" height="16" rx="1.5" />
              <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
            </svg>
          }
        >
          {(close) => <TableGrid editor={editor} close={close} />}
        </Menu>

        <Menu
          label="링크"
          width="w-72"
          trigger={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
              <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
              <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
            </svg>
          }
        >
          {(close) => <LinkForm editor={editor} close={close} />}
        </Menu>

        <Menu
          label="목록"
          width="w-44"
          trigger={
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
            </svg>
          }
        >
          {(close) => (
            <>
              {LISTS.map(([kind, variant, label, glyph]) => (
                <button
                  key={label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    if (kind === "ordered") {
                      editor.chain().focus().toggleOrderedList().run();
                    } else {
                      if (!editor.isActive("bulletList")) editor.chain().focus().toggleBulletList().run();
                      editor.chain().focus().updateAttributes("bulletList", { variant }).run();
                    }
                    close();
                  }}
                  className={item}
                >
                  <span className="w-4 text-center text-ink-faint">{glyph}</span>
                  {label}
                </button>
              ))}
            </>
          )}
        </Menu>

        <Menu
          label="구분선"
          width="w-52"
          trigger={
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M4 12h16" />
            </svg>
          }
        >
          {(close) => (
            <div className="py-1">
              {RULES.map(([variant, label]) => (
                <button
                  key={label}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    // setHorizontalRule leaves the cursor in the paragraph
                    // after the rule, so a follow-up updateAttributes finds
                    // no rule to update — every style came out as the plain
                    // one. Insert the node with its variant already on it.
                    editor
                      .chain()
                      .focus()
                      .insertContent({ type: "horizontalRule", attrs: { variant } })
                      .run();
                    close();
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2.5 transition-colors duration-[var(--duration-fast)] hover:bg-[rgba(22,21,15,0.05)]"
                >
                  {/* A constant slot, so the narrower drawings centre in it and every
                      label starts at the same place. */}
                  <span className="flex w-24 shrink-0 justify-center">
                    <span className="rule-sample" data-variant={variant ?? undefined} />
                  </span>
                  <span className="t-caption text-left text-ink-muted">{label}</span>
                </button>
              ))}
            </div>
          )}
        </Menu>

        <Divider />

        <Btn label="실행 취소" onClick={() => editor.chain().focus().undo().run()}>↺</Btn>
        <Btn label="다시 실행" onClick={() => editor.chain().focus().redo().run()}>↻</Btn>

        {uploading > 0 && (
          <span className="t-caption ml-2 shrink-0 text-ink-faint">이미지 {uploading}개 올리는 중…</span>
        )}
        {meta && <span className="t-caption ml-auto shrink-0 pl-3 pr-2 text-ink-faint">{meta}</span>}
      </div>
    </div>
  );
}

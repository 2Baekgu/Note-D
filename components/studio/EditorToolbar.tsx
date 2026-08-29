"use client";

import { useEffect, useRef, useState } from "react";
import type { Editor } from "@tiptap/react";
import { cn } from "@/lib/utils";

/** The writing toolbar, laid out the way a Korean blog editor lays it out:
 *  attach, block shape, typeface, then the marks, then alignment, then the
 *  things that insert a block. It sticks to the top of the window, because
 *  the reason to reach for it is usually halfway down a draft. */

const BLOCKS = [
  { label: "제목1", level: 1 },
  { label: "제목2", level: 2 },
  { label: "제목3", level: 3 },
  { label: "본문1", size: "1.125rem" },
  { label: "본문2", size: "1rem" },
  { label: "본문3", size: "0.875rem" },
] as const;

const FONTS = [
  { label: "기본서체", value: "" },
  { label: "프리텐다드", value: "var(--font-sans)" },
  { label: "본명조", value: "var(--font-serif)" },
  { label: "나눔고딕", value: "'Nanum Gothic', sans-serif" },
  { label: "궁서", value: "'Batang', 'UnBatang', serif" },
  { label: "모노", value: "ui-monospace, SFMono-Regular, monospace" },
];

const PALETTE = [
  "#16150f", "#4a4842", "#8a8578", "#c9c4b8", "#ffffff",
  "#e8452a", "#f08b28", "#f5c518", "#1f9d55", "#1d7fd4", "#6b4fd6", "#c2185b",
  "#f9d5cf", "#fbe4cb", "#fdf3c8", "#cfe9d8", "#cfe0f5", "#ddd5f7", "#f7d3e2",
];

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
        <button
          type="button"
          title="없음"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => onPick("")}
          className="h-5 w-5 rounded-full border border-line bg-paper"
        >
          <span className="block h-full w-full rotate-45 border-l border-accent" />
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
    BLOCKS.find((b) => "level" in b && editor.isActive("heading", { level: b.level }))?.label ??
    "본문2";

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
                    else chain.setParagraph().run();
                    close();
                  }}
                  className={item}
                  style={{
                    fontSize: "level" in b ? `${1.6 - b.level * 0.2}rem` : b.size,
                    fontWeight: "level" in b ? 600 : 400,
                  }}
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
              <span className="mt-[1px] h-[3px] w-[13px] rounded-[1px] bg-accent" />
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
            <span className="flex h-[17px] w-[15px] items-center justify-center rounded-[2px] border border-current text-[0.72rem] font-semibold">
              T
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

        <Btn label="인용" on={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <span className="font-serif text-[0.8rem] font-semibold leading-none tracking-tight">66</span>
        </Btn>

        <Menu label="표" width="w-auto min-w-0" trigger={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="3" y="4" width="18" height="16" rx="1.5" />
            <path d="M3 10h18M3 15h18M9 4v16M15 4v16" />
          </svg>
        }>
          {(close) => (
            <div className="p-2">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => {
                  editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run();
                  close();
                }}
                className={item}
              >
                3 × 3 표 넣기
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { editor.chain().focus().addRowAfter().run(); close(); }}
                className={item}
              >
                아래에 행 추가
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { editor.chain().focus().addColumnAfter().run(); close(); }}
                className={item}
              >
                오른쪽에 열 추가
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => { editor.chain().focus().deleteTable().run(); close(); }}
                className={cn(item, "text-accent")}
              >
                표 삭제
              </button>
            </div>
          )}
        </Menu>

        <Btn
          label="링크"
          on={editor.isActive("link")}
          onClick={() => {
            if (editor.isActive("link")) {
              editor.chain().focus().unsetLink().run();
              return;
            }
            const url = window.prompt("링크 주소");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
            <path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" />
            <path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" />
          </svg>
        </Btn>

        <Menu label="목록" width="w-40" trigger={
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M9 6h11M9 12h11M9 18h11M4.5 6h.01M4.5 12h.01M4.5 18h.01" />
          </svg>
        }>
          {(close) => (
            <>
              <button type="button" onMouseDown={(e)=>e.preventDefault()}
                onClick={() => { editor.chain().focus().toggleBulletList().run(); close(); }} className={item}>
                • 글머리 기호
              </button>
              <button type="button" onMouseDown={(e)=>e.preventDefault()}
                onClick={() => { editor.chain().focus().toggleOrderedList().run(); close(); }} className={item}>
                1. 번호 매기기
              </button>
            </>
          )}
        </Menu>

        <Btn label="구분선" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 12h16" />
          </svg>
        </Btn>

        <Divider />

        <Btn label="실행 취소" onClick={() => editor.chain().focus().undo().run()}>↺</Btn>
        <Btn label="다시 실행" onClick={() => editor.chain().focus().redo().run()}>↻</Btn>

        {uploading > 0 && (
          <span className="t-caption ml-2 shrink-0 text-ink-faint">이미지 {uploading}개 올리는 중…</span>
        )}
        {meta && <span className="t-caption ml-auto shrink-0 pl-3 text-ink-faint">{meta}</span>}
      </div>
    </div>
  );
}

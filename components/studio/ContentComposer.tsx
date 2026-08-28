"use client";

import { useRef, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { ChipButton } from "@/components/ui/Chip";
import { uploadImage } from "@/lib/studio";
import { cn } from "@/lib/utils";

/** The parent owns the text, but uploads finish after the user has kept
 *  typing — so every edit is expressed as an updater rather than a value.
 *  That is what lets a finished upload swap its own placeholder without
 *  clobbering the paragraph written while it was in flight. */
type Update = (prev: string) => string;

let uploadSeq = 0;

export function ContentComposer({
  value,
  onChange,
  id = "content",
  rows = 26,
  placeholder,
}: {
  value: string;
  onChange: (update: Update) => void;
  id?: string;
  rows?: number;
  placeholder?: string;
}) {
  const { mode } = useAuth();
  const areaRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(0);
  const [error, setError] = useState<string | null>(null);

  /** Put the caret somewhere after React has re-rendered the new value. */
  function caretTo(pos: number) {
    window.setTimeout(() => {
      const el = areaRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(pos, pos);
    }, 0);
  }

  function selection() {
    const el = areaRef.current;
    return { start: el?.selectionStart ?? value.length, end: el?.selectionEnd ?? value.length };
  }

  /** Swap the current selection for `text`. */
  function replaceSelection(text: string, caretOffset = text.length) {
    const { start, end } = selection();
    onChange((prev) => prev.slice(0, start) + text + prev.slice(end));
    caretTo(start + caretOffset);
  }

  /** Images, dividers and embeds are block syntax — the parser only matches
   *  them on a line of their own, so pad whatever sits either side. */
  function insertBlock(inner: string) {
    const { start, end } = selection();
    const before = value.slice(0, start);
    const after = value.slice(end);
    const lead = !before || before.endsWith("\n\n") ? "" : before.endsWith("\n") ? "\n" : "\n\n";
    const tail = !after || after.startsWith("\n\n") ? "" : after.startsWith("\n") ? "\n" : "\n\n";
    replaceSelection(lead + inner + tail, lead.length + inner.length);
  }

  function wrap(before: string, after = before, placeholderText = "텍스트") {
    const { start, end } = selection();
    const selected = value.slice(start, end);
    const body = selected || placeholderText;
    onChange((prev) => prev.slice(0, start) + before + body + after + prev.slice(end));
    // With nothing selected the caret lands inside, ready to type over the hint.
    caretTo(selected ? start + before.length + body.length + after.length : start + before.length);
  }

  function prefixLine(prefix: string) {
    const { start } = selection();
    const lineStart = value.lastIndexOf("\n", start - 1) + 1;
    if (value.slice(lineStart).startsWith(prefix)) return;
    onChange((prev) => prev.slice(0, lineStart) + prefix + prev.slice(lineStart));
    caretTo(start + prefix.length);
  }

  /** Drop, paste and the file button all land here. */
  function addImages(list: FileList | File[] | null) {
    const files = Array.from(list ?? []).filter((f) => f.type.startsWith("image/"));
    if (!files.length) return;

    setError(null);
    setUploading((n) => n + files.length);

    // Every file gets a unique token first, so the finished uploads can each
    // find their own spot no matter what order they come back in.
    const jobs = files.map((file) => ({ file, token: `![업로드 중…](#uploading-${(uploadSeq += 1)})` }));
    insertBlock(jobs.map((j) => j.token).join("\n\n"));

    jobs.forEach(async ({ file, token }) => {
      const res = await uploadImage(file, "body");
      setUploading((n) => n - 1);

      if (res.url) {
        const alt = file.name.replace(/\.[^.]+$/, "");
        onChange((prev) => prev.replace(token, `![${alt}](${res.url})`));
      } else {
        setError(res.error ?? "업로드에 실패했습니다.");
        // Take the placeholder back out along with the padding it arrived
        // with, so a failed drop leaves the text exactly as it was.
        onChange((prev) =>
          prev
            .replace(`\n\n${token}\n\n`, "\n\n")
            .replace(`${token}\n\n`, "")
            .replace(`\n\n${token}`, "")
            .replace(token, ""),
        );
      }
    });
  }

  return (
    <div>
      <div className="scroll-x mt-3 flex items-center gap-1.5 pb-1">
        <ChipButton size="sm" tone="ghost" onClick={() => prefixLine("## ")} title="섹션 제목">
          H2
        </ChipButton>
        <ChipButton size="sm" tone="ghost" onClick={() => prefixLine("### ")} title="하위 제목">
          H3
        </ChipButton>
        <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
        <ChipButton size="sm" tone="ghost" onClick={() => wrap("**")} title="굵게">
          <strong>B</strong>
        </ChipButton>
        <ChipButton size="sm" tone="ghost" onClick={() => wrap("*")} title="기울임">
          <em>I</em>
        </ChipButton>
        <ChipButton size="sm" tone="ghost" onClick={() => wrap("==")} title="형광펜">
          ==
        </ChipButton>
        <ChipButton
          size="sm"
          tone="ghost"
          onClick={() => wrap("[", "](https://)", "링크 텍스트")}
          title="링크"
        >
          링크
        </ChipButton>
        <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
        <ChipButton size="sm" tone="ghost" onClick={() => prefixLine("> ")} title="인용">
          인용
        </ChipButton>
        <ChipButton size="sm" tone="ghost" onClick={() => prefixLine("- ")} title="목록">
          목록
        </ChipButton>
        <ChipButton size="sm" tone="ghost" onClick={() => prefixLine("!! ")} title="하이라이트 박스">
          강조
        </ChipButton>
        <ChipButton size="sm" tone="ghost" onClick={() => insertBlock("---")} title="구분선">
          ―
        </ChipButton>
        <span className="mx-1 h-4 w-px shrink-0 bg-line" aria-hidden="true" />
        <ChipButton
          size="sm"
          tone="outline"
          onClick={() => fileRef.current?.click()}
          title="이미지 넣기"
        >
          + 이미지
        </ChipButton>
        <ChipButton
          size="sm"
          tone="ghost"
          onClick={() => insertBlock("@embed https://www.youtube.com/watch?v=")}
          title="영상 임베드"
        >
          영상
        </ChipButton>

        {uploading > 0 && (
          <span className="t-caption ml-1 shrink-0 text-ink-faint">
            이미지 {uploading}개 올리는 중…
          </span>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="sr-only"
        onChange={(e) => {
          addImages(e.target.files);
          e.target.value = "";
        }}
      />

      <div
        className="relative mt-3"
        onDragEnter={(e) => {
          if (!e.dataTransfer.types.includes("Files")) return;
          dragDepth.current += 1;
          setDragging(true);
        }}
        onDragOver={(e) => {
          if (e.dataTransfer.types.includes("Files")) e.preventDefault();
        }}
        onDragLeave={() => {
          // dragleave also fires moving between children, so count instead.
          dragDepth.current -= 1;
          if (dragDepth.current <= 0) {
            dragDepth.current = 0;
            setDragging(false);
          }
        }}
        onDrop={(e) => {
          if (!e.dataTransfer.files.length) return;
          e.preventDefault();
          dragDepth.current = 0;
          setDragging(false);
          addImages(e.dataTransfer.files);
        }}
      >
        <textarea
          ref={areaRef}
          id={id}
          value={value}
          onChange={(e) => {
            const next = e.target.value;
            onChange(() => next);
          }}
          onPaste={(e) => {
            const files = Array.from(e.clipboardData.files).filter((f) =>
              f.type.startsWith("image/"),
            );
            if (!files.length) return;
            // Screenshots paste as files — take them, leave text pastes alone.
            e.preventDefault();
            addImages(files);
          }}
          rows={rows}
          spellCheck={false}
          placeholder={placeholder}
          className={cn(
            "field min-h-[32rem] w-full resize-y leading-[1.8]",
            dragging && "border-accent",
          )}
        />

        {dragging && (
          <div
            className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-md bg-[rgba(255,255,255,0.86)]"
            aria-hidden="true"
          >
            <p className="t-h3 text-accent">놓으면 본문에 들어갑니다</p>
          </div>
        )}
      </div>

      <p className="t-caption mt-2 text-ink-faint">
        이미지는 끌어다 놓거나 붙여넣기(⌘V)로 바로 넣을 수 있습니다. 여러 장도 한 번에 됩니다.
        {mode === "demo" && " 데모 모드에서는 이미지가 글 안에 직접 담겨 용량이 커집니다."}
      </p>

      {error && <p className="t-caption mt-2 text-accent">{error}</p>}
    </div>
  );
}

import "server-only";

import { toPlainText } from "@/lib/content/doc";

/** The top of the 5.6 line. This is a writing job before it is a reasoning
 *  one — the sentence has to be worth reading — and at one call a day the
 *  best model costs a few hundred won a month more than the middle one.
 *  Drop to "gpt-5.6-terra" to roughly halve that. */
const MODEL = "gpt-5.6-sol";
const ENDPOINT = "https://api.openai.com/v1/responses";
const TIMEOUT_MS = 30_000;
/** Enough of the article to summarise. Whole posts run long and the opening
 *  carries the argument; this keeps one call well under a cent. */
const MAX_ARTICLE_CHARS = 6_000;

const SYSTEM_TEMPLATE = `너는 좋은 글을 읽고 친구에게 카톡으로 툭 건네는 사람이다.
"이거 읽어봐"라고 권하는 쪽이 아니라, 글에서 본 이야기를 그대로 들려주는 쪽이다.

## 무엇을 쓰나
아티클이 던지는 질문 하나를 고르고, 그 질문을 따라가는 짧은 글을 쓴다.
질문으로 열고, 글에서 가장 좋았던 대목 한두 개로 그 질문을 밀고 나가고,
답이 어디쯤 있는지만 남기고 멈춘다. 결론까지 다 말하지는 않는다.

## 가장 중요한 것
사례를 나열하지 마라. 하나의 이야기로 이어져야 한다.
앞 문장이 뒷 문장을 부르고, 다 읽었을 때 하나의 생각이 남아야 한다.
사례는 그 생각을 옮기는 도구지, 목록이 아니다.

## 말투
존댓말. 해요체와 합니다체를 섞어 쓴다. 반말 종결어미("~이다", "~한다")는 쓰지 않는다.
위 지시문이 반말로 쓰여 있어도 따라 하지 마라.

글을 평가하지 마라. "흥미롭습니다", "인상적입니다", "읽어보세요", "도움이 될 것입니다"
같은 에디터 말투가 나오면 실패다. 글이 좋다고 말하는 대신, 글 안에서 무슨 일이
벌어지는지를 보여준다. 링크가 이미 붙으니 읽으라고 권할 필요도 없다.
과장하지 않고, 원문에 없는 사실은 지어내지 않는다.

## 형식
공백 포함 {{MAX_CHARS}}자 이내. 이건 반드시 지킨다. 대신 문장을 중간에 끊지는 않는다.
내용이 바뀌는 자리에서 문단을 나누고, 문단 사이에 빈 줄을 하나 넣는다.
이모지는 많아야 하나. 없어도 된다.
소개문 텍스트만 출력한다. 제목, 링크, 작성자, 머리말(📚)은 코드가 붙이니 쓰지 마라.`;

/** A Korean pitch for an article — six to ten sentences in a few short
 *  paragraphs, the kind of thing you would type into a chat to talk somebody
 *  into reading it.
 *
 *  Never throws. `text` is null whenever anything went wrong, and `error`
 *  says what, so the route can report it instead of quietly falling back to
 *  the subtitle and leaving nobody any the wiser. */
export interface SummaryResult {
  text: string | null;
  error?: string;
}

/** The Responses API returns reasoning and message items side by side. Only
 *  the message carries prose. */
function readOutput(json: unknown): string {
  const root = json as {
    output_text?: string;
    output?: { content?: { type?: string; text?: string }[] }[];
  };
  if (typeof root.output_text === "string" && root.output_text.trim()) {
    return root.output_text.trim();
  }
  const parts: string[] = [];
  for (const item of root.output ?? []) {
    for (const block of item.content ?? []) {
      if (block.type === "output_text" && block.text) parts.push(block.text);
    }
  }
  return parts.join("\n").trim();
}

export async function summarise(
  title: string,
  content: string,
  maxChars: number,
): Promise<SummaryResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { text: null, error: "OPENAI_API_KEY is not set" };

  const body = toPlainText(content).trim().slice(0, MAX_ARTICLE_CHARS);
  if (!body) return { text: null, error: "article body is empty" };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        instructions: SYSTEM_TEMPLATE.replace("{{MAX_CHARS}}", String(maxChars)),
        // The title is here so the "do not repeat it" rule has something to
        // avoid, not so it can be quoted back — the code owns the title line.
        input: `### 아티클\n제목: ${title}\n\n"""\n${body}\n"""`,
        reasoning: { effort: "medium" },
        text: { verbosity: "medium" },
        max_output_tokens: 4000,
      }),
    });

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 300);
      console.error(`daily-pick: OpenAI ${res.status} ${detail}`);
      return { text: null, error: `OpenAI ${res.status}: ${detail}` };
    }

    const text = readOutput(await res.json());
    return text ? { text } : { text: null, error: "OpenAI returned no text" };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("daily-pick: summary failed", error);
    return { text: null, error: message };
  }
}

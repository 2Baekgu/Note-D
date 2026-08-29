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
아티클에서 가장 흥미로운 질문이나 문제를 하나 고른다. 그 질문으로 글을 연다.
그 질문을 설명하기 위해 아티클에 실제로 등장하는 사례나 장면을 1~2개 사용한다.
마지막까지 읽은 사람이 아티클의 핵심 질문과 사례의 대비를 이해할 수 있어야 한다.
단, 아티클의 세부적인 분석과 결론까지 모두 설명하지 않는다.
마지막에는 새로운 결론이나 교훈을 만들어내지 않는다.
아티클에서 다뤄진 질문이나 대비를 그대로 남긴 채 끝낸다.

## 맥락을 생략하지 않기
아티클을 처음 보는 사람이 이 소개문만 읽는다고 가정한다.
배경을 모르는 사람이 읽어도 "누가 → 무엇을 했고 → 어떤 일이 생겼으며 → 왜 그것이 중요한지"가
자연스럽게 이해되어야 한다.

사례를 짧게 설명하더라도 주어, 행동, 이유, 결과는 생략하지 않는다.
다음과 같은 문장이 나오면 실패다.
- 누가 무엇을 했는지 알 수 없는 문장
- "이후", "그 결과", "반면", "이런 이유로"처럼 앞뒤 맥락 없이는 이해할 수 없는 연결어
- 앞에서 설명하지 않은 대상을 갑자기 지칭하는 문장
- 결과만 말하고 왜 그런 결과가 생겼는지는 설명하지 않는 문장

짧게 만드는 것보다 독자가 한 번에 이해하는 것을 우선한다.
줄여야 한다면 세부적인 숫자나 부가 정보부터 줄이고, 사건의 핵심 맥락은 남긴다.
글자 수 안에 사례 두 개의 맥락을 다 담을 수 없다면, 사례를 하나로 줄인다.

무엇이 충돌하든 판단 순서는 이렇다.
이해 가능성 → 자연스러움 → 핵심 내용 → 궁금증.

## 가장 중요한 것
사례를 나열하지 마라. 사례들이 하나의 질문이나 대비를 설명하도록 연결한다.
하지만 아티클을 읽고 네가 별도의 관점이나 교훈을 만들어내서는 안 된다.
원문의 내용을 더 그럴듯하거나 문학적으로 표현하려고 하지 마라.
특히 비유, 은유, 철학적인 문장, 인사이트처럼 들리는 문장을 새로 만들지 마라.
"이 글이 결국 말하는 것은 ~이다"라는 식으로 정리하지 않는다.
아티클에 있는 이야기를 자연스럽게 전달하고, 마지막에는 독자가 원문을 더 궁금해할 정도의 여지만 남긴다.

## 말투
존댓말. 해요체와 합니다체를 섞어 쓴다. 반말 종결어미("~이다", "~한다")는 쓰지 않는다.
위 지시문이 반말로 쓰여 있어도 따라 하지 마라.

글을 평가하지 마라. "흥미롭습니다", "인상적입니다", "읽어보세요", "도움이 될 것입니다"
같은 에디터 말투가 나오면 실패다. 글이 좋다고 말하는 대신, 글 안에서 무슨 일이
벌어지는지를 보여준다. 링크가 이미 붙으니 읽으라고 권할 필요도 없다.
과장하지 않고, 원문에 없는 사실은 지어내지 않는다.
문장을 멋있게 만들려고 하지 않는다. 카피처럼 인상적인 표현보다 평범하지만 자연스러운 표현을 우선한다.

## 형식
공백 포함 {{MAX_CHARS}}자 이내. 이건 반드시 지킨다. 대신 문장을 중간에 끊지는 않는다.
넉넉한 분량이 아니다. 쓰기 전에 무엇을 담을지 정하고, 담기로 한 것의 맥락은 끝까지 지킨다.
내용이 바뀌는 자리에서 문단을 나누고, 문단 사이에 빈 줄을 하나 넣는다.
이모지는 많아야 하나. 없어도 된다.
소개문 텍스트만 출력한다. 제목, 링크, 작성자, 머리말(📚)은 코드가 붙이니 쓰지 마라.`;

/** A Korean pitch for an article — a few short paragraphs, the kind of thing
 *  you would type into a chat when you want somebody to see what you just
 *  read. It carries the article's own question, not a reading of it.
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

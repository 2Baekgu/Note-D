import "server-only";

import { toPlainText } from "@/lib/content/doc";

/** The top of the 5.6 line. This is a writing job before it is a reasoning
 *  one — the sentence has to be worth reading — and at one call a day the
 *  best model costs a few hundred won a month more than the middle one.
 *  Drop to "gpt-5.6-terra" to roughly halve that. */
const MODEL = "gpt-5.6-sol";
const ENDPOINT = "https://api.openai.com/v1/responses";
const TIMEOUT_MS = 30_000;
/** Enough of the article to summarise. One of the fifty runs to 8,400
 *  characters and was losing its last quarter — the part a piece usually
 *  spends arriving somewhere. Still well under a cent a call. */
const MAX_ARTICLE_CHARS = 10_000;

const SYSTEM_TEMPLATE = `너는 방금 읽은 글을 UX/UI 스터디 단톡방에 소개하는 알리미다.
읽지 않은 사람도 소개문만 읽으면 이 글이 무슨 이야기이고, 왜 흥미로운지 자연스럽게 이해할 수 있어야 한다.
글을 짧게 요약하는 것이 목적이 아니다.
글을 직접 읽은 사람이 스터디원에게 "이 글은 이런 점이 흥미롭습니다"라고 소개하듯 작성한다.

1. 먼저 글 전체를 이해한다
글을 처음부터 끝까지 읽은 뒤 바로 문장을 만들지 않는다. 먼저 글 전체에서 무엇이 중요한지 판단한다.

* 글쓴이가 궁극적으로 말하려는 것은 무엇인가?
* 글의 중심이 되는 문제의식이나 발견은 무엇인가?
* 앞부분의 사례와 뒷부분의 결론 중 무엇이 더 중요한가?
* 어떤 사례나 근거가 있어야 핵심을 쉽게 이해할 수 있는가?

앞부분에 먼저 등장한 사례라고 해서 중요하다고 판단하지 않는다.
후반부에서 관점이 바뀌거나 더 중요한 결론이 나온다면 그것을 반영한다.
사례 하나를 보고 글 전체의 주장인 것처럼 확대해석하지 않는다.
글에 명시되어 있거나 글 전체의 내용으로 충분히 뒷받침되는 내용만 사용한다.
글에 없는 평가, 해석, 교훈을 임의로 추가하지 않는다.
구체적인 수치나 연구 결과가 나오더라도 숫자 자체를 핵심으로 취급하지 않는다. 그 수치가 글의 주장을 이해하는 데 중요한 경우에만 사용한다.

2. 요약하지 말고 소개한다
정보를 항목별로 정리해서 전달하지 않는다.
글을 읽은 사람이 다른 사람에게 자연스럽게 소개한다고 생각한다.
예를 들어,
"이 글에서는 A를 설명합니다. B라는 사례가 나옵니다. 그리고 C를 주장합니다."
처럼 글의 내용을 보고하듯 쓰지 않는다.
대신,
"우리는 보통 A라고 생각하지만 실제로는 B를 먼저 떠올립니다. 그렇다면 C도 달라져야 하지 않을까요?"
처럼 독자가 내용을 따라가면서 글의 핵심을 자연스럽게 이해할 수 있도록 쓴다.
글쓴이의 주장을 설명하는 대신, 그 주장을 독자에게 직접 건넨다.

3. 개념은 한 번 풀어서 설명한다
글의 핵심이 특정 이론, 개념, 방법론, 원리라면 본문에서 그 개념을 한 번 자연스럽게 풀어 설명한다.
제목에 개념명이 이미 포함되어 있더라도 제목만 보고 의미를 알 수 있다고 가정하지 않는다.
사전식 정의처럼 딱딱하게 설명하지 말고, 무엇인지와 어떻게 작동하는지가 한 번에 이해되도록 쉬운 말이나 구체적인 장면을 활용한다.
개념을 설명한 뒤에는 그 개념이 글에서 왜 중요한지 자연스럽게 연결한다.

4. 첫 문장
제목은 이미 소개문 위에 표시되므로 제목을 반복하지 않는다.
첫 문장은 제목을 풀어 쓰는 문장이 되어서는 안 된다.
글에서 가장 흥미로운 질문, 문제의식, 의외의 사실, 익숙한 경험의 다른 해석 중 하나를 골라 자연스럽게 시작한다.
꼭 질문으로 시작할 필요는 없다.
첫 문장부터 억지로 결론을 말하거나 글의 주제를 정의하지 않는다.
읽는 사람이 다음 문장을 자연스럽게 읽고 싶어지는 시작을 만든다.

5. 글의 흐름
소개문을 읽는 사람이 다음 내용을 자연스럽게 이해할 수 있도록 쓴다.
흥미로운 지점 → 그것이 왜 그런지 → 글에서 보여주는 사례나 근거 → 독자가 가져갈 관점
정해진 구조를 그대로 드러내지 않는다.
모든 글에 같은 순서를 적용하지 않는다.
앞의 문장에서 자연스럽게 다음 문장이 나오도록 연결한다.
사례는 핵심을 이해하는 데 도움이 될 때만 사용한다.
최대 2개까지만 사용하며, 사례를 나열하지 않는다.
사례가 없어도 핵심이 잘 전달된다면 사례를 넣지 않아도 된다.

6. 메타 표현을 피한다
다음과 같은 표현을 습관적으로 사용하지 않는다.

* "이 글은 ~라고 말합니다."
* "이 글에서는 ~를 다룹니다."
* "이 글을 통해 ~를 알 수 있습니다."
* "핵심은 ~입니다."
* "결국 ~가 중요합니다."
* "이를 통해 ~를 보여줍니다."

이런 표현이 반드시 틀린 것은 아니지만, 소개문이 설명문처럼 느껴지게 만들 수 있으므로 필요한 경우에만 사용한다.
글의 내용을 직접 전달할 수 있다면 메타 표현 없이 쓴다.
마찬가지로 모든 글을 억지로 교훈이나 결론으로 마무리하지 않는다.
앞의 내용만으로 의미가 충분히 전달되면 자연스럽게 끝낸다.

7. 자연스러운 문장
문장마다 새로운 정보를 억지로 넣지 않는다.
한 문장을 읽으면 다음 문장이 궁금해지고, 다음 문장을 읽으면 앞의 내용이 자연스럽게 이해되는 흐름을 만든다.
비슷한 문장 구조를 반복하지 않는다.
특히 다음과 같은 패턴을 반복하지 않는다.
"사람은 A가 아니라 B입니다.
그래서 C가 중요합니다.
A의 사례로 D가 있습니다.
결국 E가 중요합니다."
이런 식으로 내용을 기계적으로 조립하지 않는다.
짧은 문장과 조금 긴 문장을 자연스럽게 섞고, 같은 단어와 표현을 반복하지 않는다.

8. 말투
서술하는 문장은 전부 합니다체로 쓴다.
"~해요", "~예요" 같은 요체 서술은 사용하지 않는다.
두 말투를 섞지 않는다.
물음표로 끝나는 문장은 예외다.
"~까요?"처럼 단톡방에서 자연스러운 표현은 사용할 수 있다.
처음 읽는 사람도 쉽게 이해할 수 있는 말을 쓴다.
전문용어가 꼭 필요하지 않다면 쉬운 말로 풀어 쓴다.
문어체로 딱딱하게 쓰지 않되 존댓말은 유지한다.
논문 초록이나 뉴스 기사처럼 쓰지 않는다.
스터디원이 흥미로운 글 하나를 건네받는 느낌으로 쓴다.

9. 길이와 형식
공백 포함 {{MAX_CHARS}}자 이내로 작성한다.
분량을 맞추기 위해 문장을 억지로 줄이거나 늘리지 않는다.
문장을 중간에서 끊지 않는다.
내용의 흐름이 바뀌는 지점에서는 문단을 나누고, 문단 사이에는 빈 줄 하나를 넣는다.
이모지는 필요할 때만 사용한다. 많아야 1~2개이며, 없어도 된다.
생각 과정이나 자기 검토 과정은 출력하지 않는다.
소개문 본문만 출력한다.
제목, 링크, 작성자, 머리말은 출력하지 않는다. 해당 정보는 코드가 붙인다.`;

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
        // Reasoning tokens bill as output, so the ceiling is what a call can
        // cost — not what it usually costs. 500 Korean characters is about
        // 600 tokens, and the rest is thinking room.
        //
        // `medium` because the work here is reading, not writing: an article
        // that sets one thing against another has to be held whole, and at
        // `low` a contrast came back with the same word on both sides of it.
        // One call a day makes the difference a few hundred won a month.
        reasoning: { effort: "medium" },
        text: { verbosity: "medium" },
        max_output_tokens: 3000,
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

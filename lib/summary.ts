import "server-only";

import { toPlainText } from "@/lib/content/doc";

const MODEL = "gpt-5-mini";
const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const TIMEOUT_MS = 20_000;
/** Enough of the article to summarise. Whole posts run long and the opening
 *  carries the argument; this keeps one call well under a cent. */
const MAX_CHARS = 6_000;

const SYSTEM = `너는 콘텐츠 큐레이터다.
아래 아티클을 읽고, 카카오톡으로 지인에게 "이 글 한번 읽어봐"라고 추천하는 것처럼 소개문을 작성해라.
목적은 아티클의 내용을 완벽하게 요약하는 것이 아니다.
독자가 "무슨 글인지 알겠고, 한번 읽어보고 싶다"고 느끼게 만드는 것이 목적이다.

### 작성 원칙
1. 아티클의 핵심 질문이나 흥미로운 문제를 먼저 보여준다.
2. 아티클에서 가장 흥미로운 주장이나 사례 1~2개만 선택한다.
3. 내용을 전부 설명하지 않는다. 결론을 모두 알려주지 않는다.
4. "이 글에서는 ~을 다룹니다" 같은 보고서식 표현을 피한다.
5. 원문에 없는 해석이나 사실을 추가하지 않는다.
6. 숫자와 연구 결과는 정말 중요한 경우에만 사용한다.
7. 전문용어와 딱딱한 표현은 쉽게 풀어 쓴다.
8. 광고처럼 과장하지 않는다.
9. 실제 사람이 카카오톡으로 추천하는 것처럼 자연스럽게 쓴다.
10. 독자가 링크를 클릭할 만한 이유가 마지막에 자연스럽게 남아 있어야 한다.
11. 소개문 안에 아티클 제목을 반복하지 않는다 (제목은 코드가 따로 붙인다).
12. 이모지는 전체에서 1개 정도만, 정말 어울리는 자리에만 쓴다. 없어도 되면 안 써도 된다. 문장마다 붙이거나 문장을 이모지로 시작하지 않는다.

### 길이
전체 소개문은 3~5문장으로 작성한다.
너무 많은 정보를 넣지 않는다.

### 문체
- 친근하지만 가볍지 않게
- 호기심을 자극하되 낚시성 표현은 사용하지 않기
- "충격적인", "반드시 읽어야 할", "놀라운" 같은 과장된 표현 사용하지 않기
- 문장마다 정보를 욱여넣지 않기
- 사람이 직접 추천하는 듯한 자연스러운 한국어 사용

### 출력
소개문 텍스트만 출력한다. 제목, URL, 작성자, 이모지 머리말(📚 등)은 절대 포함하지 마라. 그건 코드가 붙인다.

### 좋은 결과의 기준
내용을 읽지 않은 사람도 이 글이 어떤 이야기인지 이해할 수 있어야 한다.
하지만 소개문만 읽고 아티클의 결론을 모두 알 수 있어서는 안 된다.
"요약했다"는 느낌보다 "읽어보고 싶게 소개했다"는 느낌이 나야 한다.`;

/** A three-to-five sentence Korean pitch for an article — the kind of thing
 *  you would type into a chat to talk somebody into reading it.
 *
 *  Returns null on anything going wrong — no key, a timeout, a bad response.
 *  The caller falls back to the article's own subtitle, because one morning's
 *  message must not depend on OpenAI being up. */
export async function summarise(title: string, content: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return null;

  const body = toPlainText(content).trim().slice(0, MAX_CHARS);
  if (!body) return null;

  const abort = AbortSignal.timeout(TIMEOUT_MS);

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      signal: abort,
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: MODEL,
        // A reasoning model: no `temperature`, and the budget is
        // `max_completion_tokens`, which reasoning tokens also draw from —
        // hence the headroom for a four-line answer.
        max_completion_tokens: 1500,
        reasoning_effort: "low",
        messages: [
          { role: "system", content: SYSTEM },
          {
            role: "user",
            // The title is here so rule 11 has something to avoid repeating,
            // not so it can be quoted back — the code owns the title line.
            content: `### 아티클\n제목: ${title}\n\n"""\n${body}\n"""`,
          },
        ],
      }),
    });

    if (!res.ok) {
      console.error(`daily-pick: OpenAI ${res.status} ${await res.text()}`);
      return null;
    }

    const json = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = json.choices?.[0]?.message?.content?.trim();
    return text || null;
  } catch (error) {
    console.error("daily-pick: summary failed", error);
    return null;
  }
}

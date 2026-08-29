import "server-only";

import { toPlainText } from "@/lib/content/doc";

const MODEL = "gpt-5-mini";
const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const TIMEOUT_MS = 20_000;
/** Enough of the article to summarise. Whole posts run long and the opening
 *  carries the argument; this keeps one call well under a cent. */
const MAX_CHARS = 6_000;

const SYSTEM = `당신은 UX/UI 스터디 단톡방에 오늘의 글을 소개하는 사람입니다.
아티클 본문을 읽고, 사람들이 링크를 누르고 싶어지는 짧은 소개를 씁니다.

무엇을 쓸 것인가
- 글을 소개하지 말고, 글의 알맹이를 직접 말하세요.
- 첫 문장은 훅입니다. 질문, 의외의 사실, 구체적인 장면 중 하나로 여세요.
  좋은 예: "개인화는 분명 편한데, 왜 가끔 소름이 끼칠까?"
- 본문에 나오는 구체적인 사례, 숫자, 브랜드 이름을 미끼로 쓰세요.
  추상적인 요약 한 문단보다 구체적인 장면 하나가 낫습니다.

쓰지 말 것
- "이 글은", "이 아티클은", "본문에서는" 같은 메타 서술로 시작하지 마세요.
- "~를 살펴봅니다", "~를 설명합니다", "~를 짚습니다", "~를 다룹니다" 같은
  논문 초록 투의 서술어를 쓰지 마세요.
- 과장과 낚시. "충격", "반드시", "모두가 놓치는" 같은 표현은 금지입니다.
- 제목을 그대로 반복하지 마세요. 제목은 따로 붙습니다.

형식
- 한국어, 2~3문장. 짧게.
- 한 문장을 한 줄에 쓰고 줄바꿈으로 구분하세요.
- 읽는 사람은 디자이너입니다. 전문용어는 쉬운 말로 풀어 쓰세요.
- 이모지는 요약 전체에서 최대 두 개까지이고, 하나도 없어도 좋습니다.
  문장을 이모지로 시작하지 말고, 문장마다 붙이지 마세요.

담백하되 생기 있게. 광고가 아니라, 재미있게 읽은 사람이 건네는 한마디처럼.`;

/** A short Korean pitch for an article — two or three sentences, one per line.
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
        max_completion_tokens: 1200,
        reasoning_effort: "low",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: `제목: ${title}\n\n본문:\n${body}` },
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

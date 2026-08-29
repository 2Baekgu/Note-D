import "server-only";

import { toPlainText } from "@/lib/content/doc";

const MODEL = "gpt-5-mini";
const ENDPOINT = "https://api.openai.com/v1/chat/completions";
const TIMEOUT_MS = 20_000;
/** Enough of the article to summarise. Whole posts run long and the opening
 *  carries the argument; this keeps one call well under a cent. */
const MAX_CHARS = 6_000;

const SYSTEM = `당신은 UX/UI 스터디의 글을 동료에게 소개하는 사람입니다.
아티클 본문을 읽고 3~4줄로 요약하세요.

규칙:
- 한국어로, 담백한 문장체(~합니다/~입니다).
- 과장하거나 홍보하듯 쓰지 마세요. "필독", "놀라운" 같은 표현 금지.
- 무엇을 다루는 글인지, 읽으면 무엇을 알게 되는지가 드러나게.
- 각 줄은 한 문장. 줄바꿈으로 구분하고 불릿 기호는 쓰지 마세요.
- 제목을 그대로 반복하지 마세요.`;

/** A 3–4 line Korean summary of an article.
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

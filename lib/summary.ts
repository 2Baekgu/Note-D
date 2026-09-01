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

const SYSTEM_TEMPLATE = `너는 방금 읽은 글을 스터디 단톡방에 옮겨 적는 사람이다.
권하는 사람이 아니라, 본 이야기를 그대로 들려주는 사람이다.

## 구조 — 이 순서로 쓴다
1. 질문 하나로 연다. 아티클이 붙들고 있는 질문이다.
2. 그 질문이 드러나는 장면을 하나 쓴다. 아티클에 실제로 나오는 것만.
3. 대비되는 장면이 있으면 하나 더. 없으면 건너뛴다. 사례는 최대 둘이다.
4. 처음 질문으로 돌아와 한 문장으로 닫는다.

마지막 문장은 답이 아니라 질문을 독자에게 넘기는 자리다.
"개인화가 언제 편리함에서 감시로 넘어가는지, 그 경계를 아티클이 따라가요." 같은 식이다.
네가 결론을 내리거나("결국 중요한 건 ~"), 새 질문을 던지거나, 읽으라고 권하면 실패다.

## 말투
문장 끝은 전부 해요체다. "~했어요" "~해요" "~할까요".
"~합니다" "~입니다"와 섞지 않는다. 섞이면 사람이 쓴 글로 읽히지 않는다.

단톡방에 쓰듯 쉽게 말한다. 한 문장에 하나만 담고, 사람과 행동을 주어로 쓴다.
"~하는 것", "~함", "~성", "~화"로 뭉친 명사 표현은 풀어 쓴다.
- 나쁨: 모든 과정을 없애는 경험과 과정에 참여하게 하는 경험이 함께 나타나고 있습니다.
- 좋음: 한쪽은 사용자가 할 일을 없애고, 다른 쪽은 일부러 남겨둬요.

## 맥락
이 글만 읽는 사람을 상대한다. 제품이나 회사 이름이 처음 나오면 그게 무엇인지를
같은 문장에서 밝히고, 왜 지금 그 이야기가 나오는지 앞 문장과 이어 붙인다.
누가 무엇을 왜 했고 어떻게 됐는지가 빠지면 실패다.
줄여야 하면 숫자와 곁가지부터 버리고, 사례를 하나로 줄인다.

## 형식
공백 포함 {{MAX_CHARS}}자 이내. 반드시 지키되 문장을 중간에 끊지 않는다.
내용이 바뀌는 자리에서 문단을 나누고 사이에 빈 줄을 하나 넣는다.
이모지는 많아야 하나, 없어도 된다.
소개문 본문만 출력한다. 제목·링크·작성자·머리말은 코드가 붙인다.`;

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

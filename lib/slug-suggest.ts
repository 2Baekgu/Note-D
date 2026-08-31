import "server-only";
import { slugify } from "@/lib/utils";

/** An English address for a Korean title.
 *
 *  A URL is read by people who cannot read the page yet — in a search result,
 *  in a pasted link, in a share sheet — so it should say what the piece is
 *  about in words they can hold. `filter-bubble` does that; the same title in
 *  Hangul becomes forty percent-signs the moment anybody copies it.
 *
 *  Small job, small model: this is a naming task, not a writing one. */
const MODEL = "gpt-5.6-terra";
const ENDPOINT = "https://api.openai.com/v1/responses";
const TIMEOUT_MS = 15_000;

const INSTRUCTIONS = `You name URLs for a Korean UX/UI study journal.

Given an article title (and sometimes a subtitle), reply with ONE url slug.

Rules:
- lowercase ASCII letters, digits and hyphens only
- two to five words, under 50 characters
- name the concept, not the sentence — prefer the established English term
  for a psychological or design principle when the title uses one
  ("자이가르닉 효과" -> zeigarnik-effect, "필터 버블" -> filter-bubble)
- for a case study, name the product and the subject
  ("배달의민족 주소 설정 뜯어보기" -> baemin-address-setting)
- never transliterate Korean sounds into Latin letters
- no articles (a/the), no filler words, no dates, no site name
- reply with the slug alone and nothing else

A list of addresses already in use may follow. Never return one of them, and
do not return a near-miss of one either — no plurals, no added or dropped
word, nothing that would read as the same piece. Two articles on neighbouring
ideas need names that tell them apart at a glance, so name what makes this one
different.`;

export interface SlugResult {
  slug: string;
  /** Set when the model could not be reached; the fallback was used. */
  error?: string;
}

/** What to fall back to: the title's own words. Hangul survives `slugify`,
 *  which is right for a slug typed by hand and wrong for one nobody chose —
 *  but a working address beats no address. */
const fallback = (title: string) => slugify(title) || "article";

const clean = (raw: string) =>
  raw
    .trim()
    .toLowerCase()
    .replace(/^["'`\s]+|["'`\s.]+$/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 50)
    .replace(/-+$/, "");

export async function suggestSlug(
  title: string,
  subtitle = "",
  taken: string[] = [],
): Promise<SlugResult> {
  const name = title.trim();
  if (!name) return { slug: "" };

  const key = process.env.OPENAI_API_KEY;
  if (!key) return { slug: fallback(name), error: "OPENAI_API_KEY is not set" };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { "content-type": "application/json", authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        instructions: INSTRUCTIONS,
        input: [
          `제목: ${name}`,
          subtitle.trim() ? `부제: ${subtitle.trim()}` : "",
          // The whole archive, so a neighbouring idea gets a name that tells
          // the two apart rather than one the database has to number.
          taken.length ? `\n이미 사용 중인 주소:\n${taken.join("\n")}` : "",
        ]
          .filter(Boolean)
          .join("\n"),
        reasoning: { effort: "low" },
        text: { verbosity: "low" },
        max_output_tokens: 200,
      }),
    });

    if (!res.ok) {
      const detail = (await res.text()).slice(0, 200);
      return { slug: fallback(name), error: `OpenAI ${res.status}: ${detail}` };
    }

    const json = (await res.json()) as {
      output_text?: string;
      output?: { content?: { text?: string }[] }[];
    };
    const raw =
      json.output_text ??
      json.output?.flatMap((o) => o.content ?? []).map((c) => c.text ?? "").join("") ??
      "";

    const slug = clean(raw);
    // A model that answers with a sentence, or with nothing, is no better
    // than not asking.
    if (!slug || slug.length < 3) {
      return { slug: fallback(name), error: "모델이 주소를 만들지 못했습니다." };
    }
    // It was told which addresses are taken; if it used one anyway, say so
    // rather than letting the database quietly append a number.
    if (taken.includes(slug)) {
      return { slug, error: "이미 쓰이는 주소를 골랐습니다. 직접 고쳐주세요." };
    }
    return { slug };
  } catch (error) {
    return {
      slug: fallback(name),
      error: error instanceof Error ? error.message : "요청에 실패했습니다.",
    };
  }
}

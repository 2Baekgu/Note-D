import type { Topic } from "@/lib/types";

/** Topics overlap on purpose — an article about a memory law is Cognitive
 *  Science and UI at once. Anything with no articles yet stays out, so no
 *  filter ever comes back empty. */
export const topics: Topic[] = [
  { id: "t1", name: "UX", slug: "ux", tone: 0, description: "경험 전체의 흐름과 구조에 대한 이야기" },
  { id: "t2", name: "UI", slug: "ui", tone: 1, description: "화면 위에서 벌어지는 구체적인 결정들" },
  { id: "t3", name: "Psychology", slug: "psychology", tone: 2, description: "사람의 마음이 인터페이스와 만나는 지점" },
  { id: "t4", name: "Cognitive Science", slug: "cognitive-science", tone: 5, description: "주의, 기억, 부하 — 생각의 작동 방식" },
  { id: "t5", name: "Interaction", slug: "interaction", tone: 4, description: "반응과 리듬, 그리고 시간의 디자인" },
  { id: "t6", name: "UX Research", slug: "ux-research", tone: 3, description: "묻고, 관찰하고, 해석하는 방법에 대하여" },
  { id: "t7", name: "Product", slug: "product", tone: 6, description: "만드는 일과 파는 일 사이의 긴장" },
  { id: "t8", name: "Design Theory", slug: "design-theory", tone: 9, description: "우리가 물려받은 규칙을 다시 읽기" },
  { id: "t9", name: "AI & UX", slug: "ai-ux", tone: 8, description: "확률적인 시스템을 위한 인터페이스" },
];

export const topicBySlug = (slug: string) => topics.find((t) => t.slug === slug);

export const topicByName = (name: string) =>
  topics.find((t) => t.name.toLowerCase() === name.toLowerCase());

/** Tone index for cover art / accent colours; falls back to a stable hash. */
export function toneFor(topicName: string): number {
  const t = topicByName(topicName);
  if (t) return t.tone;
  let h = 0;
  for (const ch of topicName) h = (h * 31 + ch.charCodeAt(0)) % 10;
  return h;
}

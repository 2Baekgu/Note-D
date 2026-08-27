export const site = {
  name: "Notes:D",
  fullName: "Notes:D — Design Notes on UX/UI",
  tagline: "우리는 사람들이 무언가를 경험하는 방식을 공부합니다.",
  taglineEn: "An asynchronous journal on how people experience things.",
  description:
    "UX/UI, 심리학, 인지과학, 디자인 이론을 함께 읽고 쓰는 비동기 스터디의 아카이브.",
  since: 2025,
  issue: "ISSUE 04",
  intro:
    "Design notes from a small UX/UI study — what we read, and what we made of it.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Articles", href: "/articles" },
    { label: "Members", href: "/members" },
    { label: "About", href: "/about" },
  ],
};

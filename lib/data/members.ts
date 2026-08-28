import type { User } from "@/lib/types";

/** Study roster. Once Supabase auth is wired up these rows live in `profiles`.
 *  `title` and `bio` are placeholders — edit them here.
 *
 *  The emails below are placeholders on purpose, so no personal address sits in
 *  the repo. `scripts/seed.mjs` swaps in the real Google addresses from
 *  SEED_SUYEON_EMAIL / SEED_SIENNA_EMAIL, which is what links these 32 articles
 *  to the accounts that actually sign in. */
export const members: User[] = [
  {
    id: "u-suyeon",
    name: "이수연",
    handle: "suyeon",
    email: "suyeon@noted.study",
    profileImage: null,
    role: "admin",
    title: "UX Designer",
    bio: "UX 심리학과 사용자 리서치를 중심으로 씁니다. 사람들이 왜 그렇게 행동하는지 오래 붙잡고 보는 편이에요.",
    joinedAt: "2025-01-17",
    links: [{ label: "Doodle Day", url: "https://dooday.tistory.com" }],
  },
  {
    id: "u-sienna",
    name: "시에나",
    handle: "sienna",
    email: "sienna@noted.study",
    profileImage: null,
    role: "member",
    title: "UX Designer",
    bio: "UX 법칙과 인지 원리를 정리합니다. 화면 위의 결정을 설명할 수 있는 언어를 찾는 일에 관심이 있어요.",
    joinedAt: "2025-01-18",
  },
];

export const memberById = (id: string) => members.find((m) => m.id === id);
export const memberByHandle = (handle: string) =>
  members.find((m) => m.handle.toLowerCase() === handle.toLowerCase());

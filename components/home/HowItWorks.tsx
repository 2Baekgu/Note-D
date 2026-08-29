const STEPS = [
  {
    n: "01",
    title: "Research",
    body: "각자 관심 있는 주제를 찾아 읽습니다. 논문이든 제품이든, 설명하고 싶은 것이 생길 때까지.",
  },
  {
    n: "02",
    title: "Write",
    body: "읽은 것을 아티클로 옮깁니다. 발표 슬라이드 대신, 나중에 다시 읽을 수 있는 글로.",
  },
  {
    n: "03",
    title: "Read",
    body: "평일 아침 8시, 오픈채팅방으로 그날의 아티클이 한 편 옵니다. 새 글도, 지난 글도.",
  },
  {
    n: "04",
    title: "Discuss",
    body: "각자 편한 시간에 읽고 댓글로 이야기합니다. 같은 시간에 모이지 않아도 되도록.",
  },
];

export function HowItWorks() {
  return (
    <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {STEPS.map((s) => (
        <li key={s.n} className="bg-paper p-8">
          <p className="t-h1 text-accent">{s.n}</p>
          <h3 className="t-h2 mt-6">{s.title}</h3>
          <p className="t-body mt-3 text-ink-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

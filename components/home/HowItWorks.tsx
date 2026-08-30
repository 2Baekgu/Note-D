const STEPS = [
  {
    n: "01",
    title: "Research",
    body: "관심 있는 주제를 찾아봅니다. 논문, 제품, 서비스 등 궁금했던 주제를 살펴보고 더 알아보고 싶은 내용을 찾아갑니다.",
  },
  {
    n: "02",
    title: "Write",
    body: "읽고 배운 내용을 글로 정리합니다. 새롭게 알게 된 내용이나 인상 깊었던 부분을 자신의 언어로 기록합니다.",
  },
  {
    n: "03",
    title: "Read",
    body: "평일 아침 8시, 아티클을 하나씩 공유합니다. 오픈채팅방에서 그날 읽을 글을 확인하고 관심 있는 아티클을 함께 읽습니다.",
  },
  {
    n: "04",
    title: "Discuss",
    body: "읽은 아티클에 대한 생각을 나눕니다. 궁금했던 점이나 인상 깊었던 부분을 댓글로 자유롭게 이야기합니다.",
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

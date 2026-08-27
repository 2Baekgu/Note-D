import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/37 */
export const holisticVsAnalyticCognition: Article = {
  id: "a-holistic-vs-analytic-cognition",
  slug: "holistic-vs-analytic-cognition",
  title: "문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이",
  subtitle: "UX를 공부하다 보면 한 번쯤 마주치는 질문이 있다. “같은 화면을 보고도 왜 반응이 다를까?”",
  authorId: "u-suyeon",
  topics: ["Cognitive Science", "Design Theory"],
  coverImage: "/images/holistic-vs-analytic-cognition/01.png",
  status: "published",
  featured: true,
  publishedAt: "2026-02-22",
  createdAt: "2026-02-22",
  updatedAt: "2026-02-22",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/37" },
  ],
  content: `UX를 공부하다 보면 한 번쯤 마주치는 질문이 있다. “같은 화면을 보고도 왜 반응이 다를까?”

그 출발점에 있는 연구 흐름이 바로 **문화와 사고체계에 관한 인지 연구**,
즉 **Holistic vs Analytic Cognition**이다.

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/02.png)

EBS 다큐프라임 동과 서에서 소개된 장면이다.

세 가지 제시:

- 원숭이 (Monkey)
- 팬더 (Panda)
- 바나나 (Banana)

결과:

- 동양인 → 원숭이–바나나
- 서양인 → 원숭이–팬더

왜 이런 차이가 날까?

동양인은 “원숭이는 바나나를 먹는다”라는 **관계**를 본다.
서양인은 “원숭이와 팬더는 동물이다”라는 **범주**를 본다.

이 차이를 설명하는 것이 바로 Holistic vs Analytic cognition 연구다.

---

## Holistic vs Analytic cognition?

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/03.png)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/04.png "동양 vs 서양 pick")

### Holistic Cognition (총체적 사고)

- 사물 간 관계와 맥락을 중심으로 인지한다
- 장(field) 전체를 본다
- 상호작용과 연결성에 주목한다

### Analytic Cognition (분석적 사고)

- 개별 대상의 속성과 범주를 중심으로 인지한다
- 배경보다 핵심 객체를 본다
- 규칙과 분류를 중시한다

이 개념은 **문화 간 인지 연구의 대표 프레임워크**다.

---

## 미시간 물고기 테스트 (Fish Tank Experiment)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/05.jpg)

수족관 영상을 보여주고 기억을 질문한다.

- 미국인 → 가장 큰 물고기 중심으로 설명
- 일본인 → 배경, 물풀, 관계까지 언급

동양인은 장 전체를, 서양인은 중심 객체를 더 잘 기억한다.

---

## 동서양의 독(毒)의 색도 다르다?

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/06.jpg)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/07.png "https://bbs.ruliweb.com/community/board/300143/read/69021437, https://www.youtube.com/watch?v=svdJhNahuBg")

이건 실험 논문은 아니지만, 문화적 학습 차이를 보여주는 흥미로운 예시다.

### 🟢 서양권

독 = 초록색 이미지
→ 비소(arsenic) 역사적 상징
→ 만화, 게임에서 독성 물질은 초록색으로 표현되는 경우가 많음

### 🟣 동양권

독 = 보라색 이미지
→ 투구꽃(aconitum, aconite)
→ 전통 독초 이미지가 보라색 계열

즉, 위험과 독성이라는 개념조차 문화적 상징 체계 속에서 학습된다. 이 사례는 Holistic vs Analytic 실험과 직접 연결된 연구는 아니지만, 문화가 지각과 연상 체계를 형성한다는 점을 직관적으로 보여준다.

---

## 동양 vs 서양 차이가 UX/UI에 반영되는 방식

### 1. 포털 구조 차이 – 정보 밀도 vs 기능 집중

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/08.png)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/09.webp)

**Yahoo Japan**

- 뉴스, 쇼핑, 광고, 날씨 등 한 화면에 다수 정보
- 관계적 구조 (포털 허브 역할)
- 맥락적 탐색 유도

**Google**

- 검색창 하나 중심
- 핵심 객체 강조
- 단일 기능 집중 UX

동양권 → 맥락과 정보 연결 중시
서양권 → 핵심 기능 단순화 선호

최근 Yahoo Japan도 점차 단순화되었지만, 여전히 정보 밀도는 높은 편이다.

### 2. 이커머스 상품 페이지 – 관계 기반 vs 속성 기반

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/10.jpg)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/11.png)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/12.png)

**Taobao**

- 라이브, 추천, 연관상품, 이벤트가 동시에 배치
- 커뮤니티·실시간 맥락 강조
- 관계 기반 구매 경험

**Amazon**

- 상품 이미지 + 가격 + 스펙 중심
- 리뷰는 있지만 구조는 속성 기반
- 비교·필터 기능 강함

동양권 → “함께 본 상품”, “지금 인기” 등 관계 강조
서양권 → 제품 스펙·리뷰 점수 중심 판단

### 3. 메신저 UX – 관계 네트워크 vs 기능 인터페이스

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/13.png)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/14.jpg)

![문화와 사고 체계 (Holistic vs Analytic Cognition) : 동과서의 차이](/images/holistic-vs-analytic-cognition/15.jpg)

**카카오톡**

- 친구, 채널, 쇼핑, 게임 등 확장 생태계
- 관계망 기반 UX 확장

**WhatsApp**

- 채팅 중심
- 기능 최소화
- 메시지 객체 중심 구조

동양권 → 플랫폼화, 관계망 확장
서양권 → 핵심 기능 집중

---

## 결론

Holistic vs Analytic cognition 연구는 UX가 단순한 시각 디자인이 아니라 **인지 구조 위에서 작동하는 설계 행위**라는 점을 보여준다. 사용자는 단순히 화면을 “본다”가 아니라 자신이 속한 문화 속에서 **해석한다**. 그래서 글로벌 UX를 설계한다면, “사용자는 무엇을 중심으로 볼 것인가?”라는 질문을 문화 맥락 안에서 다시 던져야 한다. 같은 버튼, 같은 색, 같은 구조라도 문화에 따라 전혀 다르게 읽힐 수 있기 때문이다.

하지만 동시에 중요한 점이 있다. 요즘의 UX는 더 이상 순수한 ‘동양형’ 혹은 ‘서양형’으로 나뉘지 않는다.
글로벌 시장, 모바일 환경, 플랫폼 표준화로 인해 맥락 중심 구조와 기능 중심 구조가 점차 혼합되고 있다.

- 서양 서비스도 추천 피드와 관계 기반 UX를 강화하고 있고
- 동양 서비스도 점점 미니멀하고 기능 중심적으로 단순화되고 있다

즉, 문화적 사고 차이는 여전히 존재하지만 그 표현 방식은 점점 유연해지고 있다. 결국 중요한 것은 “동양이냐, 서양이냐”를 구분하는 것이 아니라 👉 **이 사용자는 어떤 맥락에서 이 인터페이스를 해석할 것인가?**

이 질문을 놓치지 않는 것이다. 문화는 사라지지 않는다. 다만, 더 복합적으로 작동할 뿐이다.

---

## Reference

**[https://www.youtube.com/watch?v=J5hOkggR_nk](https://www.youtube.com/watch?v=J5hOkggR_nk)**

[https://www.youtube.com/watch?v=svdJhNahuBg](https://www.youtube.com/watch?v=svdJhNahuBg)`,
};

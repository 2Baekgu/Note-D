import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/30 */
export const userScanning: Article = {
  id: "a-user-scanning",
  slug: "user-scanning",
  title: "사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’",
  subtitle: "사용자가 웹·앱 콘텐츠를 읽는 것이 아니라 시선을 빠르게 움직이며 필요한 정보만 취득하는 행동 패턴을 말한다. 이는 대부분의 사용자가 화면의 모든 문장을 끝까지 읽지 않고, 핵심 키워드·이미지·가격·제목 등…",
  authorId: "u-suyeon",
  topics: ["Cognitive Science", "UI"],
  coverImage: "/images/user-scanning/01.png",
  status: "published",
  publishedAt: "2025-08-10",
  createdAt: "2025-08-10",
  updatedAt: "2025-08-10",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/30" },
  ],
  content: `## 사용자 스캐닝(User Scanning) 이란?

사용자가 웹·앱 콘텐츠를 읽는 것이 아니라 **시선을 빠르게 움직이며 필요한 정보만 취득하는 행동 패턴**을 말한다.
이는 대부분의 사용자가 화면의 모든 **문장을 끝까지 읽지 않고**, 핵심 키워드·이미지·가격·제목 등 **‘시각적 단서’** 위주로 훑어본다는 것을 의미한다.

---

![사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’](/images/user-scanning/02.png "© Interaction Design Foundation, CC BY-SA 4.0")

## Nielsen Norman Group의 Eye-tracking 연구

- **Jakob Nielsen (1997, 2006)**
Nielsen Norman Group의 Eye-tracking 연구에서 웹 사용자의 약 **79%가 ‘읽기(read)’가 아닌 ‘스캔(scan)’ 형태**로 페이지를 탐색한다고 발표했다.
긴 문장보다 굵은 글씨, 첫 단어, 링크 텍스트, 이미지 캡션 등 시각적으로 두드러진 부분에 시선이 몰리는 경향 확인했다.

**시각 패턴 발견**

- **F-Pattern**: 2006년 NNGroup 연구에서 발견했으며, 사용자가 화면을 왼쪽 상단부터 **수평**으로 읽고, 다시 조금 내려와 또 수평으로 읽은 뒤, **왼쪽 세로줄을 따라 끝까지 훑는 패턴**이다.
- **Z-Pattern**: 광고나 랜딩 페이지처럼 정보량이 적고 균등 배치된 화면에서 발견한 패턴으로, 좌→우→대각선→우 하단으로 **시선**이 흐르며 **Z자 형태를** 그린다.

---

![사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’](/images/user-scanning/03.jpg)

## F-Pattern

- 주로 뉴스/블로그, 쇼핑몰같은 **텍스트 위주의 페이지**에서 나타난다.

시선 이동 경로:

1. 왼쪽 상단 모서리에서 시작
2. 본문의 첫 줄(혹은 헤드라인)을 읽는다/스캔
3. 흥미로운 내용을 발견하기 전까지 왼쪽의 열을 따라 아래로 스캔
4. 흥미로운 내용을 좀 더 주의 깊게 읽음
5. 계속 아래로 스캔
6. 이 방법을 반복함으로써 스캐닝 패턴이 E, 또는 F처럼 보이게 되고, 그것이 패턴의 이름이 된다.

**디자인 적용 팁**:

- 제목·첫 단락에 핵심 정보 배치
- 왼쪽 영역에 중요한 메뉴·키워드 배치
- 긴 문장보단 굵은 글씨·리스트·이미지 활용

---

![사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’](/images/user-scanning/04.png)

### Z-Pattern

- 주로 랜딩페이지, 광고, 포스터, 이미지 위주의 단순한 웹페이지같은 텍스트가 적고 중앙에 있지 않은 페이지에서 발생한다.

**시선 이동 경로**:

1. 좌측 상단(로고, 브랜드명) → 우측 상단(메뉴, CTA 버튼)
2. 대각선 이동으로 좌측 하단(핵심 이미지·메시지)
3. 우측 하단(결정 버튼·연락처)

**디자인 적용 팁**:

- 네 꼭짓점에 주요 정보 배치
- 중앙부 대각선 라인에 주목 요소 삽입
- 우하단에 명확한 CTA 버튼 배치

---

## 사용자 스캐닝이 중요한 이유

페이지의 어떤 부분은 자연스럽게 시람들의 눈길을 끄는 반면, 다른 부분은 관심을 받지 못한다는 사실이 있다. 이렇게 **레이아웃에서 '강한' 부분과 '약한' 부분**을 나눌 수 있다.

사람들은 패턴을 따라 배치된 버튼을 무작위로 배치된 다른 것들보다 더 많이 클릭할 것이다.

고로 이 패턴을 알고 유저가 페이지를 방문할 시 **'어떤 순서로 정보를 보게할 것'**인지 생각을 하여 사용자가 자연스러운 흐름을 따르도록 레이아웃을 배치해야한다.

추가로, **시각적 계층을 활용하여 사용자가 더 빠르게 스캐닝**하도록 할 수 있다.

타이포그래피를 사용해 텍스트의 중요성을 강조하고, 특정 색상을 이용해 중요 이미지에 시각적 무게감을 더하는 방법은 시각적 계층을 만들어 사람들이 재빨리 스캔할 수 있게 해준다. 심미적으로도 좋은 효과를 주지만 스캔이 더욱 쉬워지는 효과가 있기 때문에 더욱 좋은 방법이다.

---

## Reference

- Nielsen, J. (2006). F-Shaped Pattern For Reading Web Content. Nielsen Norman Group. [https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)
- Nielsen, J. (1997). How Users Read on the Web. Nielsen Norman Group. [https://www.nngroup.com/articles/how-users-read-on-the-web/](https://www.nngroup.com/articles/how-users-read-on-the-web/)

[F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile)Eleven years after discovering the F-shaped reading pattern, we revisit what it means today.www.nngroup.com](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)

[F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile)Eleven years after discovering the F-shaped reading pattern, we revisit what it means today.www.nngroup.com](https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/)`,
};

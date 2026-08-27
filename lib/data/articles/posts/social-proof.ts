import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/23 */
export const socialProof: Article = {
  id: "a-social-proof",
  slug: "social-proof",
  title: "사회적 증거 (Social Proof)",
  subtitle: "사회적 증거(Social Proof)는 사람들은 다른 사람이 하는 행동을 기준 삼아 자기 행동을 결정한다는 심리적 이론이다.",
  authorId: "u-suyeon",
  topics: ["Psychology", "Product"],
  coverImage: "/images/social-proof/01.png",
  status: "published",
  publishedAt: "2025-05-11",
  createdAt: "2025-05-11",
  updatedAt: "2025-05-11",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/23" },
  ],
  content: `## 사회적 증거 (Social Proof) 란?

사회적 증거(Social Proof)는 사람들은 **다른 사람이 하는 행동을 기준 삼아 자기 행동을 결정**한다는 심리적 이론이다.

UX에서는 사용자가 어떤 행동을 하기 전에 **다른 사람들의 행동, 평가, 수치를 보고 신뢰하거나 결정**하게 되는 심리를 의미한다.

## 사회적 증거 실험

**Robert B. Cialdini**, 1984년 저서 Influence: The Psychology of Persuasion에서 개념 정리를 했다.

- Milgram, Bickman & Berkowitz (1969): 사람들이 하늘을 올려다보는 실험 →** 다수가 하늘을 보면 나도 무의식적으로 따라 보게 됨**
- Cialdini 외 연구팀(2008): 호텔의 수건 재사용 문구에서 ‘다른 손님들도 수건을 재사용했습니다’ 문구가 **행동 유도율을 26%에서 44%로 증가**시킴

## 이론이 서비스에 적용된 사례

### ✅ 긍정적 적용 예시

- **리뷰/평점**: 아마존, 배달의민족 등에서 별점과 리뷰 수는 핵심 사회적 증거로 작용함.
- **"지금 14명이 이 상품을 보고 있어요"**: 숙박앱, 항공권 앱 등에서 실시간 이용자 수를 노출하여 구매 욕구 유발
- **SNS 공유 수/좋아요 수**: 콘텐츠의 신뢰성/인기 판단 기준으로 작용

![사회적 증거 (Social Proof)](/images/social-proof/02.png "카페24")

### ❌ 부정적 적용 예시

- **조작된 리뷰**: 사회적 증거가 신뢰를 기반으로 하는 만큼, 조작되면 사용자 이탈이나 불신 초래
- **0개의 리뷰**: 리뷰가 아예 없으면 오히려 부정적 인상을 줄 수 있음 → 이런 경우 **초기 리뷰 유도 전략**이 중요함

![사회적 증거 (Social Proof)](/images/social-proof/03.jpg)

## 💡 결론

- 신뢰도 높은 사회적 증거 = **사용자 전환율↑**
- 하지만 “너무 과하거나 허위”는 오히려 부정적 효과

---

### Reference

[https://www.nngroup.com/articles/social-proof-ux/](https://www.nngroup.com/articles/social-proof-ux/)

- Cialdini, R. B. (1984). Influence: The Psychology of Persuasion
- Goldstein, N. J., Cialdini, R. B., & Griskevicius, V. (2008). A room with a viewpoint. [https://doi.org/10.1037/0022-3514.95.5.1087](https://doi.org/10.1037/0022-3514.95.5.1087)
- NNGroup: [https://www.nngroup.com/articles/social-proof-ux/](https://www.nngroup.com/articles/social-proof-ux/)
- UX Collective: [https://uxdesign.cc/designing-for-social-proof-3074ebeb38a3](https://uxdesign.cc/designing-for-social-proof-3074ebeb38a3)`,
};

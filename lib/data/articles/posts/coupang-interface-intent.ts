import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/21 */
export const coupangInterfaceIntent: Article = {
  id: "a-coupang-interface-intent",
  slug: "coupang-interface-intent",
  title: "논란의 쿠팡 인터페이스, 의도된 것이다?",
  subtitle: "쿠팡 인터페이스와 관련한 내용인데, 항상 UXUI를 공부하면서 스스로도 생각을 많이 했던 주제였습니다.",
  authorId: "u-suyeon",
  topics: ["UI","Design Theory","Case Study"],
  coverImage: "/images/coupang-interface-intent/01.png",
  status: "published",
  publishedAt: "2025-04-27",
  createdAt: "2025-04-27",
  updatedAt: "2025-04-27",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/21" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/coupang-interface-intent/01.png",
          "alt": "논란의 쿠팡 인터페이스, 의도된 것이다?",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "최근에 재밌는 유튜브 영상을 봤습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "쿠팡 인터페이스와 관련한 내용인데, 항상 UXUI를 공부하면서 스스로도 생각을 많이 했던 주제였습니다."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "\"왜 쿠팡 UI는 촌스러울까?\"",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "개인적인 시각이긴 하겠지만 미니멀하고 브랜드 톤을 활용하여 디자인하는 예쁜(?) 것을 좋아하는 저는 쿠팡의 디자인이 항상 궁금했습니다. 주변에 쿠팡 디자이너들 보시면 훌륭하신 분들도 많아서 역량이 부족한건 아닌거같은데,, 왜 저런 디자인을 하는 것일까 라고 궁금증을 많이 가졌습니다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/coupang-interface-intent/02.png",
          "alt": "논란의 쿠팡 인터페이스, 의도된 것이다?",
          "title": "영상의 내용 中"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/coupang-interface-intent/03.png",
          "alt": "논란의 쿠팡 인터페이스, 의도된 것이다?",
          "title": "영상의 내용 中"
        }
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "쿠팡 인터페이스, 촌스러운가?",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "대부분의 E-커머스 어플을 보면 주로 브랜드를 상징하는 하나의 핵심 색깔을 정하고 채도와 명도를 조절하면서 강조하고 싶은 내용을 구분합니다. 제품을 같은 배경에 촬영하기도 하며 깔끔함을 고수하는 편이죠."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/coupang-interface-intent/04.png",
          "alt": "논란의 쿠팡 인터페이스, 의도된 것이다?",
          "title": "영상의 내용 中"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/coupang-interface-intent/05.png",
          "alt": "논란의 쿠팡 인터페이스, 의도된 것이다?",
          "title": "영상의 내용 中"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "반면, 쿠팡의 경우 원색을 많이 사용하며 상품 보여지는 방식도 와글와글하게 배치하면서 '깔끔함'과는 먼 느낌이 듭니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "다른 E-커머스 앱들과는 다른 느낌이 많이 들기도 하고 커머스계 1등 기업이 왜 이런 디자인을 하게 되었는지 궁금하기도 합니다."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "쿠팡은 왜 이렇게 디자인했을까?",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결론만 말하자면, 전 연령층이 사용하기에 익숙한 UI를 사용했을 것이라는 추측입니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "저는 어릴적 마트 전단지나 배달 카탈로그를 보는 것을 즐겨했습니다. 요즘 시대가 변하면서 좀 더 세련된 되거나 핵심만 강조하는 디자인을 추구하는 경향이라 이젠 마트를 제외하곤 이런 디자인을 볼 수 없어서 추억의 디자인이 되어버리기도 했죠."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "변화를 좋아할 순 있지만 사람들은 오랫동안 보던 것을 더 익숙해하고 좋아할 수도 있습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "쿠팡이 전연령층을 타깃으로 하면서 \"마트 전단지\"처럼 모두가 익숙한 디자인을 고수하는 것입니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "특히, 디지털시대로 진입하면서 마트에서 장을 보던걸 앱으로 장소가 급변화하였는데, 휴대폰을 켜고 끄는 것 자체도 어려워하는 어르신들이 적응을 어려워할 수 있습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "쿠팡은 이러한 고연령층의 어르신들도 어려움 없이 쓸 수 있도록 한 것입니다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/coupang-interface-intent/06.png",
          "alt": "논란의 쿠팡 인터페이스, 의도된 것이다?",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "평소 궁금증이 있던 주제였는데 풀릴 수 있었습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "밑에 영상 한 번 보시면 좋을 듯합니다."
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Youtube",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "“마치 마트 전단지와 비슷하죠” 논란의 쿠팡 인터페이스, 디자인 전문가와 뜯어봄｜크랩"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "[https://www.youtube.com/watch?v=Eo5vtdllzbs&t=157s](https://www.youtube.com/watch?v=Eo5vtdllzbs&t=157s)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "반응형"
          }
        ]
      }
    ]
  }),
};

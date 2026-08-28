import type { Article } from "@/lib/types";

/** Imported from https://blog.naver.com/designer_sienna/223990067628 */
export const decisionFatigue: Article = {
  id: "a-decision-fatigue",
  slug: "decision-fatigue",
  title: "선택을 단순화하는 방법 : 결정 피로 (Decision Fatigue)",
  subtitle: "결정 피로(Decision Fatigue)란 사람들이 반복적으로 많은 결정을 내리다 보니 인지적 자원이 소진되어 판단력이 떨어지는 현상을 말함.",
  authorId: "u-sienna",
  topics: ["Cognitive Science","UX"],
  coverImage: "/images/decision-fatigue/01.png",
  status: "published",
  publishedAt: "2025-08-31",
  createdAt: "2025-08-31",
  updatedAt: "2025-08-31",
  references: [
    { label: "원문 보기", source: "Naver Blog", url: "https://blog.naver.com/designer_sienna/223990067628" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/decision-fatigue/01.png",
          "alt": "선택을 단순화하는 방법 : 결정 피로 (Decision Fatigue)",
          "title": null
        }
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "1. 결정 피로란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결정 피로(Decision Fatigue)란 사람들이 반복적으로 많은 결정을 내리다 보니 인지적 자원이 소진되어 판단력이 떨어지는 현상을 말함."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "UX 맥락에서는 사용자가 너무 많은 선택을 요구받을 때,"
          }
        ]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "결정을 미루거나(탐색 포기)"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "충동적으로 선택하거나"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "아예 서비스를 이탈하는 결과로 이어짐."
                  }
                ]
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
            "text": "👉 결국 "
          },
          {
            "type": "text",
            "text": "전환율, 만족도, 재방문율 모두에 부정적 영향",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 줌."
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
            "text": "2. 왜 UX에서 중요한가?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사람의 뇌는 한정된 에너지로 의사결정을 처리함. 선택이 많을수록 뇌는 “"
          },
          {
            "type": "text",
            "text": "지름길(Heuristics)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "”을 찾게 되고, 그 과정에서 "
          },
          {
            "type": "text",
            "text": "실수나 후회",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "가 생김."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "실제 사례:"
          }
        ]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "OTT 서비스: 수많은 콘텐츠 속에서 오히려 시청을 포기 → ‘넷플릭스 증후군’"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "이커머스: 유사 상품 결과가 과도하게 많으면 비교하다 지쳐 결제를 미루거나 구매를 포기"
                  }
                ]
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
            "text": "👉 옵션이 많아 보이면 처음엔 좋아 보이지만, 실제 사용에서는 오히려 불편하고 피로감을 줌."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/decision-fatigue/02.png",
          "alt": "선택을 단순화하는 방법 : 결정 피로 (Decision Fatigue)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "출처 : "
          },
          {
            "type": "text",
            "text": "https://watcha.com/browse/theater",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://watcha.com/browse/theater"
                }
              }
            ]
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
            "text": "3. 국내 실패 사례 – 여기어때 검색 플로우"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "여기어때는 한때 검색 시 날짜 입력을 필수로 요구하는 흐름을 도입한 적 있음."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "기획 의도 = 더 정확한 예약 결과 제공."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "하지만 사용자들은 단순히 “서울 호텔” 같은 대략적인 탐색을 원했음."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "아직 날짜를 정하지 않은 상태에서 강제로 달력을 선택하게 되자, 불필요한 결정 피로가 쌓임."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "AB 테스트 결과, 이탈률이 급격히 증가해 4일 만에 폐기됨."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "👉 이 사례는 사용자가 꼭 지금 내리지 않아도 되는 결정을 강요하면 UX 실패로 직결된다는 점을 잘 보여줌."
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
            "text": "4. 결정 피로의 결과"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자가 결정 피로를 겪으면 다음과 같은 현상이 나타남."
          }
        ]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "만족도 하락 → “이 서비스 어렵다”는 인식 강화"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "충동적 선택 증가 → 후회, 재사용 의지 저하"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "탐색 중도 포기 → 이탈률 상승"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "전환율 하락 → 결제·가입 포기"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "재방문율 저하 → 장기적인 리텐션 악화"
                  }
                ]
              }
            ]
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
            "text": "5. UX 디자인 전략 – 결정 피로 줄이는 방법"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결정 피로를 완화하기 위해서는 불필요한 선택을 줄이고, 사용자가 자연스럽게 흐름을 이어갈 수 있도록 설계해야 함. 대표적인 전략은 아래와 같음."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "UX 전략",
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
            "text": "설명",
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
            "text": "국내외 예시",
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
            "text": "선택 최소화"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "꼭 필요한 옵션만 남기기"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이커머스: 베스트셀러 먼저 노출"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "기본값 제공"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "고민 없는 합리적 시작점 제시"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결제 시 최근 배송지 자동 선택"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "점진적 공개"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "복잡한 정보는 단계적으로 제시"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "설문조사 → Google Forms 섹션 나누기"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "시각적 계층"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "핵심 선택 강조 (컬러, 크기, 위치)"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Amazon: “Buy Now” 버튼 강조"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "추천 & 개인화"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "AI 기반 큐레이션 제공"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Netflix “Top Picks for You”"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Undo/Redo"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "실수 부담 줄이고 자유 탐색 보장"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "쇼핑몰 장바구니 취소 기능"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이러한 전략을 활용하면 사용자는 덜 고민하고도 원하는 행동을 쉽게 이어갈 수 있음. 결과적으로 전환율과 만족도가 높아지고, 장기적으로는 사용자 신뢰와 재방문율까지 개선됨."
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
            "text": "6. 결론"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결정 피로는 단순한 심리학 용어가 아니라, 사용자 경험의 성패를 가르는 핵심 요인임."
          }
        ]
      },
      {
        "type": "bulletList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "불필요한 선택을 줄이고,"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "기본값과 추천으로 부담을 덜며,"
                  }
                ]
              }
            ]
          },
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "단계적으로 정보를 제공해야 함."
                  }
                ]
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
            "text": "궁극적으로 “덜 고민하게 만드는 UX”가 좋은 UX임."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "많은 기능보다, 명확하고 단순한 경험이 사용자를 만족시키고 돌아오게 만듦."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Reference",
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
            "text": "**https://yozm.wishket.com/magazine/detail/2434**",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://yozm.wishket.com/magazine/detail/2434"
                }
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
            "text": "여기어때 디자이너가 ‘실패’에서 배운 것 | 요즘IT",
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
            "text": "올 상반기에 제게 주어진 가장 큰 프로젝트는 ‘검색 탐색 경험 개선’이었습니다. 장장 6개월 동안 국내와 해외 검색을 통합하는 프로젝트가 진행되었는데요. 결론부터 말씀드리면, 개선한 통합 검색 기능을 실험 4일 만에 막을 내리는 실패의 고배를 마시게 되었어요. 여러 번의 UT와 다양한 솔루션을 만들며 나름 자신 있게 검증된 기능이라고 생각했지만, 예상과 다른 결과에 담당 디자이너로서 아쉬움이 컸는데요. 한편으로 이번 경험을 교훈 삼아 더 뾰족한 결과를 만들기 위해 어떤 부분을 보완해야 할지 제대로 배울 수 있었어요."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "yozm.wishket.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "**https://www.nngroup.com/articles/simplicity-vs-choice/**",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/simplicity-vs-choice/"
                }
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
            "text": "Simplicity Wins over Abundance of Choice",
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
            "text": "As the number of choices increases, so does the effort required to collect information and make good decisions. Featuritis can be an exhausting disease for users."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.nngroup.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "**https://medium.com/@Alekseidesign/decision-fatigue-simplifying-user-choices-through-design-cd5e70cd6ee0**",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://medium.com/@Alekseidesign/decision-fatigue-simplifying-user-choices-through-design-cd5e70cd6ee0"
                }
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
            "text": "Decision Fatigue: Simplifying User Choices Through Design",
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
            "text": "In today’s digital age, users face a barrage of decisions daily — what to read, watch, purchase, or engage with. While offering choices…"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "medium.com"
          }
        ]
      }
    ]
  }),
};

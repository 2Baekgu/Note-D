import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/33 */
export const peakEndRule: Article = {
  id: "a-peak-end-rule",
  slug: "peak-end-rule",
  title: "피크엔드 법칙 (Peak-End Rule) : 사용자는 ‘전체’가 아닌 ‘최고점과 마지막’을 기억한다",
  subtitle: "피크엔드 법칙(Peak-End Rule)은 사람이 어떤 경험을 평가할 때, 그 경험 전체의 평균이 아니라 ‘가장 강렬했던 순간(피크)’과 ‘마지막 순간(엔드)’에 의해 판단한다는 심리학 이론이다.",
  authorId: "u-suyeon",
  topics: ["Psychology","Cognitive Science"],
  coverImage: "/images/peak-end-rule/01.png",
  status: "published",
  publishedAt: "2025-10-19",
  createdAt: "2025-10-19",
  updatedAt: "2025-10-19",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/33" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/peak-end-rule/01.png",
          "alt": "피크엔드 법칙 (Peak-End Rule) : 사용자는 ‘전체’가 아닌 ‘최고점과 마지막’을 기억한다",
          "title": null
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
            "text": "1. 피크엔드 법칙 이란?",
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
            "text": "피크엔드 법칙(Peak-End Rule)은 "
          },
          {
            "type": "text",
            "text": "사람이 어떤 경험을 평가할 때, 그 경험 전체의 평균이 아니라 ‘가장 강렬했던 순간(피크)’과 ‘마지막 순간(엔드)’에 의해 판단한다",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 심리학 이론이다. 즉, 사용자는 서비스 이용의 모든 순간을 기억하지 않고, 감정이 가장 높았던 순간과 마지막 경험을 중심으로 전체 만족도를 형성한다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/peak-end-rule/02.png",
          "alt": "피크엔드 법칙 (Peak-End Rule) : 사용자는 ‘전체’가 아닌 ‘최고점과 마지막’을 기억한다",
          "title": null
        }
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "2. 이론이 탄생한 실험 및 연구",
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
            "text": "이 이론은 심리학자 Daniel Kahneman과 Barbara Fredrickson, Charles Schreiber, Donald Redelmeier (1993)의 연구에서 제시되었다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "📘 대표 실험 : "
          },
          {
            "type": "text",
            "text": "냉수 손 담그기 실험 (Cold Pressor Test)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "orderedList",
        "content": [
          {
            "type": "listItem",
            "content": [
              {
                "type": "paragraph",
                "content": [
                  {
                    "type": "text",
                    "text": "첫 번째 실험: 60초간 손을 담근 후 종료."
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
                    "text": "두 번째 실험: 같은 60초 + 추가로 30초 동안 약간 덜 차가운 물(15°C)에 손을 담그게 함."
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
            "text": "두 번째 실험은 "
          },
          {
            "type": "text",
            "text": "총 90초로 더 긴 고통을 주지만",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ", 마지막이 조금 덜 차가웠기 때문에 "
          },
          {
            "type": "text",
            "text": "참가자 대부분이 두 번째 실험을 “더 나았다”고 평가",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 실험을 통해, 사람들은 ‘총 고통의 양’이 아니라, 가장 강렬한 순간(피크)과 끝의 느낌(엔드)을 기준으로 경험을 판단한다는 사실이 입증되었다."
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "3. 피크엔드 법칙의 활용 사례",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/peak-end-rule/03.jpg",
          "alt": "피크엔드 법칙 (Peak-End Rule) : 사용자는 ‘전체’가 아닌 ‘최고점과 마지막’을 기억한다",
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
            "text": "디즈니랜드 (Disneyland)",
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
            "text": "놀이기구나 공연 등에서 ‘가장 짜릿한 순간(피크)’을 연출하고, "
          },
          {
            "type": "text",
            "text": "귀가 전 ‘퍼레이드’ 같은 즐거운 엔딩 경험",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 제공함으로써 방문객 만족도를 극대화한다. 방문객은 하루의 전체 피로보다 ‘즐거웠던 절정’과 ‘행복한 마무리’로 전체 경험을 긍정적으로 기억한다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/peak-end-rule/04.jpg",
          "alt": "피크엔드 법칙 (Peak-End Rule) : 사용자는 ‘전체’가 아닌 ‘최고점과 마지막’을 기억한다",
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
            "text": "애플 스토어 (Apple Store)",
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
            "text": "매장에서 제품을 직접 체험하며 느끼는 "
          },
          {
            "type": "text",
            "text": "미니멀하고 직관적인 인터랙션이 피크 경험",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 만든다. 결제 단계에서는 빠르고 부드러운 프로세스, 직원의 친절한 작별 인사와 "
          },
          {
            "type": "text",
            "text": "심플한 패키징을 열때까지의 엔딩 UX",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "가 완결된 감정을 남긴다. 사용자는 구매 그 자체보다 “기분 좋은 브랜드 경험”으로 기억하게 된다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/peak-end-rule/05.jpg",
          "alt": "피크엔드 법칙 (Peak-End Rule) : 사용자는 ‘전체’가 아닌 ‘최고점과 마지막’을 기억한다",
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
            "text": "코스트코 (Costco)",
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
            "text": "공장형 매장의 대량의 상품을 찾는 것은 고객 지향이랑은 동떨어져있으나,저렴한 가격으로 구입하는 경험(피크)이 사용자의 감정을 환기시킨다. 계산을 마친 후 푸드코트에서 저렴하고 맛있는 핫도그·피자(엔드)를 먹으며 ‘잘 산 하루’로 마무리된다. 이렇게 설계된 엔딩은 사용자가 피로감보다 "
          },
          {
            "type": "text",
            "text": "만족감과 풍요로움",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 기억하게 만들어 충성도를 높인다."
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

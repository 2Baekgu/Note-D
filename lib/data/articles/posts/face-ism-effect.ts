import type { Article } from "@/lib/types";

/** Imported from https://blog.naver.com/designer_sienna/224184841972 */
export const faceIsmEffect: Article = {
  id: "a-face-ism-effect",
  slug: "face-ism-effect",
  title: "페이시즘 효과 : 프로필 사진의 얼굴 비율이 인상을 바꾼다",
  subtitle: "페이시즘 효과(Face-ism Effect)는 사진이나 이미지에서 얼굴이 차지하는 비율(얼굴중시 비율)이 클수록 그 사람을 더 지적이고, 강력하며, 유능하고 신뢰감 있게 인식하는 심리 현상이다.",
  authorId: "u-sienna",
  topics: ["Psychology","UI"],
  coverImage: "/images/face-ism-effect/01.png",
  status: "published",
  publishedAt: "2026-02-16",
  createdAt: "2026-02-16",
  updatedAt: "2026-02-16",
  references: [
    { label: "원문 보기", source: "Naver Blog", url: "https://blog.naver.com/designer_sienna/224184841972" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/face-ism-effect/01.png",
          "alt": "페이시즘 효과 : 프로필 사진의 얼굴 비율이 인상을 바꾼다",
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
            "text": "1. 페이시즘 효과 정의"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "페이시즘 효과(Face-ism Effect)는 사진이나 이미지에서 "
          },
          {
            "type": "text",
            "text": "얼굴이 차지하는 비율(얼굴중시 비율)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이 클수록 그 사람을 더 지적이고, 강력하며, 유능하고 신뢰감 있게 인식하는 심리 현상이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "반대로 얼굴 비율이 작고 몸이 많이 보이면 더 친근하고, 감정적이며, 따뜻하게 느껴지는 경향이 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "쉽게 말해, "
          },
          {
            "type": "text",
            "text": "얼굴이 크면 “똑똑하고 능력 있어 보이고”, 얼굴이 작으면 “친근하고 사람 좋아 보인다”",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 것이다."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "2. 왜 이런 효과가 생길까?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "인간 뇌는 얼굴을 매우 빠르게 처리한다. 얼굴 인식 전용 영역이 따로 있을 정도로 얼굴에 민감하기 때문에, 얼굴이 크게 나오면 “이 사람은 중요한 사람, 생각이 깊은 사람”으로 자동 판단한다. 이 효과는 1970~80년대부터 미디어 연구에서 발견됐고, 지금도 프로필 사진, 뉴스 사진, 광고 이미지에서 강하게 나타난다."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "3. 웹·앱 UX에서 실제로 어떻게 쓰이고 있을까?"
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
                    "text": "대부분 얼굴과 어깨 위주(얼굴 비율 높음)로 크롭한다. 이렇게 하면 더 전문적이고, 유능하며, 신뢰감 있게 보인다. 실제 LinkedIn 사용자들은 프로필 조회수가 최대 14배까지 증가한다고 할 정도로 얼굴 비율이 중요하다. (캡처 예시 출처: LinkedIn 공식 앱/웹 – 전문적인 헤드샷 프로필 사진)"
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
            "text": "Tinder / 데이팅 앱 프로필",
            "marks": [
              {
                "type": "bold"
              }
            ]
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
                    "text": "얼굴 + 상체 또는 전신 사진을 많이 사용한다. (얼굴 비율 상대적으로 낮음) 더 매력적이고, 친근하며, 활동적인 이미지를 주기 위해서다. LinkedIn처럼 얼굴 위주로 하면 오히려 너무 딱딱하고 권위적으로 보일 수 있다. (캡처 예시 출처: Tinder 공식 앱 – 매치 프로필 사진)"
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
            "text": "Instagram 프로필 / 포스트",
            "marks": [
              {
                "type": "bold"
              }
            ]
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
                    "text": "인플루언서나 개인 브랜딩에서는 상황에 따라 다르다. 전문 콘텐츠일 때는 얼굴 크게, 일상·패션 콘텐츠일 때는 상체~전신을 많이 보여 친근함을 강조한다. (캡처 예시 출처: Instagram 공식 앱 – 프로필 사진 및 피드 이미지)"
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
            "text": "기업 사이트나 강사 소개 페이지",
            "marks": [
              {
                "type": "bold"
              }
            ]
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
                    "text": "전문성을 강조할 때는 얼굴 비율을 높여 헤드샷 스타일로 사용한다. 반대로 커뮤니티나 브랜드 친근함을 강조할 때는 상체 이상을 보여준다."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "4. UX 디자인 실무 팁"
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
                    "text": "신뢰·전문성·권위를 주고 싶을 때",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 얼굴 비율 높이기 (Face-ism Ratio 약 2/3 이상 권장)"
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
                    "text": "친근함·따뜻함·접근성을 주고 싶을 때",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 얼굴 비율 낮추기 (상체 또는 전신)"
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
                    "text": "과도하게 얼굴 비율을 높이면 차갑거나 권위적으로 느껴질 수 있으니, 목적에 맞게 조절하는 게 중요하다."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "5. 결론"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "페이시즘 효과는 프로필 사진 한 장으로도 사용자가 “이 사람은 어떤 사람일까?”를 0.1초 만에 판단하게 만드는 강력한 심리다. UX에서는 특히 "
          },
          {
            "type": "text",
            "text": "프로필, 아바타, 소개 이미지",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "를 설계할 때 이 효과를 의식적으로 활용하면 첫인상을 크게 바꿀 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "LinkedIn처럼 전문성을 강조하는 서비스는 얼굴 비율을 높이고, Tinder나 Instagram처럼 감성·매력을 강조하는 서비스는 얼굴 비율을 적절히 낮추는 식으로 쓰인다."
          }
        ]
      }
    ]
  }),
};

import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/10 */
export const framingEffect: Article = {
  id: "a-framing-effect",
  slug: "framing-effect",
  title: "프레이밍 효과 (Framing Effect)",
  subtitle: "프레이밍 효과(Framing Effect)는 같은 정보라도 제시되는 방식(프레임)에 따라 사람의 의사결정이나 판단이 달라지는 인지 편향을 의미함. 즉, 동일한 사실을 긍정적으로 표현하느냐, 부정적으로…",
  authorId: "u-suyeon",
  topics: ["Psychology", "UI"],
  coverImage: "/images/framing-effect/01.png",
  status: "published",
  publishedAt: "2025-02-16",
  createdAt: "2025-02-16",
  updatedAt: "2025-02-16",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/10" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "프레이밍 효과 (Framing Effect) 란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "프레이밍 효과(Framing Effect)는 같은 정보라도 "
          },
          {
            "type": "text",
            "text": "제시되는 방식(프레임)에 따라 사람의 의사결정이나 판단이 달라지는 인지 편향",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 의미함. 즉, 동일한 사실을 긍정적으로 표현하느냐, 부정적으로 표현하느냐에 따라 사람들의 선택이 달라질 수 있다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/framing-effect/02.png",
          "alt": "프레이밍 효과 (Framing Effect)",
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
            "text": "카너먼 & 트버스키 (Kahneman & Tversky, 1981)의 연구"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "연구자들은 사람들이 위험을 감수하는 방식이 프레이밍에 의해 어떻게 영향을 받는지를 조사하고자"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "\"질병이 퍼져 600명이 사망할 수 있는 상황\"을 가정하고, 두 가지 방식으로 해결책을 제시했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": " 긍정적 프레이밍:",
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
                    "text": "프로그램 A: 200명이 "
                  },
                  {
                    "type": "text",
                    "text": "확실히 생존.",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
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
                    "text": "프로그램 B: 1/3 확률로 600명 전원 생존,"
                  },
                  {
                    "type": "text",
                    "text": " 2/3 확률로 전원 사망",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "."
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
            "text": "→ 대다수의 사람들이 확실한 생존을 보장하는 "
          },
          {
            "type": "text",
            "text": "A를 선택",
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
            "text": "부정적 프레이밍:",
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
                    "text": "프로그램 C: 400명이 "
                  },
                  {
                    "type": "text",
                    "text": "확실히 사망.",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
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
                    "text": "프로그램 D: 1/3 확률로 전원 생존, "
                  },
                  {
                    "type": "text",
                    "text": "2/3 확률로 전원 사망.",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
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
            "text": "→ 같은 의미의 선택지이지만, 부정적으로 표현되자 대다수가 "
          },
          {
            "type": "text",
            "text": "도박적 선택(D)을 선택",
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
            "text": "연구 결과, "
          },
          {
            "type": "text",
            "text": "사람들은 손실을 피하려는 경향이 강하며",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ", 프레이밍에 따라 위험 회피적이거나 위험 감수적인 결정을 내릴 가능성이 높아진다는 것을 알 수 있다."
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
            "text": "UXUI에서 프레이밍 효과 적용 사례"
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
            "text": "1. UX 라이팅에서의 적용"
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
                    "text": "긍정적 프레임: \"지금 가입하면 30일 동안 무료 체험이 가능합니다!\""
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
                    "text": "부정적 프레임: \"오늘 가입하지 않으면, 30일 무료 체험 기회를 놓칠 수도 있습니다!\""
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
                    "text": "두 문장은 동일한 의미지만, 사용자는 첫 번째 문장에서 더 긍정적인 경험을 느끼고 두 번째 문장에서 더 강한 행동 유도(손실 회피 성향)를 느낌."
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
            "text": "2. 버튼 디자인과 프레이밍"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "옵션 선택을 유도하는 UI",
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
                    "text": "사용자가 결정을 내리는 과정에서 특정 옵션을 더 매력적으로 보이게 하려면 프레이밍이 중요함."
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
            "text": "예: 뉴스레터 구독 해지 버튼"
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
                    "text": "❌ \"구독 취소\" (부정적 느낌)"
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
                    "text": "✅ \"나중에 다시 구독할게요\" (부정적 감정을 최소화한 프레이밍)"
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
            "text": "3. 가격제시 & 결제 UX에서 프레이밍 효과"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "구독 서비스의 가격 모델",
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
                    "text": "\"월 3,000원\" vs. \"하루 100원\""
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
                    "text": "같은 금액이지만, 후자가 더 부담이 적어 보이며 사용자 행동을 유도함."
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
                    "text": "실제로 넷플릭스, 스포티파이 같은 서비스가 요금을 프레이밍하는 방식임."
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
            "text": "4. 구매 결정"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "예: 전자제품 구매 시",
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
                    "text": "\"배터리 70% 사용 가능\" vs. \"배터리 30% 소모됨\""
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
                    "text": "첫 번째 표현이 더 긍정적으로 보이며 구매율이 높아질 가능성이 있음."
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
            "text": "5. 오류 메시지 & 사용자 피드백 디자인"
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
                    "text": "부정적 표현:",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " \"비밀번호가 틀렸습니다. 다시 입력하세요.\""
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
                    "text": "긍정적 표현:",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " \"비밀번호가 일치하지 않아요. 다시 확인해 주세요 😊\""
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
                    "text": "사용자 경험을 개선하기 위해 긍정적 표현을 활용하면 불쾌감을 줄이고 서비스 이용 지속성을 높일 수 있음."
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
            "text": "6. 진행 과정에서의 심리적 프레이밍"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "진행도를 보여주는 UI 프레임",
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
                    "text": "\"회원가입 완료까지 3단계 남음\" (부담감 있음)"
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
                    "text": "\"회원가입이 70% 완료되었습니다!\" (진행된 느낌을 강조 → 이탈률 낮춤)"
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
                    "text": "후자가 더 효과적인 UX 전략으로 작용함."
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }),
};

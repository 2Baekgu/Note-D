import type { Article } from "@/lib/types";

/** Imported from https://blog.naver.com/designer_sienna/224176118291 */
export const reactanceEffect: Article = {
  id: "a-reactance-effect",
  slug: "reactance-effect",
  title: "하지 말라고 하면 더 하고 싶어지는 심리 : 리액턴스 효과",
  subtitle: "리액턴스 효과(Reactance Effect)는 1966년 심리학자 잭 브렘이 처음 제안한 개념이다. 쉽게 말해 “내 자유나 선택권을 빼앗으려 하면 오히려 더 강하게 반항하고 싶어지는”심리 상태다.",
  authorId: "u-sienna",
  topics: ["Psychology","Interaction"],
  coverImage: "/images/reactance-effect/01.jpg",
  status: "published",
  publishedAt: "2026-02-08",
  createdAt: "2026-02-08",
  updatedAt: "2026-02-08",
  references: [
    { label: "원문 보기", source: "Naver Blog", url: "https://blog.naver.com/designer_sienna/224176118291" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "1. 리액턴스 효과(Reactance Effect)란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "리액턴스 효과(Reactance Effect)는 1966년 심리학자 잭 브렘이 처음 제안한 개념이다. 쉽게 말해 "
          },
          {
            "type": "text",
            "text": "“내 자유나 선택권을 빼앗으려 하면 오히려 더 강하게 반항하고 싶어지는”",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "심리 상태다. 누가 “이건 꼭 해야 해!”라고 강요하면 “아니, 안 할래!” 하면서 더 멀어지는 그 느낌 그대로다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "UX 디자인에서 이 효과를 모르면 앱이나 웹을 망치기 쉽다. 사용자를 너무 강제로 몰아가면 바로 이탈하게 된다. 예를 들어 “회원가입 안 하면 콘텐츠 못 봐요” 이런 식이면 대부분의 사람들이 짜증 나서 앱을 지워버린다."
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
            "text": "2. 관련 실험 및 연구 배경"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 효과는 인지심리학에서 오랜 연구를 바탕으로 한다. 브렘의 초기 실험에서 특정 선택을 금지하면 오히려 그 선택을 더 하고 싶어하는 경향이 확인됐다. 현대 UX 연구에서도 과도한 제한이나 강제 푸시가 사용자 저항(이탈, 부정적 리뷰, uninstall)을 유발한다는 결과가 반복적으로 나왔다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "실제로 자주 보이는 리액턴스 유발 사례들:"
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
                    "text": "강제 회원가입 (콘텐츠 하나도 안 보여주는 경우)",
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
                    "text": "화면 전체를 가리는 팝업 광고 (닫기 버튼 찾기 힘든 거 특히)",
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
                    "text": "“필수”라고만 적혀 있는 선택지 없는 설문이나 설정",
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
                    "text": "스킵 불가능한 긴 튜토리얼이나 가이드",
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
            "text": "이런 요소 하나만 잘못 들어가도 사용자 기분이 확 상하고, 재방문률이 뚝 떨어진다. 진짜 무서운 부분이다."
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
            "text": "3. 적용 예시"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그럼 어떻게 피할 수 있을까? 핵심은 "
          },
          {
            "type": "text",
            "text": "‘통제감 주기’",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "다. 좋은 앱들은 대부분 사용자에게 선택권을 충분히 주는 방향으로 설계된다. 강제 대신 “이렇게 할래? 아니면 저렇게?” 느낌을 주는 거다. 아래는 대표 사례들이다."
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
                    "text": "Netflix",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " “Are you still watching?” 화면이 대표적이다. 그냥 팝업이 뜨고 “계속 볼래?” “아니” 하면 바로 끝난다. 강제로 멈추는 게 아니라 선택을 주는 방식이라 덜 짜증 난다."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/reactance-effect/01.jpg",
          "alt": "하지 말라고 하면 더 하고 싶어지는 심리 : 리액턴스 효과",
          "title": null
        }
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
                    "text": "Duolingo",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 오랜만에 들어오면 올빼미가 “Am I dreaming? 너 왔어!” 하면서 반겨준다. “LET'S GO!” 버튼 누르면 시작이고, 안 누르면 그냥 나가도 된다. 죄책감은 살짝 주지만 강제는 아니다. 이 균형이 포인트다."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/reactance-effect/02.png",
          "alt": "하지 말라고 하면 더 하고 싶어지는 심리 : 리액턴스 효과",
          "title": null
        }
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
                    "text": "노션",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " \"How are you planning to use Notion?\"에서 개인/팀 선택 후 바로 \"Take me to Notion\" 버튼으로 스킵 가능. 강제 튜토리얼 없이 자유롭게 넘어감."
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/reactance-effect/03.png",
          "alt": "하지 말라고 하면 더 하고 싶어지는 심리 : 리액턴스 효과",
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
            "text": "4. 결론"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결국 사용자한테 “내가 주인공이야”라는 느낌을 주는 게 제일 중요하다. 강제로 끌고 가는 대신 선택을 주면 오히려 더 오래 머물고, 더 좋아하게 된다. 리액턴스 효과는 UX에서 진짜 조심해야 할 포인트 중 하나다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "출처:",
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
            "text": "https://www.netflix.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.netflix.com"
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
            "text": "넷플릭스 대한민국 - 인터넷으로 시리즈와 영화를 시청하세요",
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
            "text": "스마트 TV, 태블릿, 스마트폰, PC, 게임 콘솔 등 다양한 디바이스에서 영화와 시리즈를 마음껏 즐기세요."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.netflix.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://www.duolingo.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.duolingo.com"
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
            "text": "무료로 외국어를 배우세요.",
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
            "text": "재미있고 효과적인 언어 및 다양한 과정이 무료입니다. 빠르고 과학적인 맞춤형 레슨으로 배우세요."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.duolingo.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://www.notion.so",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.notion.so"
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
            "text": "The AI workspace that works for you. | Notion",
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
            "text": "Build custom agents, search across all your apps, and automate busywork. The AI workspace where teams get more done, faster."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.notion.so"
          }
        ]
      }
    ]
  }),
};

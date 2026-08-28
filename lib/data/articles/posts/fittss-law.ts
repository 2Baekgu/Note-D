import type { Article } from "@/lib/types";

/** Imported from https://scented-ant-8c9.notion.site/Fitts-s-Law-1ba962f1c7f780de9a7cce1d2d5d6932 */
export const fittssLaw: Article = {
  id: "a-fittss-law",
  slug: "fittss-law",
  title: "피츠의 법칙 (Fitts’s Law)",
  subtitle: "피츠의 법칙(Fitts' Law)은 인간-컴퓨터 상호작용과 인간공학 분야에서 인간의 행동에 대해 속도와 정확성의 관계를 설명하는 기본적인 법칙이다. 시작점에서 목표로 하는 지역에 얼마나 빠르게 닿을 수 있을지를…",
  authorId: "u-sienna",
  topics: ["Cognitive Science", "UI", "Interaction"],
  coverImage: "/images/fittss-law/01.png",
  status: "published",
  publishedAt: "2025-01-25",
  createdAt: "2025-01-25",
  updatedAt: "2025-01-25",
  references: [
    { label: "원문 보기", source: "Notion", url: "https://scented-ant-8c9.notion.site/Fitts-s-Law-1ba962f1c7f780de9a7cce1d2d5d6932" },
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
            "text": "1. 피츠의 법칙이란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "피츠의 법칙",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "(Fitts' Law)은 "
          },
          {
            "type": "text",
            "text": "인간-컴퓨터 상호작용",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://ko.wikipedia.org/wiki/%EC%9D%B8%EA%B0%84-%EC%BB%B4%ED%93%A8%ED%84%B0_%EC%83%81%ED%98%B8%EC%9E%91%EC%9A%A9"
                }
              }
            ]
          },
          {
            "type": "text",
            "text": "과 "
          },
          {
            "type": "text",
            "text": "인간공학",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://ko.wikipedia.org/wiki/%EC%9D%B8%EA%B0%84%EA%B3%B5%ED%95%99"
                }
              }
            ]
          },
          {
            "type": "text",
            "text": " 분야에서 인간의 행동에 대해 속도와 정확성의 관계를 설명하는 기본적인 법칙이다. 시작점에서 목표로 하는 지역에 얼마나 빠르게 닿을 수 있을지를 예측하고자 하는 것이다. 이는 목표 영역의 크기와 목표까지의 거리에 따라 결정된다. 이 법칙은 "
          },
          {
            "type": "text",
            "text": "폴 피츠",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://ko.wikipedia.org/w/index.php?title=%ED%8F%B4_%ED%94%BC%EC%B8%A0&action=edit&redlink=1"
                }
              }
            ]
          },
          {
            "type": "text",
            "text": "가 1954년에 발표하였다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이를테면,"
          },
          {
            "type": "text",
            "text": " 웹페이지에서 링크가 걸린 버튼이 너무 작으면 클릭하기 힘든 이유를 설명하는 것이다.",
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
            "text": "사용자의 커서 등의 이동시간에 영향을 미치는 것은"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "\"타겟의 사이즈\"",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "와 "
          },
          {
            "type": "text",
            "text": "\"타겟까지의 거리\"",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "라는 것입니다."
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
            "text": "2. 피츠의 법칙이 의미하는 것"
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
                    "text": "목표가 크고 가까울수록 선택 시간이 짧아진다.",
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
                    "text": "작은 목표나 멀리 떨어진 목표는 더 많은 시간이 소요된다."
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
                    "text": "UI/UX 설계에서 버튼 크기, 위치, 배치를 고려할 때 매우 중요한 원칙"
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
          "src": "/images/fittss-law/02.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
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
                    "text": "로그인 버튼의 경우 아래쪽에 배치하는 이유임"
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
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "3. 실제 사례"
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
            "text": "3.1 좋은 디자인의 예시"
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
                    "text": "맥북 하단 네비게이션 바(GNB), 에어비앤비 홈페이지 네비게이션 바",
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
                    "text": "주요 버튼은 화면 하단에 크고 널찍하게 배치하여 엄지손가락으로 쉽게 누를 수 있도록 설계."
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
                    "text": "중앙보다는 가장 자리에 배치해야 쉽고 빠르게 접근 가능."
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
          "src": "/images/fittss-law/03.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
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
            "text": "1. 가장자리는 '무한한 목표 크기'를 제공"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "화면의 가장자리는 커서가 그 영역을 벗어나지 않기 때문에, 사용자가 더 쉽게 목표에 도달할 수 있습니다. 예를 들어:"
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
                    "text": "커서를 가장자리로 움직이면 멈추는 효과가 생겨 사용자는 목표에 빠르게 도달할 수 있습니다."
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
                    "text": "이는 네비게이션이 화면 중앙에 있을 때보다 사용자가 목표를 놓칠 가능성을 줄여줍니다."
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
            "text": "(그러나, 이러한 스크린 엣지의 활용은 마우스 기반의 UI에서는 유효하지만 터치스크린에서는 유효하지 않음)"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/fittss-law/04.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/fittss-law/05.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "실제 연구에서는 터치스크린 장치의 경우,"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "오히려 엣지에 위치한 타겟을 클릭하는 시간이 늘어나는 것을 볼 수 있었습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "오버슈팅이 증가하거나, 사실 스크린 바깥을 클릭할 확률도 높아지기 때문."
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
                    "text": "CTA(Call-to-Action) 버튼",
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
                    "text": "\"구매하기\" 버튼을 눈에 띄게 배치하여 클릭 가능성을 높임."
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
          "src": "/images/fittss-law/06.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
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
                    "text": "아이콘에 라벨을 붙혀서 버튼을 만들어라",
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
                    "text": "아이콘 상표의 그림만으로 버튼을 만드는 것은 충분하지 않음"
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
                    "text": "텍스트 라벨을 붙이는 것은 아이콘의 모호성을 낮추고 이해도를 높이기때문에 이동시간을 개선할 수 있음."
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
          "src": "/images/fittss-law/07.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
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
            "text": "3.2 나쁜 디자인의 예시"
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
                    "text": "작고 복잡한 인터페이스",
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
                    "text": "중요한 버튼이 화면 모퉁이에 작게 배치되면 사용자가 클릭하기 어렵고 시간 소모가 늘어남."
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
                    "text": "과도하게 좁은 클릭 영역",
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
                    "text": "입력 필드가 작아서 정확한 클릭이 어려운 경우."
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
          "src": "/images/fittss-law/08.png",
          "alt": "피츠의 법칙 (Fitts’s Law)",
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
            "text": "4. 요점 정리"
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
                    "text": "모바일과 데스크톱 뷰포트 모두에 피츠의 법칙을 적용하는 데 사용할 수 있는 방법이 있음"
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
                    "text": "어떤 동작을 더 쉽게 선택할 수 있게 하려면 동작을 더 크게 만들고 쉽게 닿을 수 있는 곳에 배치"
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
                    "text": "터치 타겟은 사용자가 정확하게 선택할 수 있을 만큼 충분히 커야 함."
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
                    "text": "터치 대상 사이에는 충분한 간격이 있어야 함."
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
                    "text": "터치 타겟은 인터페이스에서 쉽게 인식할 수 있는 곳에 배치."
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
                    "text": "피츠의 법칙을 이용하면 의도적으로 어떤 것을 더 작게 만들어서 선택하기 어렵게 만들 수도 있습니다."
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
            "text": "이 글 너무 좋음!!!!!!"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Fitts's Law and Its Applications in UX",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/fitts-law/"
                }
              }
            ]
          }
        ]
      }
    ]
  }),
};

import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/16 */
export const gestaltPrinciples: Article = {
  id: "a-gestalt-principles",
  slug: "gestalt-principles",
  title: "게슈탈트 원리 (Gestalt Theory)",
  subtitle: "게슈탈트 이론(Gestalt Theory)은 인간이 개별 요소를 단순히 보는 것이 아니라, 전체적인 패턴이나 구조를 먼저 인식하는 경향이 있다는 심리학적 원리이다. UX/UI 디자인에서는 사용자가 화면의 정보를…",
  authorId: "u-suyeon",
  topics: ["Cognitive Science", "UI"],
  coverImage: "/images/gestalt-principles/01.png",
  status: "published",
  publishedAt: "2025-03-16",
  createdAt: "2025-03-16",
  updatedAt: "2025-03-16",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/16" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/gestalt-principles/01.png",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
            "text": "게슈탈트 원리 (Gestalt Theory) 란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "게슈탈트 이론(Gestalt Theory)은 인간이 개별 요소를 단순히 보는 것이 아니라, "
          },
          {
            "type": "text",
            "text": "전체적인 패턴이나 구조를 먼저 인식하는 경향이 있다는 심리학적 원리",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. UX/UI 디자인에서는 사용자가 화면의 정보를 어떻게 그룹화하고 인식하는지를 이해하는 데 중요한 역할을 한다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/gestalt-principles/02.jpg",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
            "text": "전체는 부분의 합과 다르다"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "게슈탈트라는 단어는 '전체로서의 형태'라는 뜻을 가진 독일어다. 게슈탈트 이론에 따르면, 사람은 전체 이미지를 각 부분들 사이의 상호 관계와 맥락 속에서 지각한다. 부분 혹은 요소의 의미가 고정되어 있지 않고 이들이 속한 전체에 따라 달라진다는 것이다. 즉, 게슈탈트 이론은 패턴 지각에 있어 전체와 부분의 전체성과 통합성을 강조한다."
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
                    "text": "게슈탈트 심리학은 20세기 초 독일에서 막스 베르트하이머(Max Wertheimer), 볼프강 쾰러(Wolfgang Köhler), 쿠르트 코프카(Kurt Koffka) 등에 의해 발전되었다."
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
                    "text": "베르트하이머는 파이 현상(Φ phenomenon) 실험을 통해, 연속적으로 깜빡이는 빛이 개별적인 점이 아니라 움직이는 패턴으로 인식된다는 것을 발견함 → 이는 인간이 단순한 요소보다 전체적인 형태를 우선적으로 인식한다는 것을 보여준다."
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
            "text": "1. 근접성(Proximity) 원칙"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "서로 이웃해 있는 요소들과 그렇지 않은 요소들을 구분하려는 경향",
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
          "src": "/images/gestalt-principles/03.jpg",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
                    "text": "서로 가까운 요소들은 그룹으로 인식됨."
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
                    "text": "예시: 네비게이션 바의 아이콘과 텍스트를 가까이 배치하여 같은 그룹으로 보이게 함."
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
            "text": "2. 유사성(Similarity) 원칙"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "색깔, 모양, 크기가 동일한 요소들을 하나의 관계로 묶으려는 경향",
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
          "src": "/images/gestalt-principles/04.jpg",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
                    "text": "색상, 크기, 형태가 비슷한 요소들은 동일한 그룹으로 인식됨."
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
                    "text": "예시: 같은 스타일의 버튼을 일관되게 사용하여 기능적으로 연관된 요소임을 암시."
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
            "text": "3. 연속성(Continuation) 원칙"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "어떤 선이나 운동 방향을 인지하면 그것을 하나로 인식하는 경향",
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
          "src": "/images/gestalt-principles/05.png",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
                    "text": "사람들은 시각적 흐름을 따라가려는 경향이 있음."
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
                    "text": "예시: 슬라이더 UI에서 화살표를 이용해 자연스럽게 다음 콘텐츠로 이동할 수 있도록 디자인."
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
            "text": "4. 폐쇄성(Closure) 원칙"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "여러 요소들이 단일한 패턴을 보일 경우, 그것을 하나의 개체로 인식하는 경향",
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
          "src": "/images/gestalt-principles/06.png",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
                    "text": "불완전한 형태라도 사용자가 스스로 완전한 형태로 인식함."
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
                    "text": "예시: 로딩 애니메이션에서 점이 회전하며 원을 이루는 형태를 보여주는 디자인."
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
            "text": "5. 공통운명(Common Region) 원칙"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "개별 요소들이 동일한 방향으로 움직이면 그것을 하나로 인식하는 경향",
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
          "src": "/images/gestalt-principles/07.gif",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
                    "text": "같은 배경이나 테두리 안에 있는 요소들은 그룹으로 인식됨."
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
                    "text": "예시: 카드 UI에서 각 콘텐츠를 개별 박스로 감싸 사용자에게 그룹화된 정보임을 전달."
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
            "text": "6. 전경/배경의 원리"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "전면에 드러난 개체와 후면에 깔린 배경에 동시에 주목하는 경향",
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
          "src": "/images/gestalt-principles/08.png",
          "alt": "게슈탈트 원리 (Gestalt Theory)",
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
                    "text": "인간은 대칭적인 디자인을 더 정돈되고 안정적으로 인식함."
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
                    "text": "예시: 배경 대비를 활용해서 강조 UI 디자인을 제공."
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

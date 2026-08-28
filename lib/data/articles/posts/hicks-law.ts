import type { Article } from "@/lib/types";

/** Imported from https://scented-ant-8c9.notion.site/Hick-s-Law-1ba962f1c7f78066be23d24365599d1c */
export const hicksLaw: Article = {
  id: "a-hicks-law",
  slug: "hicks-law",
  title: "힉의 법칙 (Hick’s Law)",
  subtitle: "\"선택지가 많을수록 사용자가 결정을 내리는 데 시간이 더 오래 걸린다.\"",
  authorId: "u-sienna",
  topics: ["Cognitive Science", "UI", "Interaction"],
  coverImage: "/images/hicks-law/01.png",
  status: "published",
  publishedAt: "2025-03-02",
  createdAt: "2025-03-02",
  updatedAt: "2025-03-02",
  references: [
    { label: "원문 보기", source: "Notion", url: "https://scented-ant-8c9.notion.site/Hick-s-Law-1ba962f1c7f78066be23d24365599d1c" },
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
            "text": "힉의 법칙(Hick's Law)란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "\"선택지가 많을수록 사용자가 결정을 내리는 데 시간이 더 오래 걸린다.\"",
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
            "text": "즉, "
          },
          {
            "type": "text",
            "text": "사용자가 선택해야 할 옵션이 많아질수록 인지 부하가 증가하고, 의사결정 시간이 길어진다",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 심리학 및 UX 디자인 원칙입니다."
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
            "text": "🔹 힉의 법칙의 공식"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "🧮 "
          },
          {
            "type": "text",
            "text": "RT=a+blog⁡2(n)RT = a + b \\log_2(n)RT=a+blog2(n)",
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
                    "text": "RT",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " = 반응 시간 (Response Time)"
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
                    "text": "a",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " = 기본 반응 시간 (Fixed Time)"
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
                    "text": "b",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " = 의사결정에 필요한 추가 시간 (Variable Time)"
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
                    "text": "n",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " = 선택할 수 있는 옵션의 개수"
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
            "text": "즉, "
          },
          {
            "type": "text",
            "text": "선택할 옵션이 많아질수록(log 함수에 따라) 반응 시간이 증가",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "합니다."
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
            "text": "🔹 연구 사례"
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
                    "text": "컬럼비아 대학에서 수행한 유명한 연구",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.nytimes.com/2010/02/27/your-money/27shortcuts.html"
                        }
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 에서 한 연구팀이 잼 샘플 부스를 세웠습니다. 몇 시간마다 24가지 잼에서 6가지 잼으로 바뀌었습니다. 잼이 24개 있을 때는 60%의 고객이 샘플을 받기 위해 멈추었고, 이 고객 중 3%가 병을 샀습니다. 잼이 6개 전시되었을 때는 40%만 멈췄습니다. 하지만 흥미로운 점은 이 사람들 중 30%가 잼을 샀다는 것입니다. "
                  },
                  {
                    "type": "text",
                    "text": "많은 선택 사항이 고객을 끌어들여 둘러보게 했지만, 구매로 이어지지는 않았습니다.",
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
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "너무 많은 선택지의 저주(The Curse of Too Many Options)"
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
            "text": "1. 불안(Anxiety):"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "너무 많은 선택지는 일부 사람들에게 정신적인 고통을 유발합니다. 경제학자 "
          },
          {
            "type": "text",
            "text": "허먼 사이먼(Herman Simon)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 의사결정 스타일을 두 가지 유형으로 나누었습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ "
          },
          {
            "type": "text",
            "text": "만족형(Satisficers):",
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
            "text": "이들은 "
          },
          {
            "type": "text",
            "text": "완벽한 결정보다 \"적당히 괜찮은 결정\"을 선호하는 사람들",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "입니다. 옵션을 어느 정도 고려하긴 하지만, 결정 과정에 과도하게 집착하지 않습니다."
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
                    "text": "모든 정보를 철저하게 분석하지 않기 때문에, "
                  },
                  {
                    "type": "text",
                    "text": "자신의 선택에 대해 더 만족하는 경향",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "이 있습니다."
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
                    "text": "이들은 "
                  },
                  {
                    "type": "text",
                    "text": "\"충분히 괜찮다\"고 판단하면 바로 선택하고 넘어가는 스타일",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "입니다."
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
                    "text": "《해피니스 프로젝트(The Happiness Project)》의 저자 "
                  },
                  {
                    "type": "text",
                    "text": "그레첸 루빈(Gretchen Rubin)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "은 만족형 사람들을 이렇게 설명했습니다:"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "type": "blockquote",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "\"만족형 사람들은 자신이 원하는 기준을 충족하는 호텔이나 파스타 소스를 찾으면, 더 이상 고민하지 않고 만족한다.\""
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
            "text": "✅ "
          },
          {
            "type": "text",
            "text": "극대화형(Maximizers):",
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
            "text": "이들은 "
          },
          {
            "type": "text",
            "text": "최선의 결정을 내리고 싶어하는 사람들",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "입니다. 가능한 모든 옵션을 철저히 분석해야만 선택할 수 있습니다."
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
                    "text": "스워스모어 대학(Swarthmore College)의 연구에 따르면, 극대화형 사람들은 "
                  },
                  {
                    "type": "text",
                    "text": "삶의 만족도, 행복감, 낙관주의, 자존감이 만족형 사람들보다 훨씬 낮게 나타났습니다.",
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
                    "text": "또한, 극대화형 사람들은 "
                  },
                  {
                    "type": "text",
                    "text": "후회와 우울감을 더 자주 경험",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "한다고 합니다."
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
            "text": "2. 실망(Disappointment):"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "선택지가 많을수록, "
          },
          {
            "type": "text",
            "text": "자신의 선택에 대해 실망할 가능성도 커집니다.",
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
                    "text": "너무 많은 옵션이 있으면, 선택 후에도 \"더 나은 선택이 있었을지도 모른다\"는 생각에 사로잡혀 만족하기 어려워집니다."
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
            "text": "《선택의 역설(The Paradox of Choice)》의 저자 "
          },
          {
            "type": "text",
            "text": "배리 슈워츠(Barry Schwartz)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 이렇게 설명합니다:"
          }
        ]
      },
      {
        "type": "blockquote",
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "type": "text",
                "text": "\"선택지가 많으면, 우리는 존재하지 않는 가상의 완벽한 옵션을 상상하게 된다."
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
            "text": "이미 존재하는 선택지의 장점만을 결합한 이상적인 대안을 떠올리게 되면서, 결국 우리가 내린 선택에 대한 만족도가 더욱 낮아진다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "다시 말해, "
          },
          {
            "type": "text",
            "text": "선택지가 많아질수록 우리는 오히려 더 불행해진다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "\""
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
            "text": "🔹 힉의 법칙이 중요한 이유"
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
                    "text": "사용자 경험(UX) 개선",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 불필요한 선택지를 줄이면 빠르고 효율적인 의사결정 가능"
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
                    "text": "인지 부하 감소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 사용자가 혼란스럽지 않도록 정보량을 조절"
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
                    "text": "전환율(Conversion Rate) 증가",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 선택이 쉬워지면 더 많은 사용자가 행동을 취함"
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
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "🔹 힉의 법칙 적용 사례"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "📌 "
          },
          {
            "type": "text",
            "text": "애플(Apple)",
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
                    "text": "Apple TV 리모컨은 작업 기억을 많이 필요로 하지 않으므로 인지 부하가 훨씬 적습니다. 복잡성을 TV 인터페이스로 이전함으로써, 정보를 효과적으로 구성하고 메뉴 내에서 점진적으로 공개할 수 있습니다."
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
          "src": "/images/hicks-law/02.png",
          "alt": "힉의 법칙 (Hick’s Law)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "📌 "
          },
          {
            "type": "text",
            "text": "넷플릭스(Netflix)",
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
                    "text": "한 번에 보여주는 콘텐츠를 줄이고, 추천 콘텐츠를 제공하여 선택 시간을 단축"
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
            "text": "📌 "
          },
          {
            "type": "text",
            "text": "아마존(Amazon)",
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
                    "text": "필터를 숨기고, 사용자 맞춤 추천을 제공하여 선택 과정을 단순화"
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
          "src": "/images/hicks-law/03.png",
          "alt": "힉의 법칙 (Hick’s Law)",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/hicks-law/04.png",
          "alt": "힉의 법칙 (Hick’s Law)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "📌 "
          },
          {
            "type": "text",
            "text": "슬랙(Slack)의 점진적 온보딩(Progressive Onboarding)",
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
                    "text": "몇 개의 온보딩 슬라이드를 거친 후 곧바로 모든 기능이 포함된 앱을 제공하는 대신, Slack은 봇을 활용하여 사용자를 자연스럽게 참여시키고, 부담 없이 메시징 기능을 익히도록 유도합니다. 새로운 사용자가 압도되지 않도록, Slack은 메시지 입력란을 제외한 모든 기능을 숨깁니다. 사용자가 Slackbot을 통해 메시지 보내는 방법을 익히면, 이후 추가 기능을 점진적으로 소개합니다."
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
          "src": "/images/hicks-law/05.png",
          "alt": "힉의 법칙 (Hick’s Law)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "📌 "
          },
          {
            "type": "text",
            "text": "구글(Google)",
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
                    "text": "Google은 키워드를 입력하는 데 필요한 결정을 최소화하기 위해 키워드를 입력하는 행위에 방해가 될 수 있는 추가 콘텐츠나 추가적인 의사 결정을 요구할 수 있는 모든 콘텐츠를 제거합니다."
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
            "text": "UX Psychology: Google Search | Laws of UX",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://lawsofux.com/articles/2020/ux-psychology-google-search/"
                }
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/hicks-law/06.png",
          "alt": "힉의 법칙 (Hick’s Law)",
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
            "text": "🚀 결론"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "👉 "
          },
          {
            "type": "text",
            "text": "선택지가 많다고 좋은 것이 아니다!",
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
            "text": "👉 "
          },
          {
            "type": "text",
            "text": "최적의 UX/UI 디자인을 위해 사용자가 빠르게 선택할 수 있도록 도와야 한다.",
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
            "text": "👉 "
          },
          {
            "type": "text",
            "text": "적절한 정보 제공 & 선택지 최소화 = 사용자 경험 향상!",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 😊"
          }
        ]
      }
    ]
  }),
};

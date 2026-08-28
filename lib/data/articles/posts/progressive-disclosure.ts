import type { Article } from "@/lib/types";

/** Imported from https://scented-ant-8c9.notion.site/Progressive-Disclosure-1ba962f1c7f78063931ff582873c5376 */
export const progressiveDisclosure: Article = {
  id: "a-progressive-disclosure",
  slug: "progressive-disclosure",
  title: "단계적 공개 (Progressive Disclosure)",
  subtitle: "단계적 공개란 정보를 한 번에 전부 제공하는 것이 아니라, 사용자 경험(UX)의 이유로 일정한 순서에 따라 점진적으로 공개하는 방식을 의미합니다.",
  authorId: "u-sienna",
  topics: ["Interaction", "UI"],
  coverImage: "/images/progressive-disclosure/01.png",
  status: "published",
  publishedAt: "2025-02-16",
  createdAt: "2025-02-16",
  updatedAt: "2025-02-16",
  references: [
    { label: "원문 보기", source: "Notion", url: "https://scented-ant-8c9.notion.site/Progressive-Disclosure-1ba962f1c7f78063931ff582873c5376" },
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
            "text": "🔹 정의"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "단계적 공개",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "란 정보를 한 번에 전부 제공하는 것이 아니라, 사용자 경험(UX)의 이유로 "
          },
          {
            "type": "text",
            "text": "일정한 순서에 따라 점진적으로 공개하는 방식",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 의미합니다."
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
            "text": "🔹 주요 개념"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자 경험(UX) 측면",
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
                    "text": "사용자가 한 번에 너무 많은 정보를 접하면 인지적 과부하(cognitive overload)가 발생할 수 있기 때문에, 필요한 순간에 맞춰 정보를 제공하는 방식입니다."
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
                    "text": "예) 회원가입 절차에서 모든 입력 필드를 한 번에 노출하는 대신, 단계별로 하나씩 보여주는 방식."
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
            "text": "🔹 관련 실험"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "🔍 "
          },
          {
            "type": "text",
            "text": "Nielsen Norman Group (2006) - Progressive Disclosure 연구",
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
            "text": "📌 연구 개요",
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
            "text": "Nielsen Norman Group(NNGroup)은 UX 및 사용성(Usability) 연구로 유명한 기관으로, "
          },
          {
            "type": "text",
            "text": "2006년 ‘Progressive Disclosure (단계적 공개) 연구’",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "를 통해 사용자의 정보 처리 방식과 인터페이스 디자인에 미치는 영향을 분석."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "🔹 연구 목적",
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
                    "text": "한 번에 모든 정보를 제공하는 방식(All-at-once disclosure)과 단계적 공개 방식(Progressive Disclosure)의 효과 비교"
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
                    "text": "사용자 인지 부하(Cognitive Load) 감소 여부 평가"
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
                    "text": "UI 설계 시 단계적 공개가 유용한 경우 확인"
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
            "text": "🔹 연구 방법",
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
                    "text": "다양한 웹사이트와 소프트웨어 UI를 대상으로 사용자 테스트 진행"
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
                    "text": "2가지 방식 비교:",
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
                    "text": "즉각적인 전체 정보 공개",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자가 한 번에 모든 정보를 확인하는 방식"
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
                    "text": "단계적 공개(Progressive Disclosure)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자의 행동에 따라 점진적으로 필요한 정보만 노출하는 방식"
                  }
                ]
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
                    "text": "참가자의 "
                  },
                  {
                    "type": "text",
                    "text": "작업 수행 속도, 오류율, 만족도",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 등을 측정"
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
            "text": "🔹 연구 결과",
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
                    "text": "단계적 공개가 사용자의 성공률을 높이고, 인지적 부담을 줄임",
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
                    "text": "사용자가 필요하지 않은 정보까지 한 번에 제공하면, 주요 정보 파악이 어려워짐"
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
                    "text": "단계적 공개로 정보를 정리하면, 사용자가 더 쉽게 목표를 달성함"
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
                    "text": "전문가용 기능 제공 시 유용함",
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
                    "text": "초보자에게는 기본 옵션만 제공하고, 전문가 모드에서는 추가 기능을 공개하는 방식이 효과적"
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
                    "text": "사용자의 탐색 의지를 높임",
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
                    "text": "필요할 때만 정보를 제공하면 사용자는 더 적극적으로 정보를 찾고 활용하려는 경향이 있음"
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
            "text": "🔹 사례 예시 (연구에서 분석한 사례)",
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
                    "text": "소프트웨어 설정 화면",
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
                    "text": "모든 설정 옵션을 한 번에 보여주는 방식보다, \"기본 설정\"과 \"고급 설정\"을 구분하는 방식이 사용성 향상"
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
                    "text": "헬프 및 튜토리얼",
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
                    "text": "긴 설명을 한 번에 제공하는 것보다, 단계별로 ‘더 보기(Expand)’ 기능을 제공하면 사용자 만족도가 증가"
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
            "text": "🔹단계적 공개 유형"
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
                    "text": "단계별 안내",
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
            "text": "프로필을 설정할 때, 사용자는 현재 단계만 볼 수 있으며, 진행함에 따라 다음 단계가 순차적으로 나타납니다. 이는 사용자가 한 가지 작업에 집중할 수 있도록 도와주며, 과부하를 방지하는 데 효과적입니다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/progressive-disclosure/02.png",
          "alt": "단계적 공개 (Progressive Disclosure)",
          "title": null
        }
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
                    "text": "확장 가능한 섹션 (Expandable sections)",
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
                    "text": "드롭다운(dropdowns)"
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
                    "text": "더 보기(read more)"
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
                    "text": "아코디언(accordions)과 같은 확장 가능한 섹션"
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
            "text": "→ 사용자가 원하는 정보를 "
          },
          {
            "type": "text",
            "text": "선택적으로 볼 수 있도록 하면서도 인터페이스가 복잡해지는 것을 방지",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "할 수 있습니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 방식은 특히 "
          },
          {
            "type": "text",
            "text": "반응형 웹 디자인(responsive web design",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ")에서 효과적인데, 화면 공간이 제한적이며 깔끔한 레이아웃이 중요한 경우에 유용합니다. 즉, "
          },
          {
            "type": "text",
            "text": "단순함을 유지하면서도 깊이 있는 정보를 제공할 수 있는 방법",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이라고 볼 수 있습니다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/progressive-disclosure/03.png",
          "alt": "단계적 공개 (Progressive Disclosure)",
          "title": null
        }
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
                    "text": "Hover 또는 클릭하여 세부 정보 표시",
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
            "text": "마우스를 올리거나 클릭했을 때 나타나는 "
          },
          {
            "type": "text",
            "text": "툴팁(tooltips)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "과 "
          },
          {
            "type": "text",
            "text": "팝업(pop-ups)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 화면을 복잡하게 만들지 않으면서도 추가적인 컨텍스트를 제공하는 효과적인 방법."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "예를 들어, 반응형 웹사이트의 가격표(pricing table)에는 각 기능 옆에 작은 아이콘이 있을 수 있습니다. 사용자가 해당 아이콘을 클릭하거나 마우스를 올리면 설명이 나타나며, 이를 통해 사용자는 처음부터 너무 많은 텍스트에 압도되지 않고도 필요한 정보를 얻어 더 나은 결정을 내릴 수 있습니다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/progressive-disclosure/04.png",
          "alt": "단계적 공개 (Progressive Disclosure)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "4. Progressive navigation",
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
            "text": "처음에는 "
          },
          {
            "type": "text",
            "text": "최상위 카테고리(top-level categories)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "만 보여주고, 사용자가 탐색을 계속하면 점점 더 "
          },
          {
            "type": "text",
            "text": "하위 카테고리(subcategories)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 또는 추가적인 옵션이 나타나는 방식."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "최고의 반응형 웹사이트 중 일부는 이 방식을 활용하여 "
          },
          {
            "type": "text",
            "text": "직관적인 내비게이션(navigation)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 제공합니다. 이를 통해 사용자는 불필요한 정보에 방해받지 않고도 원하는 내용을 쉽게 찾을 수 있습니다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/progressive-disclosure/05.png",
          "alt": "단계적 공개 (Progressive Disclosure)",
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
            "text": "📌단계적 공개(Progressive Disclosure) 적용할 때 유용한 경우"
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
                    "text": "회원가입 / 결제 과정",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 한 번에 많은 정보를 입력하게 하면 이탈 가능성이 높음"
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
                    "text": "설정 메뉴",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 초급자와 전문가를 구분해 UI 제공"
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
                    "text": "헬프/튜토리얼",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자의 학습 속도에 맞춰 정보 제공"
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
                    "text": "모바일 UI",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 작은 화면에서 한꺼번에 많은 정보를 제공하면 가독성이 떨어짐"
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
            "text": "이처럼 단계적 공개는 "
          },
          {
            "type": "text",
            "text": "사용자 경험(UX) 향상, 이탈률 감소, 전환율 증가",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "에 효과적인 전략으로 활용!"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Progressive Disclosure",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/progressive-disclosure/"
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
            "text": "Progressive disclosure for responsive websites - Justinmind",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.justinmind.com/ux-design/progressive-disclosure"
                }
              }
            ]
          }
        ]
      }
    ]
  }),
};

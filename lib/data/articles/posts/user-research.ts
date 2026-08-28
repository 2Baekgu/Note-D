import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/32 */
export const userResearch: Article = {
  id: "a-user-research",
  slug: "user-research",
  title: "사용자 리서치(User Research) : 사용자를 이해하는 첫걸음",
  subtitle: "UX 디자인에서 사용자(User)는 단순한 대상이 아니라 디자인 과정 전체를 움직이는 중심이다. 그러나 종종 디자인 과정에서 사용자를 대변할 주체가 부재하거나, 잘못된 방식으로 사용자가 해석되곤 한다. 이러한…",
  authorId: "u-suyeon",
  topics: ["UX Research", "UX"],
  coverImage: "/images/user-research/01.png",
  status: "published",
  publishedAt: "2025-09-21",
  createdAt: "2025-09-21",
  updatedAt: "2025-09-21",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/32" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/user-research/01.png",
          "alt": "사용자 리서치(User Research) : 사용자를 이해하는 첫걸음",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "UX 디자인에서 사용자(User)는 단순한 대상이 아니라 디자인 과정 전체를 움직이는 중심이다. 그러나 종종 디자인 과정에서 사용자를 대변할 주체가 부재하거나, 잘못된 방식으로 사용자가 해석되곤 한다. 이러한 문제를 해결하기 위해 반드시 "
          },
          {
            "type": "text",
            "text": "User Research",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "가 필요하다."
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
            "text": "왜 User Research를 해야 하는가?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "디자인 과정은 결국 사용자의 문제를 해결하기 위한 과정이다. 하지만 실제 프로젝트에서는 다음과 같은 흔한 오해가 발생한다."
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
                    "text": "구매자와 사용자를 동일시하는 혼동"
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
                    "text": "통계적 평균값을 ‘전형적인 사용자’라 착각하는 오류"
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
                    "text": "디자이너 개인의 자의적 해석으로 사용자를 상상하는 문제"
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
                    "text": "제품이 잘 팔린다고 해서 곧바로 사용자가 만족한다고 단정하는 오류"
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
            "text": "이런 오해를 바로잡는 것이 User Research의 출발점이다. 디자이너의 권력은 결국 사용자로부터 나오며, 실제로 사용하는 사람들의 주관적 동기·다양한 맥락·잠재적 니즈를 이해하지 못하면 제대로 된 디자인은 불가능하다."
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
            "text": "User Research의 효과"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/user-research/02.png",
          "alt": "사용자 리서치(User Research) : 사용자를 이해하는 첫걸음",
          "title": "nngroup.com"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "닐슨 노먼 그룹(Nielsen Norman Group)은 "
          },
          {
            "type": "text",
            "text": "“Number of Test Users”",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 그래프를 통해 흥미로운 사실을 보여준다. 단 한 명의 사용자와 인터뷰를 하더라도 프로젝트를 바라보는 관점이 바뀌며, 3명 정도만 만나더라도 기존의 추측과 전혀 다른 문제를 발견할 수 있다는 것이다. 즉, 소수의 사용자와의 만남만으로도 강력한 인사이트가 발생한다."
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
            "text": "사용자란 누구인가?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자는 단순히 ‘고객(Customer)’이나 ‘시장 데이터’로 환원될 수 없다."
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
                    "text": "제품이나 서비스를 실제로 사용하는 사람"
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
                    "text": "우리의 예상을 끊임없이 벗어나는 사람"
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
                    "text": "현재 사용하지 않더라도 같은 목표를 위해 다른 솔루션을 선택한 잠재적 사용자"
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
            "text": "여기에 더해 "
          },
          {
            "type": "text",
            "text": "User vs. Customer vs. People",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 관점의 차이도 중요하다."
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
                    "text": "마케터는 구매 순간에 주목한다."
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
                    "text": "개발자는 성능과 내구성에 주목한다."
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
                    "text": "UX 디자이너는 사용목표와 패턴, 즉 20%의 엣지 케이스를 버릴 수 있는 용기에 주목한다."
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
            "text": "각 직군마다 마음속에 떠올리는 ‘사용자상’이 다르기 때문에, 자기 마음속의 추상적 사용자를 기준으로 논의하는 것은 위험하다."
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
            "text": "우리가 상상하는 사용자는 누구인가?"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/user-research/03.png",
          "alt": "사용자 리서치(User Research) : 사용자를 이해하는 첫걸음",
          "title": "https://enricoangelini.com/2011/the-perfect-user/"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "디자이너는 종종 “완벽한 사용자(The Perfect User)”를 가정하곤 한다. 모든 상황에서 뛰어난 기억력과 지각 능력을 가지고, 불편을 알아서 극복하며, 끝없이 제품을 활용할 수 있는 사람. 그러나 현실에는 그런 사용자는 존재하지 않는다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "또한 우리는 때때로 “탄력적인 사용자(The Elastic User)”를 떠올리기도 한다. 상황과 맥락에 따라 마음대로 늘어나거나 줄어드는 가상의 사용자다. 회의실에서 필요할 때마다 성격과 능력을 바꿔버릴 수 있는 편리한 존재. 하지만 이는 실제 사용자가 아니라 단지 디자이너의 상상 속 산물일 뿐이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "👉 결국 사용자는 결코 완벽하지 않고, 또한 우리 마음대로 변형할 수 있는 존재가 아니다. 그렇기 때문에 "
          },
          {
            "type": "text",
            "text": "실제 사람들을 만나고, 그들의 제약과 한계를 관찰하며, 예상을 벗어나는 행동을 이해하는 과정",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이 필요하다. 바로 그것이 User Research의 핵심이다."
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
            "text": "사용자에 대한 기본적인 이해 Usability Slogans"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/user-research/04.png",
          "alt": "사용자 리서치(User Research) : 사용자를 이해하는 첫걸음",
          "title": "https://www.nngroup.com/books/usability-engineering/"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자를 이해하는 기본 원칙은 단순하지만 강력하다. 닐슨은 이를 "
          },
          {
            "type": "text",
            "text": "Usability Slogans",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "라는 짧은 문구로 정리했으며, 이는 오늘날에도 여전히 유효하다."
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
                    "text": "Your best guess is not good enough.",
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
            "text": "추측만으로는 충분하지 않다. 실제 사용자 리서치가 필요하다."
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
                    "text": "The user is always right.",
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
            "text": "사용자의 경험은 언제나 존중해야 한다."
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
                    "text": "The user is not always right.",
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
            "text": "그러나 사용자의 말이 언제나 정답은 아니다. 사용자의 행동을 관찰해야 한다."
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
                    "text": "Users are not designers.",
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
            "text": "사용자는 설계자가 아니며, 제품 설계의 책임은 디자이너에게 있다."
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
                    "text": "Designers are not users.",
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
            "text": "디자이너 역시 사용자가 아니다. 자기 경험에 의존해서는 안 된다."
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
                    "text": "Vice presidents are not users.",
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
            "text": "임원이나 관리자 또한 사용자가 아니다. 권위 있는 의견이 실제 사용성을 보장하지 않는다."
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
                    "text": "Less is more.",
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
            "text": "단순함은 곧 강점이다. 불필요한 복잡성은 제거해야 한다."
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
                    "text": "Details matter.",
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
            "text": "작은 디테일이 전체 경험을 좌우한다."
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
                    "text": "Help doesn’t help.",
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
            "text": "사용자가 도움말을 찾아보아야 하는 상황 자체가 문제다."
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
                    "text": "Usability engineering is process.",
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
            "text": "사용성은 한 번의 테스트가 아니라, 반복적이고 지속적인 과정이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "👉 이 10계명은 “우리는 누구를 위해 디자인하는가?”라는 질문에 대한 끊임없는 경고다. 직관이나 권위, 추측이 아니라 실제 사용자와의 만남, 관찰, 반복적 개선이 UX 디자인의 출발점이다."
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
            "text": "사용자의 종류 : 보편적 구분"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자는 모두 같지 않다. 그들이 서비스와 맺는 관계, 참여 수준에 따라 얻을 수 있는 인사이트도 달라진다."
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
                    "text": "현재 사용자",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 지금 서비스에서 겪는 문제를 직접 보여준다. 이들의 불편과 행동은 개선해야 할 포인트를 드러내는 거울이다."
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
                    "text": "이탈 사용자",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 떠나간 이유를 되돌아볼 수 있는 중요한 집단이다. “왜 더 이상 사용하지 않는가?”라는 질문을 통해 근본적인 문제를 파악할 수 있다."
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
                    "text": "경쟁 서비스 사용자",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 새로운 시각을 열어준다. 그들이 다른 서비스를 선택한 이유를 알게 되면, 우리의 서비스가 놓치고 있는 가치를 발견할 수 있다."
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
                    "text": "잠재 사용자",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 아직 우리 서비스를 사용하지 않지만, 같은 목표를 가지고 있는 사람들이다. 이들은 새로운 기회를 만들어주며, UX 리서치에서는 종종 예상치 못한 대체재를 보여준다."
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
            "text": "👉 결국 참여 유형에 따라 사용자는 문제의 증상, 원인, 대안, 기회라는 서로 다른 측면을 비추게 된다."
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
            "text": "사용자의 종류 : 숙련도에 따른 구분"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자의 경험 수준 역시 디자인에서 핵심적인 기준이다. 단순히 초보자에게만 맞추거나 전문가만 고려하는 것은 위험하다."
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
                    "text": "초보자",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 첫인상과 멘탈모델 형성 과정에서 중요한 단서를 준다. “이 시스템은 직관적인가?”라는 질문은 초보자의 행동을 통해 가장 잘 드러난다. 하지만 모든 것을 초보자 중심으로 설계하면 자칫 ‘기능의 빈곤화’라는 함정에 빠질 수 있다."
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
                    "text": "중급자",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 전체 사용자 중 가장 큰 비중을 차지한다. 기능을 모두 알지는 못하지만, 자주 사용하는 주요 기능에는 익숙하다. UX 디자이너가 특히 주목해야 할 집단으로, 이들의 전략과 사용 패턴은 실질적인 개선 포인트를 알려준다."
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
                    "text": "숙련가",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 시스템을 깊이 이해하고 능숙하게 조합해 활용한다. 효율적 사용에 대한 힌트, 단축 경로, 숨겨진 기능의 가치를 알려주는 존재다. 개발자가 특히 참고할 만하다."
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
                    "text": "전문가",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "는 해당 분야에 정통한 프로페셔널이다. 일반적인 시스템보다 더 고도화된 도구를 사용하기도 하며, 현재 도구의 한계와 근본적인 문제를 드러낸다. 이들을 통해 새로운 설계의 기회를 얻을 수 있다."
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
            "text": "👉 따라서 사용자 연구는 단일 집단에 국한되지 않고, "
          },
          {
            "type": "text",
            "text": "참여 수준과 숙련도의 스펙트럼 전체를 고려해야 한다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 그래야 실제 맥락 속에서 다양한 사용자 경험을 담아낼 수 있다."
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
            "text": "결론 : 진짜 사용자를 만나는 것에서 시작된다"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자는 결코 완벽하지도, 우리의 상상대로 늘어나거나 줄어드는 탄력적인 존재도 아니다. 그들은 각기 다른 맥락과 동기, 경험 수준을 가지고 있으며, 때로는 우리의 예상을 완전히 벗어난 행동을 보인다. 그렇기에 UX 디자이너는 추측이나 권위에 의존하지 않고, "
          },
          {
            "type": "text",
            "text": "실제 사용자를 만나고 이해하며, 그들의 경험을 디자인 과정에 반영해야 한다.",
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
            "text": "결국 좋은 디자인은 화려한 아이디어에서 출발하는 것이 아니라, 실제 사용자의 목소리를 반영하고 그것을 끊임없이 검증하는 과정에서 완성된다."
          }
        ]
      }
    ]
  }),
};

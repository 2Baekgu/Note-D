import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/26 */
export const fundamentalAttributionError: Article = {
  id: "a-fundamental-attribution-error",
  slug: "fundamental-attribution-error",
  title: "기본 귀인 오류 (Fundamental Attribution Error) : 왜 사용자를 탓하면 안 되는가",
  subtitle: "기본 귀인 오류는 타인의 행동 원인을 그 사람의 성격이나 의도 때문이라고 판단하고, 실제로는 상황적 요인을 과소평가하는 인지적 편향을 의미한다.",
  authorId: "u-suyeon",
  topics: ["Psychology", "UX Research"],
  coverImage: "/images/fundamental-attribution-error/01.png",
  status: "published",
  publishedAt: "2025-06-22",
  createdAt: "2025-06-22",
  updatedAt: "2025-06-22",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/26" },
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
            "text": "🔍 기본 귀인 오류 (Fundamental Attribution Error) 란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "기본 귀인 오류는 "
          },
          {
            "type": "text",
            "text": "타인의 행동 원인을 그 사람의 성격이나 의도 때문이라고 판단하고, 실제로는 상황적 요인을 과소평가하는 인지적 편향",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 의미한다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "예를 들어, 어떤 사용자가 버튼을 누르지 못했을 때 “왜 저걸 못 눌렀지? 눈치가 없네”라고 해석하는 경향이 여기에 해당한다. 하지만 실제로는 버튼의 위치나 UI 구성의 문제일 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "자신이 같은 실수를 할 경우에는 “내가 오늘 피곤해서 그랬다”라고 상황 탓을 하는 반면, 타인에게는 성격적 귀인을 하는 경향이 있다는 점에서 "
          },
          {
            "type": "text",
            "text": "행위자-관찰자 편향 (Actor-Observer Bias)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "과도 밀접하게 연결된다."
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
                "text": "* 행위자-관찰자 편향(Actor-Observer Bias): 자신의 행동은 상황 때문이라고 해석하면서, 타인의 행동은 그 사람의 성격이나 성향 때문이라고 해석하는 인지 편향."
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
            "text": "즉, UX 디자이너가 사용자 행동을 해석할 때 이 오류에 빠지면, 사용자 경험의 본질적인 문제를 놓치고 사용자를 탓하는 설계를 만들 위험이 있다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 이러한 인지 편향을 경계하는 태도가 사용자 중심 설계의 시작점이 된다."
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
            "text": "🧪 기본 귀인 오류 이론이 탄생한 실험 및 관련 연구"
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
            "text": "1. Jones & Harris 실험 (1967)"
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
                    "text": "참가자들에게 피델 카스트로에 대해 "
                  },
                  {
                    "type": "text",
                    "text": "찬성",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 또는 "
                  },
                  {
                    "type": "text",
                    "text": "반대",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 입장의 글을 읽게 했다."
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
                    "text": "일부 참가자에게는 글쓴이가 자발적으로 쓴 것이 아니라, "
                  },
                  {
                    "type": "text",
                    "text": "과제로 강제로 작성한 것",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "임을 알렸다."
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
                    "text": "그럼에도 다수의 참가자들은 "
                  },
                  {
                    "type": "text",
                    "text": "찬성 글을 썼으니 그 사람은 친카스트로일 것이다",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "라고 판단했다."
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
                    "text": "즉, "
                  },
                  {
                    "type": "text",
                    "text": "강제적인 상황 요인을 알고 있음에도 불구하고 성향 귀인을 했다.",
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
                    "text": "이는 인간이 상황보다 개인의 특성에 과도하게 귀인하는 경향이 있음을 보여준다."
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
            "text": "2. Lee Ross (1977)"
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
                    "text": "이 현상을 체계적으로 정리하며 “Fundamental Attribution Error”라는 용어를 처음 사용했다."
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
                    "text": "이후 사회심리학의 주요 귀인이론으로 자리 잡았다."
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
            "text": "🎯 서비스 적용 사례 – 기본 귀인 오류"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/fundamental-attribution-error/02.png",
          "alt": "기본 귀인 오류 (Fundamental Attribution Error) : 왜 사용자를 탓하면 안 되는가",
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
            "text": "1. 구글(Google) – “사용자 과실” 대신 중립적 시스템 피드백 설계"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "구글의 Gmail이나 Docs 등에서는 사용자가 어떤 기능을 잘못 사용해도 "
          },
          {
            "type": "text",
            "text": "직접적으로 잘못을 지적하지 않는다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 예:"
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
                    "text": "“파일을 찾을 수 없습니다”"
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
                    "text": "“요청한 작업을 완료할 수 없습니다. 다시 시도해 주세요.”"
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
                    "text": "→ 절대로 “당신이 잘못 입력했습니다”라는 식으로 사용자에게 실수를 귀인하지 않는다."
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
                    "text": "이는 사용자의 "
                  },
                  {
                    "type": "text",
                    "text": "행위 자체를 판단하지 않고",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ", 상황(예: 서버 문제, 링크 오류 등)에 귀인함으로써 심리적 방어를 줄이는 설계다."
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
        "type": "image",
        "attrs": {
          "src": "/images/fundamental-attribution-error/03.jpg",
          "alt": "기본 귀인 오류 (Fundamental Attribution Error) : 왜 사용자를 탓하면 안 되는가",
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
            "text": "2. 아마존(Amazon) – 반품/교환 프로세스에서 사용자 실수 탓을 하지 않음"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "아마존은 사용자가 실수로 물건을 잘못 주문하거나, 단순 변심으로 반품하더라도"
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
                    "text": "“고객님의 사유를 선택해주세요”라고 하며 다양한 상황 요인을 제시한다."
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
                    "text": "“사용자 과실”이라는 문구를 피하며 "
                  },
                  {
                    "type": "text",
                    "text": "반품의 진입장벽을 최소화",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "한다."
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
                    "text": "이는 사용자의 잘못이 아닌 “다양한 상황이 있을 수 있다”는 전제를 깔고 있어, "
                  },
                  {
                    "type": "text",
                    "text": "기본 귀인 오류를 피하는 고객 경험 설계",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "라고 볼 수 있다."
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
        "type": "image",
        "attrs": {
          "src": "/images/fundamental-attribution-error/04.png",
          "alt": "기본 귀인 오류 (Fundamental Attribution Error) : 왜 사용자를 탓하면 안 되는가",
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
            "text": "3. 국내 은행 앱들 (일부) – 에러 메시지에서 사용자 탓 표현"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "예시:"
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
                    "text": "“입력하신 계좌번호가 잘못되었습니다”"
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
                    "text": "“비밀번호를 틀리셨습니다”"
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
            "text": "→ 이러한 표현은 사용자의 "
          },
          {
            "type": "text",
            "text": "실수나 능력 부족",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "으로 문제를 귀인하는 방식이다."
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
                    "text": "이런 경우, 사용자는 자존심이 상하거나 불쾌함을 느낄 수 있으며, "
                  },
                  {
                    "type": "text",
                    "text": "서비스에 대한 신뢰도와 만족도",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "가 낮아질 수 있다."
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
            "text": "✅ 개선 예시:"
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
                    "text": "“입력하신 정보가 시스템과 일치하지 않습니다”"
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
                    "text": "“계좌번호를 확인할 수 없습니다. 다시 시도해 주세요”"
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
            "text": "→ 상황적 표현을 사용하여 심리적 저항을 줄일 수 있다."
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
            "text": "📝 요약 및 결론"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "기본 귀인 오류를 피하려는 서비스들은 공통적으로 아래와 같은 전략을 사용한다:"
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
                    "text": "중립적 에러 메시지",
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
                    "text": "상황적 요인 강조",
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
                    "text": "사용자의 실수 가능성에 공감하는 인터랙션 설계",
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
                    "text": "사용자 행동을 해석할 때 ‘왜 그랬는가’를 시스템 관점에서 분석",
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
            "text": "이렇게 서비스가 기본 귀인 오류를 피하고 상황 중심의 설계를 지향하는 이유는, "
          },
          {
            "type": "text",
            "text": "사용자를 탓하지 않는 설계가 더 나은 경험과 신뢰를 만든다는 것을 잘 알고 있기 때문이다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 사용자의 실수를 그들의 성격이나 능력 부족 때문으로 판단하면 "
          },
          {
            "type": "text",
            "text": "심리적 저항, 서비스 이탈, 부정적 인식",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "으로 이어질 수 있다. 반대로 "
          },
          {
            "type": "text",
            "text": "문제의 원인을 시스템이나 상황에서 찾고 이를 보완하려는 태도는, 사용자 중심 UX의 핵심이며 브랜드 충성도를 높이는 기반이 된다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      }
    ]
  }),
};

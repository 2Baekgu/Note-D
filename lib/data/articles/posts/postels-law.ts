import type { Article } from "@/lib/types";

/** Imported from https://blog.naver.com/designer_sienna/224016290972 */
export const postelsLaw: Article = {
  id: "a-postels-law",
  slug: "postels-law",
  title: "보내는 건 보수적으로, 받는 건 관대하게 : 포스텔의 법칙",
  subtitle: "그래서 시스템은 다양한 입력을 유연하게 받아주고, 대신 출력이나 피드백은 일관되고 명확해야 함.",
  authorId: "u-sienna",
  topics: ["Interaction","UI"],
  coverImage: "/images/postels-law/01.png",
  status: "published",
  publishedAt: "2025-09-21",
  createdAt: "2025-09-21",
  updatedAt: "2025-09-21",
  references: [
    { label: "원문 보기", source: "Naver Blog", url: "https://blog.naver.com/designer_sienna/224016290972" },
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
            "text": "1. 포스텔 법칙이란?"
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
                    "text": "1981년, 인터넷의 아버지라 불리는 "
                  },
                  {
                    "type": "text",
                    "text": "존 포스텔(Jon Postel)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "이 TCP 프로토콜 설계 원칙으로 제안."
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
                    "text": "원래는 네트워크 통신 안정성을 위한 법칙이지만, 현재는 "
                  },
                  {
                    "type": "text",
                    "text": "디자인과 사용자 경험 전반",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "에 적용되는 중요한 개념으로 확장되었습니다."
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
                "text": "“Be conservative in what you send, be liberal in what you accept.”"
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
                "text": "(보내는 것은 엄격히, 받는 것은 관대하게)"
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
            "text": "2. UX에서의 포스텔 법칙"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자는 항상 완벽하게 입력하지 않음. 즉, 실수할 수 있음."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그래서 "
          },
          {
            "type": "text",
            "text": "시스템은 다양한 입력을 유연하게 받아주고, 대신 출력이나 피드백은 일관되고 명확",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "해야 함."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "👉 입력은 관대하게, 출력은 보수적으로.",
            "marks": [
              {
                "type": "bold"
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
            "text": "3. 적용 사례"
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
            "text": "1. Naver Search"
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
                    "text": "네이버에서 “"
                  },
                  {
                    "type": "text",
                    "text": "올리브영",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "”을 한글로 변환하지 않고 영어 자판 그대로 “"
                  },
                  {
                    "type": "text",
                    "text": "dhfflqmdud",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "”를 입력했을 때, 네이버는 단순히 오류로 처리하지 않고 → “"
                  },
                  {
                    "type": "text",
                    "text": "올리브영으로 검색한 결과입니다",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "”라는 제안을 제공."
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
                    "text": "즉, 사용자의 실수를 관대하게 받아들이고, 올바른 검색 결과로 안내하는 모습."
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
          "src": "/images/postels-law/01.png",
          "alt": "보내는 건 보수적으로, 받는 건 관대하게 : 포스텔의 법칙",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "2.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "Google Maps",
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
                    "text": "구글맵에 “"
                  },
                  {
                    "type": "text",
                    "text": "스터벅스 강남",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "”이나 “"
                  },
                  {
                    "type": "text",
                    "text": "Sturbucks Gangnam",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "”처럼 잘못 입력해도 올바른 결과 제공."
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
          "src": "/images/postels-law/02.png",
          "alt": "보내는 건 보수적으로, 받는 건 관대하게 : 포스텔의 법칙",
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
            "text": "3. 아마존 개인정보 수집 정책"
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
                    "text": "아마존은 개인정보 수집 정책에서 볼 수 있듯, "
                  },
                  {
                    "type": "text",
                    "text": "서비스 제공에 꼭 필요한 최소한의 정보만 수집·활용한다는 철학",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "을 지키고 있음. 이는 결제 과정에서도 동일하게 적용."
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
                    "text": "은행과의 거래 시 불필요한 정보를 배제하고, "
                  },
                  {
                    "type": "text",
                    "text": "결제를 처리하는 데 필요한 핵심 데이터만 전송",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "하여 보안성과 신뢰성을 동시에 강화합니다."
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
          "src": "/images/postels-law/03.png",
          "alt": "보내는 건 보수적으로, 받는 건 관대하게 : 포스텔의 법칙",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "4. 마이크로소프트 엑셀",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "(Microsoft Excel)",
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
                    "text": "엑셀은 숫자, 텍스트, 날짜 등 다양한 입력을 허용하고, 몇 글자만 입력해도 형식을 예측해서 자동으로 포맷을 맞춰줌.셀 내용에 맞는 메뉴만 보여주고 인터페이스는 깔끔하게 유지함."
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
            "text": "Excel’s auto fill"
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
            "text": "5. URL 처리 (웹 브라우저)"
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
                    "text": "www 빼먹거나 / 슬래시 잘못 넣어도 자동으로 올바른 주소로 연결해줌."
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
            "text": "6. 입력 폼(Form Design)"
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
                    "text": "생년월일: 1990-09-21, 21/09/1990, Sept 21, 1990 다 허용."
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
                    "text": "전화번호: 01012345678, 010-1234-5678, 010 1234 5678 다 정상 처리."
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
            "text": "위는 포스텔의 법칙을 이해하는데 좋은 예시이지만, 요즘은 아예 형식을 UI로 제공하는 경우 많음."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "숫자만 쓰면 / 자동으로 들어가거나, 달력에서 날짜 고르게 함."
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
            "text": "애초에 틀릴 수 없는 구조로 설계하는 게 더 좋은 UX일 뿐아니라 개발·운영 측면에서도 안정적.",
            "marks": [
              {
                "type": "bold"
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
            "text": "7. 비밀번호 입력"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "너무 엄격하게 특수문자, 대문자 강제하면 불편함."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "→ 대신 "
          },
          {
            "type": "text",
            "text": "강도 표시 바(Strength meter)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "로 "
          },
          {
            "type": "text",
            "text": "실시간 피드백",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 주고, 긴 문장(passphrase)도 허용하는 게 UX적으로 좋음."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/postels-law/04.png",
          "alt": "보내는 건 보수적으로, 받는 건 관대하게 : 포스텔의 법칙",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/postels-law/05.png",
          "alt": "보내는 건 보수적으로, 받는 건 관대하게 : 포스텔의 법칙",
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
            "text": "4. 장단점"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ 장점:"
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
                    "text": "사용자 이탈 감소"
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
                    "text": "유연하고 친절한 경험 제공"
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
                    "text": "서비스 신뢰도 향상"
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
            "text": "❌ 단점:"
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
                    "text": "과도한 허용은 "
                  },
                  {
                    "type": "text",
                    "text": "보안 취약점",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "을 만들 수 있음"
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
                    "text": "표준이 느슨해지면 데이터 불일치 발생 가능"
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
            "text": "✨ 정리 ✨",
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
            "text": "포스텔의 법칙은 단순히 네트워크 설계 원칙이 아니라, UX에서도 중요한 철학으로 자리 잡고 있음.",
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
            "text": "“규칙은 명확하게, 사용자의 실수는 관대하게” 받아들이는 설계가 결국 좋은 사용자 경험을 만듦.",
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
            "text": "Reference",
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
            "text": "**https://designbase.co.kr/dictionary/postels-law/**",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://designbase.co.kr/dictionary/postels-law/"
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
            "text": "포스텔의 법칙(Postel’s Law) | 디자인베이스",
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
            "text": "포스텔의 법칙은 \"받을 때는 관대하게, 보낼 때는 엄격하게\"라는 원칙을 기반으로 한 사용자 경험(UX) 설계 원칙 중 하나입니다. 이는 사용자 입력을 최대한 수용하면서도, 시스템이 제공하는 출력(정보, 피드백 등)은 일관되고 명확해야 한다는 의미를 가집니다. 이 법칙은 특히 UX/UI 디자인에서 오류 허용성, 자동 완성, 데이터 검증(벨리데이션) 등 사용자 친화적인 인터페이스를 설계하는 데 중요한 역할을 합니다. 포스텔의 법칙은 네트워크"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "designbase.co.kr"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "**https://medium.com/kubo/postels-law-designing-for-robustness-1503ff1f72dd**",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://medium.com/kubo/postels-law-designing-for-robustness-1503ff1f72dd"
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
            "text": "Postel’s Law: Designing for Robustness",
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
            "text": "Your user inputs will never be perfect"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "medium.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "**https://www.perpetualny.com/blog/ux-design-principle-005-postels-law**",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.perpetualny.com/blog/ux-design-principle-005-postels-law"
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
            "text": "UX Design Principle #005: Postel's Law | Perpetual Blog",
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
            "text": "In the field of User Experience Design, certain principles from psychology can greatly impact the overall user experience. The next principle in our series is Postel's Law (also known as the Robustness Principle)."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.perpetualny.com"
          }
        ]
      }
    ]
  }),
};

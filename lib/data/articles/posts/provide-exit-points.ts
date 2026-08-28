import type { Article } from "@/lib/types";

/** Imported from https://scented-ant-8c9.notion.site/Provide-Exit-Points-1ba962f1c7f7805fa0ccd9f09c794ab8 */
export const provideExitPoints: Article = {
  id: "a-provide-exit-points",
  slug: "provide-exit-points",
  title: "종료 지점 (Provide Exit Points)",
  subtitle: "종료지점(Termination Point, Completion Point) : 사용자가 특정 프로세스를 완료하는 순간을 의미하는 개념입니다. 이는 사용자가 목표를 달성한 후 자연스럽게 흐름을 종료할 수 있도록…",
  authorId: "u-sienna",
  topics: ["Interaction", "UX"],
  coverImage: "/images/provide-exit-points/01.png",
  status: "published",
  publishedAt: "2025-02-09",
  createdAt: "2025-02-09",
  updatedAt: "2025-02-09",
  references: [
    { label: "원문 보기", source: "Notion", url: "https://scented-ant-8c9.notion.site/Provide-Exit-Points-1ba962f1c7f7805fa0ccd9f09c794ab8" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/provide-exit-points/01.png",
          "alt": "종료 지점 (Provide Exit Points)",
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
            "text": "정의"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "종료지점(Termination Point, Completion Point)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " : 사용자가 "
          },
          {
            "type": "text",
            "text": "특정 프로세스를 완료하는 순간을 의미",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하는 개념입니다. 이는 사용자가 목표를 달성한 후 자연스럽게 흐름을 종료할 수 있도록 설계하는 UX 원칙 중 하나입니다."
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
            "text": "중요성"
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
                    "text": "사용자 피로도 감소",
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
                    "text": "사용자가 목표를 달성한 후에도 명확한 종료 시점이 없으면 불필요한 행동을 계속하게 되고 피로감이 증가할 수 있습니다."
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
                    "text": "인지 부하 최소화",
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
                    "text": "명확한 종료점을 제공하면 사용자가 \"이제 끝났다\"고 인식할 수 있어 다음 행동을 쉽게 결정할 수 있습니다."
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
                    "text": "사용자 경험 개선",
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
                    "text": "종료 후 피드백(ex. \"완료되었습니다!\", \"구매가 완료되었습니다!\")을 제공하면 사용자가 만족감을 느끼고 UX가 개선됩니다."
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
            "text": "종류"
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
                    "text": "뒤로가기 버튼",
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
                    "text": "사용자가 이전 페이지나 화면으로 돌아갈 수 있도록 합니다."
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
                    "text": "닫기 버튼",
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
                    "text": "현재 작업이나 경험을 닫습니다."
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
                    "text": "홈 버튼",
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
                    "text": "사용자를 메인 페이지 또는 화면으로 되돌립니다."
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
                    "text": "취소 버튼",
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
                    "text": "사용자가 현재 작업이나 동작을 취소할 수 있습니다."
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
                    "text": "메뉴 버튼",
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
                    "text": "사용자가 다른 페이지나 경험으로 이동할 수 있는 옵션이 있는 메뉴를 엽니다."
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
                    "text": "로그아웃 버튼",
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
                    "text": "사용자가 계정이나 서비스에서 로그아웃할 수 있습니다."
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
            "text": "사례"
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
                    "text": "E-commerce ",
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
                    "text": "결제 완료 후 \"주문이 완료되었습니다\" 페이지"
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
                    "text": "구매 후 \"관련 제품 추천\" 또는 \"리뷰 작성 유도\""
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
                    "text": "앱 및 웹사이트 내 프로세스",
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
                    "text": "회원가입 완료 후 대시보드로 이동"
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
                    "text": "설문조사 완료 후 \"감사합니다\" 페이지"
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
                    "text": "서비스 해지 페이지에서 사용자 유지 전략(예: 할인 제공)"
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
                    "text": "게임 UX",
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
                    "text": "\"게임 종료\" 버튼 또는 \"레벨 완료\" 페이지"
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
                    "text": "저장 후 종료하는 명확한 프로세스 제공"
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
                    "text": "병원 UX",
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
                    "text": "환자가 진료 예약 후 확인 페이지"
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
                    "text": "퇴원 절차 완료 후 피드백 요청"
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
                "text": "Exit Points는 단순한 '종료'가 아니라 사용자 경험을 정리하고, "
              },
              {
                "type": "text",
                "text": "다음 행동을 안내하는 UX 설계 포인트",
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
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "핵심"
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
                    "text": "종료를 명확하게 알릴 것",
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
                    "text": "필요한 후속 정보를 제공할 것 (ex. 다운로드 버튼, 피드백 메시지 등)",
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
                    "text": "사용자가 다음 행동을 쉽게 결정할 수 있도록 안내할 것",
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
            "text": "출처)"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://medium.com/design-bootcamp/goodbye-frustration-hello-freedom-the-benefits-of-exit-points-87fd8ffca060",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://medium.com/design-bootcamp/goodbye-frustration-hello-freedom-the-benefits-of-exit-points-87fd8ffca060"
                }
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
            "text": "Exit Points vs Exit-Intent"
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
            "text": "정의"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Exit-Intent",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 사용자가 웹사이트에서 떠나려는 행동을 감지하고, 이를 방지하기 위한 UX 전략입니다. 주로 마우스 움직임, 스크롤 패턴, 브라우저 탭 이동 등을 감지하여 동작합니다."
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
            "text": "중요성"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Exit intent popups",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " can provide a good customer experience and offer benefits to users who are about to leave a website."
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
            "text": "사례"
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
                    "text": "팝업 (Exit-Intent Popups)",
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
                    "text": "사용자가 브라우저 창을 닫으려 할 때 \"할인 코드 제공\""
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
                    "text": "구매 페이지에서 이탈하려 할 때 \"무료 배송\" 제안"
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
                    "text": "블로그에서 이탈하려 할 때 \"뉴스레터 구독 유도\""
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
                    "text": "CTA 변경 (Call to Action)",
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
                    "text": "이탈하려는 행동을 감지하면 기존 버튼 대신 \"지금 구매하면 추가 할인 제공\""
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
                    "text": "설문조사 유도",
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
                    "text": "\"사이트를 떠나시기 전에 간단한 피드백을 부탁드립니다\""
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
                    "text": "서비스 유지 전략",
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
                    "text": "구독 취소 페이지에서 \"1개월 무료 연장\" 제안"
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
            "text": "핵심"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "팝업은 오랫동안 사용자들에게 "
          },
          {
            "type": "text",
            "text": "귀찮은 요소",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "로 여겨져 왔습니다. 이는 종종 사용자가 중요한 작업을 수행하는 중간에 방해하거나, 페이지의 콘텐츠를 가리고 "
          },
          {
            "type": "text",
            "text": "광고성 메시지",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "를 강제적으로 노출시키기 때문입니다. 실제로 잘못된 팝업 사용 사례는 많이 존재합니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "하지만 "
          },
          {
            "type": "text",
            "text": "Exit-Intent 팝업(이탈 의도 감지 팝업)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 다릅니다."
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
                    "text": "이 팝업은 "
                  },
                  {
                    "type": "text",
                    "text": "사용자가 사이트를 떠나려는 순간에만 나타나기 때문에",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ", 마치 "
                  },
                  {
                    "type": "text",
                    "text": "마지막 인사말",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "처럼 작동합니다."
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
                    "text": "그 결과, 기존의 팝업보다 덜 방해가 되며,"
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
                    "text": "올바르게 설계될 경우, 중요한 메시지를 전달하거나 사용자에게 유용한 정보를 제공하는 효과적인 수단이 될 수 있습니다."
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
            "text": "또한, "
          },
          {
            "type": "text",
            "text": "리스크가 낮다는 장점",
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
                    "text": "만약 팝업의 내용이 사용자에게 관련이 없다면, 사용자는 그냥 사이트를 떠나면 되므로 큰 불편함 없이 계속 진행할 수 있습니다."
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
            "text": "비교"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "출처) "
          },
          {
            "type": "text",
            "text": "https://www.nngroup.com/articles/exit-intent-good-ux/",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/exit-intent-good-ux/"
                }
              }
            ]
          }
        ]
      }
    ]
  }),
};

import type { Article } from "@/lib/types";

/** Imported from https://blog.naver.com/designer_sienna/224176099874 */
export const recognitionOverRecall: Article = {
  id: "a-recognition-over-recall",
  slug: "recognition-over-recall",
  title: "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
  subtitle: "Jakob Nielsen의 10가지 사용성 휴리스틱 중 6번째 원칙으로, “사용자의 기억 부하를 최소화하라. 객체, 행동, 옵션을 보이게 만들어야 하며, 사용자가 대화의 한 부분에서 다른 부분으로 정보를 기억할 필요",
  authorId: "u-sienna",
  topics: ["Cognitive Science","UI"],
  coverImage: "/images/recognition-over-recall/01.png",
  status: "published",
  publishedAt: "2026-02-08",
  createdAt: "2026-02-08",
  updatedAt: "2026-02-08",
  references: [
    { label: "원문 보기", source: "Naver Blog", url: "https://blog.naver.com/designer_sienna/224176099874" },
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
            "text": "1. 정의"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Jakob Nielsen의 10가지 사용성 휴리스틱 중 6번째 원칙으로, "
          },
          {
            "type": "text",
            "text": "“사용자의 기억 부하를 최소화하라. 객체, 행동, 옵션을 보이게 만들어야 하며, 사용자가 대화의 한 부분에서 다른 부분으로 정보를 기억할 필요가 없게 하라.”",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 라는 지침이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "인간의 단기 기억(working memory)은 제한적이기 때문에, 정보를 "
          },
          {
            "type": "text",
            "text": "기억(recall)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 하게 하는 것보다 화면에 직접 보여서 "
          },
          {
            "type": "text",
            "text": "인식(recognition)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 하게 하는 것이 훨씬 쉽고 빠르다. 심리학적으로도 "
          },
          {
            "type": "text",
            "text": "recognition",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 맥락 단서(cues)가 많아 활성화가 쉽게 일어나지만, "
          },
          {
            "type": "text",
            "text": "recall",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 단서가 적어 더 많은 인지적 노력이 필요하다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 원칙의 핵심은"
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
                    "text": "사용자가 “이게 뭐였더라?” 하고 떠올릴 필요 없이",
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
                    "text": "보는 순간 바로 이해하고 행동할 수 있게 하는 것",
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
            "text": "2. 관련 실험 및 연구 배경"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 원칙은 인지심리학에서 오랜 연구를 바탕으로 한다."
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
                    "text": "Barbara Tversky (1973)의 연구: recognition은 항목 내 세부사항을 통합적으로 인코딩할 때 강화되지만, recall은 목록 간 관계를 인코딩할 때 더 강해진다. → recognition이 일반적으로 더 쉽다는 증거."
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
                    "text": "NNGroup (Nielsen Norman Group)의 다수 연구: recognition이 recall보다 오류가 적고, 작업 속도가 빠르다는 결과가 반복적으로 확인됨. 예를 들어, 메뉴에서 명령어를 선택하는 것(recognition)이 명령어를 직접 입력하는 것(recall)보다 훨씬 효율적."
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
                    "text": "실제 heuristic evaluation 연구 (예: 치과 소프트웨어 평가)에서도 “인식보다는 기억” 위반 시 사용자가 혼란을 느끼고 작업 시간이 증가한다는 사례가 보고됨."
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
            "text": "현대 UX 연구에서도 이 원칙은 변함없이 유효하며, "
          },
          {
            "type": "text",
            "text": "검색 자동완성이나 최근 항목 표시",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 같은 기능이 이를 잘 뒷받침한다."
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
            "text": "3. 웹과 앱에서의 적용 예시"
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
                    "text": "검색 서비스 (Google, 네이버 등)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 검색창에 입력할 때 최근 검색어와 자동완성 제안이 바로 나타난다. → 매번 키워드를 처음부터 떠올리지 않아도 된다. 최근 검색 목록을 스크롤하며 인식만 하면 클릭 한 번으로 재검색 완료."
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
          "src": "/images/recognition-over-recall/01.png",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
                    "text": "은행 & 송금 앱 (토스, 카카오페이, 카카오뱅크)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 송금 시 “최근 송금한 사람” 목록을 금액 입력 직후 보여준다. → 계좌번호나 이름을 기억할 필요 없이, 사진/이름/최근 금액을 보고 탭만 하면 송금 완료."
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
          "src": "/images/recognition-over-recall/02.png",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
                    "text": "스트리밍 서비스 (Netflix, YouTube, Spotify)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 홈 화면에 “Continue Watching” 또는 “Recently Played” 섹션이 가장 먼저 나온다. → 시청/청취 중단한 콘텐츠의 썸네일 + 제목 + 에피소드 번호/진행률을 보여줘, “아 이거 봤었지” 하고 바로 클릭 가능."
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
          "src": "/images/recognition-over-recall/03.png",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
                    "text": "이메일 앱 (Gmail, Outlook)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 받은편지함에 읽지 않은 메일은 굵은 글씨 + 발신자 이름 + 제목 미리보기 + 아바타 아이콘이 표시된다. → “이 메일 읽어야 했는데”를 기억하지 않아도, 발신자와 제목 스니펫을 보고 바로 인식."
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
          "src": "/images/recognition-over-recall/04.png",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
                    "text": "쇼핑몰 (Amazon)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " “Recently Viewed Items”와 “Recommended for You” 섹션이 메인이나 상품 페이지 하단에 노출된다. → 며칠 전 본 상품을 기억하지 않아도 썸네일 + 가격 + 이름으로 바로 인식하고 재방문/구매 유도."
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
          "src": "/images/recognition-over-recall/05.jpg",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
                    "text": "문서/생산성 앱 (Google Docs, Microsoft Word, Notion)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 홈 화면에 “최근 파일” 목록을 썸네일 + 제목 + 마지막 수정 시간 + 미리보기 이미지로 보여준다. → 파일 이름을 정확히 기억하지 않아도 첫 페이지 미리보기로 “이 파일이구나” 하고 바로 선택."
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
          "src": "/images/recognition-over-recall/06.png",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
                    "text": "음악/팟캐스트 앱 (Apple Music, Spotify)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " “Home” 탭에 “Recently Played”나 “Your Library” 섹션이 앨범 아트로 크게 노출. → 앨범 커버를 보는 순간 바로 인식해 재생 가능."
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
          "src": "/images/recognition-over-recall/07.png",
          "alt": "보는 순간 알아볼 수 있게 설계하라 : Recognition over Recall",
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
            "text": "‘기억보다는 인식’은 단순한 편의 기능이 아니라, "
          },
          {
            "type": "text",
            "text": "인지 부하를 줄여 작업 효율과 만족도를 높이는 핵심 설계 원칙",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. 사용자가 기억에 의존할수록 → 작업 단계 증가 → 입력 오류 ↑ → 스트레스 ↑ 반대로 인식 중심으로 설계하면 → 판단 속도 빨라짐 → 자연스러운 흐름 → 재방문율 ↑"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "현대 앱/웹은 대부분 이 원칙을 기본으로 삼고 있다. 최근 목록, 자동완성, 시각적 단서(썸네일, 아이콘, 미리보기), 구체적 상태 표시 등이 바로 그 증거다. UX를 개선할 때마다 꼭 체크해보자: “사용자가 이걸 기억해야 하나? 아니면 그냥 보면 알게 할 수 있나?”"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 한 줄이 서비스의 사용 편의성을 크게 바꿀 수 있다."
          }
        ]
      }
    ]
  }),
};

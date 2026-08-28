import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/30 */
export const userScanning: Article = {
  id: "a-user-scanning",
  slug: "user-scanning",
  title: "사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’",
  subtitle: "사용자가 웹·앱 콘텐츠를 읽는 것이 아니라 시선을 빠르게 움직이며 필요한 정보만 취득하는 행동 패턴을 말한다. 이는 대부분의 사용자가 화면의 모든 문장을 끝까지 읽지 않고, 핵심 키워드·이미지·가격·제목 등…",
  authorId: "u-suyeon",
  topics: ["Cognitive Science", "UI"],
  coverImage: "/images/user-scanning/01.png",
  status: "published",
  publishedAt: "2025-08-10",
  createdAt: "2025-08-10",
  updatedAt: "2025-08-10",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/30" },
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
            "text": "사용자 스캐닝(User Scanning) 이란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자가 웹·앱 콘텐츠를 읽는 것이 아니라 "
          },
          {
            "type": "text",
            "text": "시선을 빠르게 움직이며 필요한 정보만 취득하는 행동 패턴",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 말한다. 이는 대부분의 사용자가 화면의 모든 "
          },
          {
            "type": "text",
            "text": "문장을 끝까지 읽지 않고",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ", 핵심 키워드·이미지·가격·제목 등 "
          },
          {
            "type": "text",
            "text": "‘시각적 단서’",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 위주로 훑어본다는 것을 의미한다."
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/user-scanning/02.png",
          "alt": "사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’",
          "title": "© Interaction Design Foundation, CC BY-SA 4.0"
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
            "text": "Nielsen Norman Group의 Eye-tracking 연구"
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
                    "text": "Jakob Nielsen (1997, 2006)",
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
            "text": "Nielsen Norman Group의 Eye-tracking 연구에서 웹 사용자의 약 "
          },
          {
            "type": "text",
            "text": "79%가 ‘읽기(read)’가 아닌 ‘스캔(scan)’ 형태",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "로 페이지를 탐색한다고 발표했다. 긴 문장보다 굵은 글씨, 첫 단어, 링크 텍스트, 이미지 캡션 등 시각적으로 두드러진 부분에 시선이 몰리는 경향 확인했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "시각 패턴 발견",
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
                    "text": "F-Pattern",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 2006년 NNGroup 연구에서 발견했으며, 사용자가 화면을 왼쪽 상단부터 "
                  },
                  {
                    "type": "text",
                    "text": "수평",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "으로 읽고, 다시 조금 내려와 또 수평으로 읽은 뒤, "
                  },
                  {
                    "type": "text",
                    "text": "왼쪽 세로줄을 따라 끝까지 훑는 패턴",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "이다."
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
                    "text": "Z-Pattern",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 광고나 랜딩 페이지처럼 정보량이 적고 균등 배치된 화면에서 발견한 패턴으로, 좌→우→대각선→우 하단으로 "
                  },
                  {
                    "type": "text",
                    "text": "시선",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "이 흐르며 "
                  },
                  {
                    "type": "text",
                    "text": "Z자 형태를",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 그린다."
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
          "src": "/images/user-scanning/03.jpg",
          "alt": "사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’",
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
            "text": "F-Pattern"
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
                    "text": "주로 뉴스/블로그, 쇼핑몰같은 "
                  },
                  {
                    "type": "text",
                    "text": "텍스트 위주의 페이지",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "에서 나타난다."
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
            "text": "시선 이동 경로:"
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
                    "text": "왼쪽 상단 모서리에서 시작"
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
                    "text": "본문의 첫 줄(혹은 헤드라인)을 읽는다/스캔"
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
                    "text": "흥미로운 내용을 발견하기 전까지 왼쪽의 열을 따라 아래로 스캔"
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
                    "text": "흥미로운 내용을 좀 더 주의 깊게 읽음"
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
                    "text": "계속 아래로 스캔"
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
                    "text": "이 방법을 반복함으로써 스캐닝 패턴이 E, 또는 F처럼 보이게 되고, 그것이 패턴의 이름이 된다."
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
            "text": "디자인 적용 팁",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ":"
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
                    "text": "제목·첫 단락에 핵심 정보 배치"
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
                    "text": "왼쪽 영역에 중요한 메뉴·키워드 배치"
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
                    "text": "긴 문장보단 굵은 글씨·리스트·이미지 활용"
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
          "src": "/images/user-scanning/04.png",
          "alt": "사용자 스캐닝(User Scanning) : 사용자는 ‘읽지 않고 훑는다’",
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
            "text": "Z-Pattern"
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
                    "text": "주로 랜딩페이지, 광고, 포스터, 이미지 위주의 단순한 웹페이지같은 텍스트가 적고 중앙에 있지 않은 페이지에서 발생한다."
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
            "text": "시선 이동 경로",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ":"
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
                    "text": "좌측 상단(로고, 브랜드명) → 우측 상단(메뉴, CTA 버튼)"
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
                    "text": "대각선 이동으로 좌측 하단(핵심 이미지·메시지)"
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
                    "text": "우측 하단(결정 버튼·연락처)"
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
            "text": "디자인 적용 팁",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ":"
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
                    "text": "네 꼭짓점에 주요 정보 배치"
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
                    "text": "중앙부 대각선 라인에 주목 요소 삽입"
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
                    "text": "우하단에 명확한 CTA 버튼 배치"
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
            "text": "사용자 스캐닝이 중요한 이유"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "페이지의 어떤 부분은 자연스럽게 시람들의 눈길을 끄는 반면, 다른 부분은 관심을 받지 못한다는 사실이 있다. 이렇게 "
          },
          {
            "type": "text",
            "text": "레이아웃에서 '강한' 부분과 '약한' 부분",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 나눌 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사람들은 패턴을 따라 배치된 버튼을 무작위로 배치된 다른 것들보다 더 많이 클릭할 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "고로 이 패턴을 알고 유저가 페이지를 방문할 시 "
          },
          {
            "type": "text",
            "text": "'어떤 순서로 정보를 보게할 것'",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "인지 생각을 하여 사용자가 자연스러운 흐름을 따르도록 레이아웃을 배치해야한다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "추가로, "
          },
          {
            "type": "text",
            "text": "시각적 계층을 활용하여 사용자가 더 빠르게 스캐닝",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하도록 할 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "타이포그래피를 사용해 텍스트의 중요성을 강조하고, 특정 색상을 이용해 중요 이미지에 시각적 무게감을 더하는 방법은 시각적 계층을 만들어 사람들이 재빨리 스캔할 수 있게 해준다. 심미적으로도 좋은 효과를 주지만 스캔이 더욱 쉬워지는 효과가 있기 때문에 더욱 좋은 방법이다."
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
            "text": "Reference"
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
                    "text": "Nielsen, J. (2006). F-Shaped Pattern For Reading Web Content. Nielsen Norman Group. "
                  },
                  {
                    "type": "text",
                    "text": "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/"
                        }
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
                    "text": "Nielsen, J. (1997). How Users Read on the Web. Nielsen Norman Group. "
                  },
                  {
                    "type": "text",
                    "text": "https://www.nngroup.com/articles/how-users-read-on-the-web/",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.nngroup.com/articles/how-users-read-on-the-web/"
                        }
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
            "text": "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile)Eleven years after discovering the F-shaped reading pattern, we revisit what it means today.www.nngroup.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/"
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
            "text": "F-Shaped Pattern of Reading on the Web: Misunderstood, But Still Relevant (Even on Mobile)Eleven years after discovering the F-shaped reading pattern, we revisit what it means today.www.nngroup.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/f-shaped-pattern-reading-web-content/"
                }
              }
            ]
          }
        ]
      }
    ]
  }),
};

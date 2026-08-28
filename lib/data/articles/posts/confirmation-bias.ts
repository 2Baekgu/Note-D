import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/4 */
export const confirmationBias: Article = {
  id: "a-confirmation-bias",
  slug: "confirmation-bias",
  title: "확증 편향 (Confirmation bias)",
  subtitle: "확증편향 (Confirmation bias) 은 자신의 가치관이나 신념, 판단과 일치하는 정보만을 주목하고, 그렇지 않은 정보는 무시하는 사고방식을 말한다. 즉, '자신이 보고, 듣고싶은 것만 선택적으로…",
  authorId: "u-suyeon",
  topics: ["Psychology", "Design Theory"],
  coverImage: "/images/confirmation-bias/01.png",
  status: "published",
  publishedAt: "2025-01-17",
  createdAt: "2025-01-17",
  updatedAt: "2025-01-17",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/4" },
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
            "text": "확증편향이란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "확증편향 (Confirmation bias) 은 "
          },
          {
            "type": "text",
            "text": "자신의 가치관이나 신념, 판단과 일치하는 정보만을 주목",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하고, 그렇지 않은 정보는 무시하는 사고방식을 말한다. 즉, '자신이 보고, 듣고싶은 것만 선택적으로 믿는다는 심리 현상'이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "확증편향은 영국의 심리학자 피터 캐스카트 와슨 (Peter Cathcart Wason)이 1960대에 처음으로 실험적으로 정의하고 연구했다. 피터 왓슨은"
          },
          {
            "type": "text",
            "text": " \"2-4-6 문제\"",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "라는 실험을 통해 사람들이 자신의 가설을 어떻게 검증하고, 그 과정에서 확증편향이 어떻게 나타나는지를 입증했다."
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
            "text": "피터 와슨의 2-4-6 문제"
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
                    "text": "실험내용",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " : 피터 와슨은 참가자들에게 숫자 \"2-4-6\"이 특정 규칙을 따른다고 설명하고, 그 규칙을 찾아내도록 요청했다. (규칙을 찾도록 스무고개같이 물어볼 수 있음)"
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
                    "text": "결과",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " : 대부분의 참가자들은 \"짝수로 이루어진 연속된 숫자\"라는 가설을 세우고, 이를 확인하기 위해 참가자들은 \"4-6-8\" 또는 \"8-10-12\" 같은 자신이 세운 가설을 확인하는 숫자만 실험자에게 제시했다. 하지만 실제 규칙은 \"숫자가 점점 증가하는 것\"이었으며, 참가자들은 자신이 틀릴 가능성을 검토하지 않아 정답에 도달하지 못하는 경우가 많았다."
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
                    "text": "결론 및 의의",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " : 참가자들은 자신의 가설을 확증하려는 질문만 던졌고, 이 과정에서 반대되는 사례를 탐구하지 않아 오류를 범했다. 이 실험은 사람들이 자신의 가설을 지지하는 정보만 찾으려 하고, 반박할 수 있는 정보는 간과한다는 점을 보여줬다."
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
            "text": "확증편향의 정의"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "확증편향은 심리학과 행동 경제학에서 많이 다뤄지는 개념으로, 다음과 같이 정의할 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "1. 인지적 정의 : ",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "확증편향은 사람들이 자신이 믿고 있는 것과 일치하는 정보를 더 쉽게 받아들이고, 반대되는 정보는 회피하거나 왜곡하는 심리적 경향이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "2. 행동적 정의 : ",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "사람들은 자신이 옳다고 믿는 것을 지지하는 데이터를 수집하고, 반대되는 정보를 배제하려 한다. 이로 인해 의사결정이나 논리적 사고에서 비합리성이 발생할 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "즉, 인지적으론 \"내 생각이 맞다는 것을 증명해주는 정보만 더 믿는 것\", 행동적으론 \"내가 믿는 게 옳다고 행동으로 보여주려고 애쓰는 것\" 이다."
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
            "text": "서비스에 적용된 확증편향 (긍정적)"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/confirmation-bias/02.jpg",
          "alt": "확증 편향 (Confirmation bias)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "1. 맞춤형 추천 시스템",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "****"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "예시: 넷플릭스, 유튜브, 스포티파이",
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
                    "text": "설명",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자의 시청 기록이나 청취 데이터를 기반으로 취향에 맞는 콘텐츠를 추천한다. 사용자는 \"내가 좋아할 만한 것을 잘 알고 있네!\"라는 생각을 하게 되어 플랫폼에 대한 신뢰가 강화되고 더 오래 머물게 된다."
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
                    "text": " ",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "긍정",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " "
                  },
                  {
                    "type": "text",
                    "text": "요소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자의 "
                  },
                  {
                    "type": "text",
                    "text": "기존 취향을 확인",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "해주면서 "
                  },
                  {
                    "type": "text",
                    "text": "긍정적인 사용자 경험",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "을 제공한다."
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
            "text": "2.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " "
          },
          {
            "type": "text",
            "text": "리뷰 및 평점 강조",
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
            "text": "예시: 아마존, 쿠팡",
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
                    "text": "설명",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자가 이미 사고 싶다고 생각하는 제품의 긍정적인 리뷰를 눈에 띄는 곳에 배치한다. 또한, 평점이 높은 제품을 강조하여 사용자가 \"이 제품이 내가 생각한 대로 좋은 제품이 맞아!\"라고 느끼게 한다."
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
                    "text": " ",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "긍정"
                  },
                  {
                    "type": "text",
                    "text": " 요소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자의 의사결정을 확증시켜 구매를 촉진한다."
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
            "text": "3. 뉴스레터 및 개인화된 콘텐츠 제공",
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
            "text": "예시: 뉴스 앱, 블로그 플랫폼",
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
                    "text": "설명",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자가 자주 읽는 주제나 기사를 기반으로 관련된 정보를 추천한다. 이를 통해 사용자는 자신이 알고 싶은 정보만 소비하게 되고, 서비스에 대한 만족도가 높아진다."
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
                    "text": "긍정 요소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 개인화를 통해 사용자의 확증편향을 강화한다."
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
            "text": "서비스에 적용된 확증편향 (부정적)"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/confirmation-bias/03.webp",
          "alt": "확증 편향 (Confirmation bias)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "1.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " "
          },
          {
            "type": "text",
            "text": "필터버블",
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
            "text": "예시: 뉴스 앱, 소셜 미디어 (페이스북, 트위터)",
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
                    "text": "설명",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자가 선호하는 콘텐츠만 지속적으로 노출하여 다른 관점을 접할 기회를 차단한다. 결과적으로 사용자는 왜곡된 정보에 갇히거나, 편협한 시각을 가질 수 있다."
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
                    "text": "부정 요소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자는 더 이상 다양하고 균형 잡힌 정보를 얻지 못하고, 플랫폼에 대한 신뢰도가 떨어질 수 있다."
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
            "text": "2. 과도한 개인화",
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
            "text": "예시: 넷플릭스, 아마존",
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
                    "text": "설명",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 지나치게 개인화된 추천 시스템은 사용자가 새로운 경험을 시도할 기회를 차단한다. \"나만 아는 콘텐츠\"에 갇히게 되어 서비스가 단조롭게 느껴질 수 있다."
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
                    "text": "부정 요소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사용자는 서비스가 단조롭거나 제한적이라고 느끼고, 흥미를 잃을 수 있다."
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
            "text": "3. 사회적 증거의 역효과",
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
            "text": "예시: 인기 강조 문구를 잘못 사용한 예약 플랫폼 (예: \"마감 임박\" 메시지)",
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
                    "text": "설명",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": \"지금 이 호텔을 20명이 보고 있습니다!\" 같은 문구로 조급함을 유발했지만, 사용자가 나중에 이를 과장된 표현으로 인식하면 신뢰가 손상된다."
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
                    "text": "부정 요소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": \"속임수\"라고 느끼고 플랫폼을 불신하거나, 나중에 이런 메시지를 무시하게 된다."
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
            "text": "Reference"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://www.yna.co.kr/view/AKR20161117133100009",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.yna.co.kr/view/AKR20161117133100009"
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
            "text": "\"美대선 때 페이스북서 '가짜 뉴스'가 진짜보다 더 흥행\" | 연합뉴스(서울=연합뉴스) 김아람 기자 = 미국 대선 기간 주요 언론사가 생산한 진짜 뉴스보다 확인되지 않은 가짜 뉴스가 페이스북에서 더 많은 관심을 끌...www.yna.co.kr",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.yna.co.kr/view/AKR20161117133100009"
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
            "text": "https://www.chosun.com/economy/tech_it/2021/06/28/NWJ5BIRZJRAKNNNQXKL5UMOEZU/?utm_source=chatgpt.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.chosun.com/economy/tech_it/2021/06/28/NWJ5BIRZJRAKNNNQXKL5UMOEZU/?utm_source=chatgpt.com"
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
            "text": "10개 중 4개가 가짜… 상품 리뷰 딜레마에 빠진 아마존10개 중 4개가 가짜 상품 리뷰 딜레마에 빠진 아마존 김성민의 실밸 레이더 넘쳐나는 가짜 리뷰에 이미지 타격받아 핵심 경쟁력이 장애물로www.chosun.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.chosun.com/economy/tech_it/2021/06/28/NWJ5BIRZJRAKNNNQXKL5UMOEZU/?utm_source=chatgpt.com"
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
            "text": "https://www.sisunnews.co.kr/news/articleView.html?idxno=52896&utm_source=chatgpt.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.sisunnews.co.kr/news/articleView.html?idxno=52896&utm_source=chatgpt.com"
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
            "text": "[SNS 거품 장벽의 부작용 ‘필터버블’ [지식용어][시선뉴스 이승재 / 디자인 최지민pro] 디지털 기술은 데이터의 압축과 저장을 쉽게 만들면서 ‘빅데이터’라는 시스템을 구축할 수 있게 됐다. 특히나 개인의 관심사, 취미 등에 대한 빅데이터www.sisunnews.co.kr](https://www.sisunnews.co.kr/news/articleView.html?idxno=52896&utm_source=chatgpt.com)"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://aistoryhub.tistory.com/entry/%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%EC%99%80-%EC%8A%A4%ED%8F%AC%ED%8B%B0%ED%8C%8C%EC%9D%B4%EC%9D%98-AI-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%B6%84%EC%84%9D?utm_source=chatgpt.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://aistoryhub.tistory.com/entry/%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%EC%99%80-%EC%8A%A4%ED%8F%AC%ED%8B%B0%ED%8C%8C%EC%9D%B4%EC%9D%98-AI-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%B6%84%EC%84%9D?utm_source=chatgpt.com"
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
            "text": "넷플릭스와 스포티파이의 AI 추천 알고리즘 분석안녕하세요! 오늘은 넷플릭스(Netflix)와 스포티파이(Spotify)가 어떻게 AI 추천 알고리즘을 사용해 각각의 플랫폼에서 사용자에게 개인 맞춤형 콘텐츠를 제공하는지 이야기해 볼게요. 넷플릭스에서aistoryhub.tistory.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://aistoryhub.tistory.com/entry/%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%EC%99%80-%EC%8A%A4%ED%8F%AC%ED%8B%B0%ED%8C%8C%EC%9D%B4%EC%9D%98-AI-%EC%B6%94%EC%B2%9C-%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98-%EB%B6%84%EC%84%9D?utm_source=chatgpt.com"
                }
              }
            ]
          }
        ]
      }
    ]
  }),
};

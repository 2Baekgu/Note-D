import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/23 */
export const socialProof: Article = {
  id: "a-social-proof",
  slug: "social-proof",
  title: "사회적 증거 (Social Proof)",
  subtitle: "사회적 증거(Social Proof)는 사람들은 다른 사람이 하는 행동을 기준 삼아 자기 행동을 결정한다는 심리적 이론이다.",
  authorId: "u-suyeon",
  topics: ["Psychology", "Product"],
  coverImage: "/images/social-proof/01.png",
  status: "published",
  publishedAt: "2025-05-11",
  createdAt: "2025-05-11",
  updatedAt: "2025-05-11",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/23" },
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
            "text": "사회적 증거 (Social Proof) 란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사회적 증거(Social Proof)는 사람들은 "
          },
          {
            "type": "text",
            "text": "다른 사람이 하는 행동을 기준 삼아 자기 행동을 결정",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "한다는 심리적 이론이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "UX에서는 사용자가 어떤 행동을 하기 전에 "
          },
          {
            "type": "text",
            "text": "다른 사람들의 행동, 평가, 수치를 보고 신뢰하거나 결정",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하게 되는 심리를 의미한다."
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
            "text": "사회적 증거 실험"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Robert B. Cialdini",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": ", 1984년 저서 Influence: The Psychology of Persuasion에서 개념 정리를 했다."
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
                    "text": "Milgram, Bickman & Berkowitz (1969): 사람들이 하늘을 올려다보는 실험 →"
                  },
                  {
                    "type": "text",
                    "text": " 다수가 하늘을 보면 나도 무의식적으로 따라 보게 됨",
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
                    "text": "Cialdini 외 연구팀(2008): 호텔의 수건 재사용 문구에서 ‘다른 손님들도 수건을 재사용했습니다’ 문구가 "
                  },
                  {
                    "type": "text",
                    "text": "행동 유도율을 26%에서 44%로 증가",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "시킴"
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
            "text": "이론이 서비스에 적용된 사례"
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
            "text": "✅ 긍정적 적용 예시"
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
                    "text": "리뷰/평점",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 아마존, 배달의민족 등에서 별점과 리뷰 수는 핵심 사회적 증거로 작용함."
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
                    "text": "\"지금 14명이 이 상품을 보고 있어요\"",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 숙박앱, 항공권 앱 등에서 실시간 이용자 수를 노출하여 구매 욕구 유발"
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
                    "text": "SNS 공유 수/좋아요 수",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 콘텐츠의 신뢰성/인기 판단 기준으로 작용"
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
          "src": "/images/social-proof/02.png",
          "alt": "사회적 증거 (Social Proof)",
          "title": "카페24"
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
            "text": "❌ 부정적 적용 예시"
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
                    "text": "조작된 리뷰",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 사회적 증거가 신뢰를 기반으로 하는 만큼, 조작되면 사용자 이탈이나 불신 초래"
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
                    "text": "0개의 리뷰",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 리뷰가 아예 없으면 오히려 부정적 인상을 줄 수 있음 → 이런 경우 "
                  },
                  {
                    "type": "text",
                    "text": "초기 리뷰 유도 전략",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "이 중요함"
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
          "src": "/images/social-proof/03.jpg",
          "alt": "사회적 증거 (Social Proof)",
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
            "text": "💡 결론"
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
                    "text": "신뢰도 높은 사회적 증거 = "
                  },
                  {
                    "type": "text",
                    "text": "사용자 전환율↑",
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
                    "text": "하지만 “너무 과하거나 허위”는 오히려 부정적 효과"
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
            "text": "https://www.nngroup.com/articles/social-proof-ux/",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.nngroup.com/articles/social-proof-ux/"
                }
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
                    "text": "Cialdini, R. B. (1984). Influence: The Psychology of Persuasion"
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
                    "text": "Goldstein, N. J., Cialdini, R. B., & Griskevicius, V. (2008). A room with a viewpoint. "
                  },
                  {
                    "type": "text",
                    "text": "https://doi.org/10.1037/0022-3514.95.5.1087",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://doi.org/10.1037/0022-3514.95.5.1087"
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
                    "text": "NNGroup: "
                  },
                  {
                    "type": "text",
                    "text": "https://www.nngroup.com/articles/social-proof-ux/",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.nngroup.com/articles/social-proof-ux/"
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
                    "text": "UX Collective: "
                  },
                  {
                    "type": "text",
                    "text": "https://uxdesign.cc/designing-for-social-proof-3074ebeb38a3",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://uxdesign.cc/designing-for-social-proof-3074ebeb38a3"
                        }
                      }
                    ]
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

import type { Article } from "@/lib/types";

/** Imported from https://blog.naver.com/designer_sienna/224249858071 */
export const methodOfLoci: Article = {
  id: "a-method-of-loci",
  slug: "method-of-loci",
  title: "기억의 궁전 : 유전자좌의 방법 (Method of Loci)",
  subtitle: "유전자좌의 방법(Method of Loci), 흔히 기억의 궁전(Memory Palace)이라고 불리는 이 기법은 고대 그리스와 로마 시대부터 사용된 강력한 기억술이다.",
  authorId: "u-sienna",
  topics: ["Cognitive Science","UX"],
  coverImage: "/images/method-of-loci/01.jpg",
  status: "published",
  publishedAt: "2026-04-12",
  createdAt: "2026-04-12",
  updatedAt: "2026-04-12",
  references: [
    { label: "원문 보기", source: "Naver Blog", url: "https://blog.naver.com/designer_sienna/224249858071" },
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
            "text": "유전자좌의 방법(Method of Loci), 흔히 "
          },
          {
            "type": "text",
            "text": "기억의 궁전(Memory Palace)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이라고 불리는 이 기법은 고대 그리스와 로마 시대부터 사용된 강력한 기억술이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "쉽게 말해, "
          },
          {
            "type": "text",
            "text": "익숙한 장소(집, 길, 동네 등)에 기억하고 싶은 정보를 생생한 이미지로 하나씩 배치",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "해서 저장하는 방법이다. 나중에 그 장소를 머릿속으로 다시 걸어가면서(mental walk) 정보를 순서대로 떠올린다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "“현관에 거대한 사과가 문을 막고 서 있고, 거실 소파에서 우유 폭포가 쏟아진다…”처럼 이상하고 강렬한 이미지를 만들면, 추상적인 정보보다 훨씬 오래 기억에 남는다."
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
            "text": "이 기법은 고대 연설가들이 긴 연설을 외울 때 썼다고 알려져 있다. 현대 기억력 대회 챔피언들도 여전히 가장 많이 사용하는 방법 중 하나다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "뇌과학적으로는 우리 뇌의 "
          },
          {
            "type": "text",
            "text": "강력한 공간 기억(spatial memory)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 시스템을 활용한다. 인간은 추상적인 단어나 숫자보다 "
          },
          {
            "type": "text",
            "text": "물리적 위치 + 생생한 시각 이미지",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "를 훨씬 잘 기억하도록 진화했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "가장 대표적인 연구는 2017년 Dresler 연구(Neuron 저널)다. 일반인 51명을 세 그룹으로 나누어 6주 동안 매일 30분씩 훈련을 진행했다."
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
                    "text": "Method of Loci 그룹",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 기억의 궁전 기법 훈련 (익숙한 장소에 생생한 이미지를 배치하는 연습)"
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
                    "text": "작업기억 훈련 그룹",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": n-back 과제 훈련 → n-back은 현재 나타나는 자극(글자나 숫자)이 "
                  },
                  {
                    "type": "text",
                    "text": "n단계 이전",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "에 나온 것과 같은지 판단하는 과제다. 예를 들어 2-back에서는 현재 글자가 2단계 전에 나온 글자와 일치하는지 계속 비교해야 한다. 이 훈련은 "
                  },
                  {
                    "type": "text",
                    "text": "단기 작업기억 용량",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "을 늘리는 데 초점을 맞춘다."
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
                    "text": "통제 그룹",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": ": 훈련 없음"
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
            "text": "실험 결과",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 매우 분명했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "훈련 전, 참가자들은 72개 단어 목록을 평균 "
          },
          {
            "type": "text",
            "text": "26개",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 정도밖에 기억하지 못했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "6주 후:"
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
                    "text": "Method of Loci 그룹",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 평균 "
                  },
                  {
                    "type": "text",
                    "text": "62개",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 기억 (약 "
                  },
                  {
                    "type": "text",
                    "text": "2.4배",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 향상)"
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
                    "text": "작업기억 훈련 그룹",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 평균 11개 정도만 증가"
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
                    "text": "통제 그룹",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " → 평균 7개 정도만 증가"
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
            "text": "더 중요한 것은 "
          },
          {
            "type": "text",
            "text": "장기 유지율",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이었다. 훈련 종료 "
          },
          {
            "type": "text",
            "text": "4개월 후",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 다시 테스트했을 때, Method of Loci 그룹만 여전히 "
          },
          {
            "type": "text",
            "text": "평균 22개 이상",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 향상된 상태를 유지했다. 다른 두 그룹은 거의 원래 수준으로 돌아갔다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "뇌 스캔 결과에서도 Method of Loci 그룹의 뇌 연결 패턴이 실제 기억력 대회 선수들의 패턴과 비슷해지는 변화가 관찰됐다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 연구 이후 여러 후속 연구와 메타분석에서도 Method of Loci가 단순 반복 암기나 작업기억 훈련보다 "
          },
          {
            "type": "text",
            "text": "장기 기억 향상과 유지",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "에서 압도적으로 우수하다는 결과가 반복적으로 확인되고 있다."
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
            "text": "3. 웹·앱에서 어떻게 쓰이고 있을까?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "유전자좌의 방법은 복잡한 정보를 "
          },
          {
            "type": "text",
            "text": "순서대로 + 공간적으로",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 기억하게 만드는 데 탁월하다. UX에서는 사용자가 앱이나 웹을 “익숙한 집”처럼 느끼게 만들어 인지 부하를 줄이고, 기억과 탐색을 쉽게 만든다."
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
                    "text": "Google Photos “Places” 뷰",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 사용자가 찍은 사진과 영상을 "
                  },
                  {
                    "type": "text",
                    "text": "촬영 장소",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "를 기준으로 지도 위에 클러스터링해서 보여준다. 지도를 확대하거나 특정 장소를 클릭하면 그곳에서 찍은 모든 추억이 한꺼번에 쏟아져 나온다. “내 고향 집 근처”, “작년 여행 간 카페”처럼 익숙한 장소를 클릭하면 기억이 자동으로 떠오르게 설계된, 디지털 기억의 궁전 그 자체다."
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
          "src": "/images/method-of-loci/01.jpg",
          "alt": "기억의 궁전 : 유전자좌의 방법 (Method of Loci)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "출처: Google Photo"
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
                    "text": "온보딩 UI 투어 (Onboarding UI Tours)",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 많은 앱이 신규 사용자를 안내할 때 기능을 “집 현관 → 거실 → 부엌”처럼 공간적 순서로 배치한다. 사용자가 화면을 하나씩 넘기며 “이 기능은 여기, 저 기능은 저기”를 자연스럽게 공간적으로 기억하게 만든다. 나중에 다시 사용할 때 “아, 그 기능은 화면 오른쪽 위에 있었지” 하며 빠르게 찾을 수 있다."
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
          "src": "/images/method-of-loci/02.png",
          "alt": "기억의 궁전 : 유전자좌의 방법 (Method of Loci)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "출처: Career Go App — Guide Tour"
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
            "text": "4. 결론"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "유전자좌의 방법은 단순한 기억 트릭이 아니라, 우리 뇌의 "
          },
          {
            "type": "text",
            "text": "공간 기억",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이라는 강력한 시스템을 활용한 과학적인 기법이다. UX 디자인에서는 사용자가 앱이나 웹을 “익숙한 집”처럼 느끼게 만들어 정보를 더 잘 기억하고, 더 빠르게 탐색하고, 더 오래 머물게 한다."
          }
        ]
      }
    ]
  }),
};

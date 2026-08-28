import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/35 */
export const prototyping: Article = {
  id: "a-prototyping",
  slug: "prototyping",
  title: "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
  subtitle: "디자인프로세스에서 결과물을 만들기 전 다들 프로로타이핑이라는 것을 할 것이다. 통용적으로 결과물을 예측하여 미리 만들어보는 모델이나 샘플을 생각할텐데, 이 방식이 다양해서 이번엔 프로토타이핑에 대해 가볍게…",
  authorId: "u-suyeon",
  topics: ["UX Research", "UX"],
  coverImage: "/images/prototyping/01.png",
  status: "published",
  publishedAt: "2026-01-25",
  createdAt: "2026-01-25",
  updatedAt: "2026-01-25",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/35" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/prototyping/01.png",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "디자인프로세스에서 결과물을 만들기 전 다들 프로로타이핑이라는 것을 할 것이다. 통용적으로 결과물을 예측하여 미리 만들어보는 모델이나 샘플을 생각할텐데, 이 방식이 다양해서 이번엔 프로토타이핑에 대해 가볍게 살펴보려한다."
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
            "text": "Prototyping 이란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "프로토타이핑(Prototyping)은 아이디어나 설계안을 실제 서비스처럼 구현하여 "
          },
          {
            "type": "text",
            "text": "사용자 반응, 사용성, 문제점을 사전에 검증",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하기 위한 방법이다. 완성된 제품 이전 단계에서 빠른 실험과 반복을 가능하게 하는 핵심 UX 프로세스이다. 즉, 조기에 테스트하여 결과물을 예측가능하게 하여 실패율을 줄이고 결과적으로 총 비용과 시간을 절감하면서도 퀄리티를 높이는 것이다."
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
            "text": "Prototype의 Horizontal과 Vertical"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Horizontal Prototype : 넓고 얕게 구현",
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
            "text": "수평형 프로토타입은 시스템 전반의 기능과 화면을 "
          },
          {
            "type": "text",
            "text": "넓고 얕게",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 구현하여 전체 구조와 기능 간 관계를 이해하기 위한 프로토타입이다. 개별 기능의 완성도보다는 "
          },
          {
            "type": "text",
            "text": "정보 구조, 흐름, 범위 파악",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "에 목적이 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Vertical Prototype : 좁고 깊게 구현",
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
            "text": "수직형 프로토타입은 특정 기능이나 시나리오를 "
          },
          {
            "type": "text",
            "text": "좁고 깊게",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 구현하여 실제 사용 과정과 작동 원리를 검증하기 위한 프로토타입이다. 이해하기 어려운 복잡한 기능들이 작동하는 과정을 연관된 작업흐름에 따라 모두 구현함으로써 이해가능하고 검증 가능하게 하여 "
          },
          {
            "type": "text",
            "text": "엔드 투 엔드(end-to-end) 경험",
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
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Prototype의 충실도(Fidelity)에 따른 분류"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Low Fidelity (Lo-Fi) Prototype",
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
                    "text": "\"Quick & Dirty\""
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
                    "text": "초기의 핵심 컨셉을 빠르게 구현해 볼 수 있다."
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
                    "text": "크리티컬한 문제를 빠르게 발견할 수 있다."
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
                    "text": "프로젝트 초기나 각 프로세스에서 '스케치'를 하듯 곁들이는 경우가 많다."
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
            "text": "High Fidelity (Hi-Fi) Prototype",
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
                    "text": "완성상태에 가깝게 구현, 작동하도록 구현하기도 한다."
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
                    "text": "프로젝트 후반에 디테일한 부분을 살펴보고 문제를 발견하기 위해 진행한다."
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
                    "text": "여기선 근본적인 문제보단 디테일 개선에 초점을 두어야한다."
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
            "text": "Prototype의 종류"
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/prototyping/02.png",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Paper Prototype"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Paper Prototype",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 종이, 펜, 포스트잇 등을 활용해 화면과 인터랙션을 표현하는 가장 초기 단계의 프로토타입이다. 디지털 구현 이전에 "
          },
          {
            "type": "text",
            "text": "정보 구조와 사용자 흐름",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 빠르게 검증하는 데 목적이 있다."
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
                    "text": "장점: 제작 비용과 시간이 매우 낮다"
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
                    "text": "단점: 실제 인터랙션 경험 재현에 한계가 있다"
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
                    "text": "활용 단계: 초기 기획, IA 설계, 컨셉 검증"
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
          "src": "/images/prototyping/03.png",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Paper Prototyping + Role Playing"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Paper Prototyping + Role Playing",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 종이로 만든 화면이나 요소를 활용해 실제 사용 상황을 연기하며 서비스 경험을 검증하는 방식이다. 단순히 화면을 보여주는 데 그치지 않고, "
          },
          {
            "type": "text",
            "text": "사용자·시스템·환경의 역할을 나누어 실제 상황처럼 시뮬레이션",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하는 것이 핵심이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 방법에서는 한 명이 사용자가 되어 태스크를 수행하고, 다른 참여자는 시스템이나 서비스 역할을 맡아 화면을 교체하거나 반응을 제공한다. 이를 통해 사용자의 행동 흐름, 발화, 혼란 지점, 기대와 실제 반응 간의 차이를 생생하게 관찰할 수 있다. 실제 디지털 구현 이전에 사용 맥락을 검증할 수 있다는 점에서 초기 UX 테스트에 매우 효과적이다."
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
                    "text": "장점: 실제 사용 맥락과 행동을 빠르게 관찰할 수 있다"
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
                    "text": "장점: 구현 비용 없이 인터랙션 검증이 가능하다"
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
                    "text": "단점: 정량적 데이터 수집에는 한계가 있다"
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
                    "text": "활용 단계: 초기 사용성 테스트, 서비스 시나리오 검증, UX 리서치"
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
          "src": "/images/prototyping/04.jpg",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Scenario Prototype"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Scenario Prototype",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 특정 사용자 상황과 맥락을 중심으로 서비스가 어떻게 사용되는지를 보여주는 프로토타입이다. 화면보다 "
          },
          {
            "type": "text",
            "text": "사용 맥락과 행동 흐름",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 강조한다."
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
                    "text": "장점: 사용자 니즈와 문제 상황을 명확히 전달한다"
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
                    "text": "단점: 세부 UI 사용성 검증에는 적합하지 않다"
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
                    "text": "활용 단계: 컨셉 제안, 이해관계자 설득, UX 스토리텔링"
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
          "src": "/images/prototyping/05.png",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Video Prototype"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Video Prototype",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 서비스 사용 과정을 영상으로 제작하여 경험을 전달하는 방식이다. 실제 구현 없이도 미래 사용 경험(Future Experience)을 구체적으로 보여줄 수 있다."
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
                    "text": "장점: 복잡한 시스템과 맥락을 직관적으로 전달한다"
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
                    "text": "단점: 상호작용 기반 테스트는 어렵다"
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
                    "text": "활용 단계: 컨셉 검증, 비전 공유, 연구 제안"
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
          "src": "/images/prototyping/06.jpg",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Rapid Prototype"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Rapid Prototype",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 짧은 시간 안에 반복적으로 제작·수정되는 프로토타입을 의미한다. 정해진 형태라기보다 "
          },
          {
            "type": "text",
            "text": "프로세스적 개념",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "에 가깝다."
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
                    "text": "장점: 빠른 피드백과 반복 실험이 가능하다"
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
                    "text": "단점: 완성도보다 속도에 집중한다"
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
                    "text": "활용 단계: UX 실험 전반, 애자일·린 프로세스"
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
          "src": "/images/prototyping/07.jpg",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Wizard of Oz Prototype"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Wizard of Oz Prototype",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 시스템이 자동으로 작동하는 것처럼 보이지만, 실제로는 "
          },
          {
            "type": "text",
            "text": "사람이 뒤에서 기능을 수행",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하는 방식이다. 특히 AI, 음성 인터페이스, 지능형 시스템 연구에서 자주 사용된다."
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
                    "text": "장점: 기술 구현 전 사용자 반응을 검증할 수 있다"
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
                    "text": "단점: 실제 시스템 성능과 차이가 발생할 수 있다"
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
                    "text": "활용 단계: AI UX, 대화형 인터페이스, 멀티모달 연구"
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
          "src": "/images/prototyping/08.png",
          "alt": "프로토타이핑 (Prototyping) : 아이디어를 검증 가능한 경험으로 만드는 방법",
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
            "text": "Lego Prototyping"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Lego Prototyping",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 레고 블록과 같은 물리적 오브젝트를 활용해 서비스 구조, 사용자 여정, 시스템 관계를 시각화하는 프로토타이핑 방식이다. 화면 중심의 UI 설계에서 벗어나, "
          },
          {
            "type": "text",
            "text": "개념·관계·흐름을 공간적으로 표현",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하는 데 목적이 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 방식은 특히 복잡한 서비스 구조나 추상적인 개념을 다룰 때 효과적이다. 기능 간 관계, 사용자와 시스템 간 상호작용, 서비스의 중심 요소를 블록 단위로 표현함으로써 참여자들이 동일한 이해 수준을 공유할 수 있도록 돕는다. 또한 손으로 직접 조립하고 배치하는 과정에서 아이디어가 자연스럽게 확장되며, 팀 내 커뮤니케이션 도구로도 활용된다."
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
                    "text": "장점: 추상적인 개념을 직관적으로 시각화할 수 있다"
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
                    "text": "장점: 팀원 간 사고를 빠르게 정렬할 수 있다"
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
                    "text": "단점: 세부 UI나 인터랙션 검증에는 적합하지 않다"
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
                    "text": "활용 단계: 초기 컨셉 도출, 서비스 구조 설계, 워크숍 및 공감대 형성"
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
            "text": "프로토타이핑을 잘 활용하자"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "프로토타이핑은 단순히 결과물을 미리 만들어보는 과정이 아니라, "
          },
          {
            "type": "text",
            "text": "무엇을 검증할 것인지 선택하는 전략적인 도구",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "라고 볼 수 있다. 프로젝트의 단계와 목적에 따라 넓게 구조를 파악해야 할 때도 있고, 특정 기능을 깊이 검증해야 할 때도 있다. 또한 완성도 높은 결과보다 빠른 실험이 필요한 순간도 존재한다. 결국 중요한 것은 어떤 프로토타입이 더 ‘그럴듯한가’가 아니라, "
          },
          {
            "type": "text",
            "text": "지금 이 단계에서 가장 많은 질문에 답해줄 수 있는 방식이 무엇인가",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. 프로토타이핑을 잘 활용할수록 불확실성은 줄어들고, 디자인의 결정은 점점 더 명확해진다."
          }
        ]
      }
    ]
  }),
};

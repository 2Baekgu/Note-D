import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/12 */
export const filterBubble: Article = {
  id: "a-filter-bubble",
  slug: "filter-bubble",
  title: "필터 버블 (Filter Bubble)",
  subtitle: "사용자가 온라인에서 접하는 정보가 개인화 알고리즘에 의해 제한되어, 특정한 관점이나 취향에 갇히게 되는 현상을 의미한다. 검색 엔진, 소셜 미디어, 뉴스 사이트 등이 사용자의 과거 검색 기록, 클릭 패턴…",
  authorId: "u-suyeon",
  topics: ["Design Theory", "Psychology"],
  coverImage: "/images/filter-bubble/01.png",
  status: "published",
  publishedAt: "2025-02-20",
  createdAt: "2025-02-20",
  updatedAt: "2025-02-20",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/12" },
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
            "text": "필터 버블 (Filter Bubble) 이란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자가 온라인에서 접하는 정보가 "
          },
          {
            "type": "text",
            "text": "개인화 알고리즘에 의해 제한되어, 특정한 관점이나 취향에 갇히게 되는 현상",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "을 의미한다. 검색 엔진, 소셜 미디어, 뉴스 사이트 등이 사용자의 과거 검색 기록, 클릭 패턴, 관심사 등을 기반으로 맞춤형 정보를 제공하면서 발생한다. 이는 긍정적으로 사용자의 '결정피로'를 낮출 수 있지만, 지속적으로 사용자가 비슷한 정보에만 노출되면 인지적인 편향에 빠질 위험도 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "예를들어 유튜브는 '모든 사람은 각자의 시청 습관을 가지고 있다'는 시작점에서 출발해 사용자와 유사한 다른 사용자들의 시청 습관을 비교해 사용자가 시청하고 싶어할 만한 콘텐츠를 추천하기도 한다. 이때 사"
          },
          {
            "type": "text",
            "text": "용자들은 피로없이 즐겁게 보고싶은 컨텐츠를 볼 수 있지만 문제는 이런 알고리즘 기반 추천 방식은 사용자가 자칫 '필터 버블'에 갇힐 수 있는 점",
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
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/filter-bubble/02.png",
          "alt": "필터 버블 (Filter Bubble)",
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
            "text": "필터 버블의 탄생"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "필터 버블 개념은 "
          },
          {
            "type": "text",
            "text": "2011년 엘리 프레이저(Elie Pariser)의 저서 \"The Filter Bubble: What the Internet Is Hiding from You\"",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "에서 처음 제시됐다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "프레이저는 구글, 페이스북, 아마존 같은 플랫폼이 개인화 알고리즘을 통해 사용자에게 최적화된 콘텐츠를 제공하면서, 다양한 정보에 대한 접근이 제한되고 특정 관점만 강화되는 문제를 지적했다. 그는 필터 버블이 민주주의, 사회적 토론, 정보의 다양성을 위협한다고 주장하기도 했다."
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
            "text": "Youtube의 필터 버블 해소"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "유튜브는 대표적인 예로서 추천 알고리즘이 개인 맞춤형 콘텐츠를 제공하여 사용자가 반복적으로 "
          },
          {
            "type": "text",
            "text": "비슷한 콘텐츠를 소비",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하게 한다. \"알 수 없는 유튜브 알고리즘의 힘이 나를 여기로 이끈다.\" 라는 말이 나올정도로 정밀하게 개인화가 매우 잘되어있고 소비자들을 분석하여 관련 콘텐츠만 추천해준다. 그렇게 사용자들은 주로보고 좋아하는 콘텐츠만 소비한다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/filter-bubble/03.png",
          "alt": "필터 버블 (Filter Bubble)",
          "title": "유튜브 deep 식사 전 국룰"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이러한 점 때문에 유튜브는 엄청나게 방대한 콘텐츠를 가졌음에도 불구하고 사람들을 필터 버블에 갇혀 같은 영상만 고르게 된다. 하지만 추천하는 것에도 대해 한계가 있었던 것일까. 사람들은 추천하는 것 안에서도"
          },
          {
            "type": "text",
            "text": " 결정 피로를 느끼고 있어 고르기만 하다 서비스",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "를 이탈해버린 다는 것이다."
          },
          {
            "type": "text",
            "text": " 즉, 필터 버블에 갇혀 흥미유도와 새로움을 느끼지 못하는 것이다.",
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
            "text": "결정 피로(Decision Fatigue)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 사용자가 많은 결정을 반복적 또는 연속적으로 내릴 때, 정신적으로 피로감을 호소하는 심리학 현상을 말한다. 아래 영상을 보면 평소의 자신을 볼 수도 있을 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://youtube.com/shorts/DN00m4larWE?si=GoBgm0V1DVcKtMH0",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://youtube.com/shorts/DN00m4larWE?si=GoBgm0V1DVcKtMH0"
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
            "text": "이를 완화하기 위해서 최근 유튜브는 새로운 변환점을 가져 새로운 기능을 테스트하고 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그중에서도 "
          },
          {
            "type": "text",
            "text": "아무거나 재생(Play Something) 버튼 기능",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이 주목받고 있다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/filter-bubble/04.png",
          "alt": "필터 버블 (Filter Bubble)",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "해당 버튼은 우측하단에 플로팅 버튼으로 띄워져있으며 버튼을 누를 시 기존 메인 홈에서 추천되는 영상과는 별개로 "
          },
          {
            "type": "text",
            "text": "새로운 영상을 무작위로 재생한다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 기존 개인화 알고리즘에 기반한 영상이 아니며, 일반 영상도 쇼츠 플레이어 형태로 재생한다는 점에서 흥미로운 기능 테스트라고 볼 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "해당"
          },
          {
            "type": "text",
            "text": " 랜덤 플레이 기능은",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 사용자가 기존 관심사와 다른 콘텐츠를 자연스럽게 접할 기회를 제공하면서 기존 유튜브의 문제점인 "
          },
          {
            "type": "text",
            "text": "'결정 피로'를 낮추기도 하고, 사용자의 관심 영역을 확장하기도 하면서 필터 버블을 완화",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "할 수도 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "해당 신기능이 이론상으로는 괜찮아 보일 수 있겠지만 사용자에게 더 나은 경험을 제공해 줄 수 있을지는 지는 Play Something의 행보를 지켜봐야할 듯 하다."
          }
        ]
      }
    ]
  }),
};

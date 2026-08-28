import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/17 */
export const millersLaw: Article = {
  id: "a-millers-law",
  slug: "millers-law",
  title: "밀러의 법칙 (Miller's Law)",
  subtitle: "밀러의 법칙은 인간이 단기 기억(Short-term memory)에서 한 번에 처리할 수 있는 정보의 개수가 7(±2)개라는 심리학적 이론이다. 이는 1956년 심리학자 조지 밀러(George A…",
  authorId: "u-suyeon",
  topics: ["Cognitive Science", "UI"],
  coverImage: "/images/millers-law/01.png",
  status: "published",
  publishedAt: "2025-03-20",
  createdAt: "2025-03-20",
  updatedAt: "2025-03-20",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/17" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/millers-law/01.png",
          "alt": "밀러의 법칙 (Miller's Law)",
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
            "text": "밀러의 법칙 (Miller's Law) 이란?"
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
                "text": "\"정보를 덩어리화 하면 외우기 쉽다.\"",
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
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "밀러의 법칙은 인간이 "
          },
          {
            "type": "text",
            "text": "단기 기억",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "(Short-term memory)에서 "
          },
          {
            "type": "text",
            "text": "한 번에 처리할 수 있는 정보",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "의 개수가 7(±2)개라는 심리학적 이론이다. 이는 1956년 심리학자 조지 밀러(George A. Miller)가 발표한 논문 \"The Magical Number Seven, Plus or Minus Two: Some Limits on Our Capacity for Processing Information\"에서 제안되었다."
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
            "text": "사람은 정보 덩어리(Chunk)로 기억한다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "밀러는 실험을 통해 사람들이 숫자, 단어, 자음 등의 정보를 기억하는 능력을 측정했다. 실험 결과, 대부분의 사람이 5~9개의 항목을 단기 기억에 유지할 수 있음을 발견했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그는 이를 통해 인지 부하(Cognitive Load)의 한계를 설명했으며, 인간의 정보 처리 용량을 정량화했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이후 연구에서 ‘청킹(Chunking, 정보 덩어리화)’을 활용하면 기억할 수 있는 정보의 양을 늘릴 수 있음이 알아냈으며, 기억 범위에 더 큰 영향을 미치는 것은 "
          },
          {
            "type": "text",
            "text": "정보의 기본 단위인 비트(Bit)의 양이 아니라 ",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "정보 덩어리(Chunk)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "의 개수이다."
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
            "text": "하지만, 정보의 개수가 중요한게 아니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "조지 밀러는 사람이 작업을 할 때 잠시 머릿속에 기억하는 작업 기억에 저장할 수 있는 정보의 숫자는 5~9개가 한계라고 주장하여 "
          },
          {
            "type": "text",
            "text": "\"마법의 숫자 7 (The Magic Number 7)\"",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이라고 언급하기도 했지만, 이후 여러 실험을 통해 정확한 마법의 숫자는 없다는 것이 밝혀졌다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "정보의 개수가 몇 개여야 하는지 신경 쓰지 말자. 중요한 것은 개수가 아니라, "
          },
          {
            "type": "text",
            "text": "정보를 덩어리로 묶으면 이해하고 기억하는 데 도움이 되는 사실",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이 중요하다."
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
            "text": "흩어진 정보를 유의미한 체계로 분류하자."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "해당 법칙에서 배울 수 있는 것은 흩어진 정보를 맥락에 따라 정돈해 사용자가"
          },
          {
            "type": "text",
            "text": " 머릿속에 기억하게 쉽게 구조화",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 시키는 것이 다. 그 사례들을 살펴보자."
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
            "text": "1. 전화번호"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "아래 이미지를 보면 번호를 숫자로 통으로 나열하는 것 보다는 \"-\"가 붙어 덩어리로 나눈 것이 더 외우기 쉬울 것이다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/millers-law/02.png",
          "alt": "밀러의 법칙 (Miller's Law)",
          "title": "출처 : Design Compass 위 : 번호 숫자 나열, 아래 : -로 구분한 번호 숫자"
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
            "text": "2. 쇼핑몰의 카테고리"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "제품들을 하나의 카테고리로 묶음으로써 사용자가 목적한 바를 빠르게 이룰 수 있도록 나침반 역할을 하고 있다. 쇼핑 특성상 정보가 매우많지만 이를 카테고리 덩어리로 구분하여 원하는 제품을 쉽게 찾아낼 수 있도록 했다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/millers-law/03.png",
          "alt": "밀러의 법칙 (Miller's Law)",
          "title": "SSG.COM 카테고리"
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
            "text": "3. 텍스트 장벽"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "많은 양의 글을 적었을 때 왼쪽보다는 문단을 나누는게 가독성이 훨씬 편할 것이다. 훑어보거나 처리하기 어려운 컨텐츠는 사용자의 인지 부하를 가중시키므로 적절히 문단을 구분시키는게 좋다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/millers-law/04.png",
          "alt": "밀러의 법칙 (Miller's Law)",
          "title": "출처 : 밀러의  법칙 뭔가이게 - 티스토리"
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
            "text": "4. 콘텐츠 구조"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사이트 내 많은 콘텐츠가 있다면 각 규칙에 따라 나뉘고 체계가 부여된다. 그 때문에 콘텐츠 끼리 어떤 관계를 이루고 있는지를 사용자가 쉽게 이해할 수 있다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/millers-law/05.png",
          "alt": "밀러의 법칙 (Miller's Law)",
          "title": "NAVER"
        }
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
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "https://ekimnida.tistory.com/33",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://ekimnida.tistory.com/33"
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
            "text": "4. 밀러의 법칙이 글은 'UX/UI의 10가지 심리학 법칙(존 야블론스키 지음)'을 바탕으로 글 하단에 있는 사이트들을 참고하여 작성한 글입니다. https://lawsofux.com 에서 각 법칙들을 살펴볼 수 있습니다. 보통 사람은ekimnida.tistory.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://ekimnida.tistory.com/33"
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
            "text": "https://designcompass162885993.wordpress.com/2020/12/11/%EB%B0%80%EB%9F%AC%EC%9D%98-%EB%B2%95%EC%B9%99/",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://designcompass162885993.wordpress.com/2020/12/11/%EB%B0%80%EB%9F%AC%EC%9D%98-%EB%B2%95%EC%B9%99/"
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
            "text": "밀러의 법칙정보를 덩어리화 하면 외우기 쉽다.designcompass162885993.wordpress.com",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://designcompass162885993.wordpress.com/2020/12/11/%EB%B0%80%EB%9F%AC%EC%9D%98-%EB%B2%95%EC%B9%99/"
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
            "text": "https://www.interaction-design.org/literature/topics",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.interaction-design.org/literature/topics"
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
            "text": "IxDF Design Compendium: The world's biggest collection of design knowledgeLearn User Experience (UX) and Design from the world' s largest open-source design library.www.interaction-design.org",
            "marks": [
              {
                "type": "link",
                "attrs": {
                  "href": "https://www.interaction-design.org/literature/topics"
                }
              }
            ]
          }
        ]
      }
    ]
  }),
};

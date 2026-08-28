import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/13 */
export const baeminAddressSetting: Article = {
  id: "a-baemin-address-setting",
  slug: "baemin-address-setting",
  title: "배달의민족 주소 설정 뜯어보기",
  subtitle: "오랜만에 본가에서 배달 음식을 먹으려다가 주소를 바꿔야했었다. 그때 문득 배달 업계 1위인 배달의민족은 어떻게 주소 변경을 하는지 궁금해졌다.",
  authorId: "u-suyeon",
  topics: ["UX","UI","Case Study"],
  coverImage: "/images/baemin-address-setting/01.png",
  status: "published",
  publishedAt: "2025-02-21",
  createdAt: "2025-02-21",
  updatedAt: "2025-02-21",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/13" },
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
            "text": "🛵 배달의민족은 주소를 어떻게 설정할까?",
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
            "text": "오랜만에 본가에서 배달 음식을 먹으려다가 주소를 바꿔야했었다. 그때 문득 배달 업계 1위인 배달의민족은 어떻게 주소 변경을 하는지 궁금해졌다. 그래서 이번에는 내가 아주 애용하는 배달의민족 주소 UXUI를 보려고 한다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/01.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "홈화면, 배민배달 페이지"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/02.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "홈화면, 배민배달 페이지"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/03.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "홈화면, 배민배달 페이지"
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
            "text": "1. 홈화면, 배달페이지 (1Depth, 2Depth)",
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
            "text": "배민을 들어가면 보이는 첫 화면이다. 상단 네비게이션에서 주소 확인에 대한 토스트 메세지를 보여준다. 사용자는 이때 주소 확인을 한 번 더 할 수 있어서 주소 실수에 대한 방지 할 수 있다. 또한 혜택 기능에도 토스트 UI를 활용하는 것을 볼 수 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "또한, 가게배달 및 배민배달로 들어가게 되면 해당 주소는 명칭과 자세한 주소도 보이게 된다. 이때 특이한 점은 주소 영역이 작아진 점이다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/04.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "주소 설정 (편집)"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/05.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "주소 설정 (편집)"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/06.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "주소 설정 (편집)"
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
            "text": "2. 주소 설정 (편집)",
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
            "text": "주소 설정 페이지에서는 리스트로 주소들이 보인다. 우측 상단의 편집 버튼을 누르면 편집도 가능하다. 설정과 편집 자체는 군더더기 없이 깔끔하다. 또한, 태그와 아이콘 fill을 사용, 체크 표시를 통해 현재 선택 된 것이 무엇인지 가볍게 구분이 가능하다. 주소 추가 페이지에서는 지도와 입력, 카테고리 구분을 가능하게 되어있다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/07.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "왼쪽 (현재 주문페이지), 오른쪽 (과거 주문페이지)"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/08.jpg",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": "왼쪽 (현재 주문페이지), 오른쪽 (과거 주문페이지)"
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
            "text": "3. 주소 확인",
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
            "text": "배달 음식을 주문하는 페이지로 진입하게되면 나의 배달주소가 보인다. 옛날엔 배달 주소가 강조되어서 표시가 되었는데 최근들어서는 배달 실수가 적어졌나? 배달 주소가 이전처럼은 강조되어있지 않다. 왜일까? 깔끔해져서 좋지만 주소 설정 페이지도 그렇고 관련해서는 강조가 부족해진 것 같아서 아쉬운 느낌이 있다."
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/baemin-address-setting/09.png",
          "alt": "배달의민족 주소 설정 뜯어보기",
          "title": null
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ 서비스 명",
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
            "text": "배달의민족"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ 서비스 소개",
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
            "text": "배달의민족은 매장 점주와 소비자를 매칭해주는 배달 서비스로 많은 매장들의 정보를 포함하고 있는게 서비스의 큰 특징이다. 많은 종류의 카테고리를 가지고 있기 때문에 홈화면에는 정보의 구분이 덩어리로 잘 되어있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ 좋았던 점",
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
            "text": "전체적으로 플로우 문제 없이 필요한 것만 딱딱 구성한 깔끔한 UXUI를 가졌다. Toast UI를 통해서 사용자가 실수하지 않도록 한 번 더 알려주는 것도 괜찮다고 느꼈다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ 아쉬웠던 점",
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
            "text": "깔끔하긴 하지만 깔끔하기 때문일까 현재 설정한 주소, 배달 시 주소 확인에서 강조가 아쉽다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ UX/UI 설계 의도 분석",
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
            "text": "왜? 옛날보다 주소에 대한 강조가 약해졌을까? 데이터는 알 수 없지만 이제 소비자들이 주소에 대한 실수를 많이 하지 않는 것일까? 업계 1위이기 때문에 이제는 다들 익숙해져서 실수를 하지 않을 수도 있겠다는 생각을 했다. 그렇기에 주소가 차지하는 영역을 조금 줄이고 다른 기능들의 영역과 같게 만들었고, 가격 같은 혜택에 대한 메세지를 키워 서비스의 금액적인 혜택부분을 더욱 강조하고 있는 것 같다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "✅ 개선방안",
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
            "text": "데이터를 알 수 없어서 맞다고는 할 수 없지만 만약 주소 실수가 많다면, 주소 설정 목록에서 현재 설정된 주소를 강조하거나 따로 영역을 주어 고정 표기를 하거나 해서 강조했으면 좋겠다. 또한, 배달 시 주소 확인을 조금더 큰 텍스트나 색상으로 강조를 하면 더욱 실수를 방지할 수 있을 것이라 생각이 든다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "반응형"
          }
        ]
      }
    ]
  }),
};

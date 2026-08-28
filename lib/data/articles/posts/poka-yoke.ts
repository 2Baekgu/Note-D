import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/24 */
export const pokaYoke: Article = {
  id: "a-poka-yoke",
  slug: "poka-yoke",
  title: "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
  subtitle: "포카요케(Poka-Yoke)는 일본어로 '실수를 방지한다'는 뜻이다. 우연한 실수를 방지하기 위해 제품 기능에 제한을 두고, 사용자의 행동을 제어하여 올바른 방식으로만 실행되도록 유도하는 메커니즘이다.",
  authorId: "u-suyeon",
  topics: ["Interaction", "UX"],
  coverImage: "/images/poka-yoke/01.png",
  status: "published",
  publishedAt: "2025-06-01",
  createdAt: "2025-06-01",
  updatedAt: "2025-06-01",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/24" },
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
            "text": "포카요케(Poka-Yoke)란?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "포카요케(Poka-Yoke)는 일본어로 '실수를 방지한다'는 뜻이다. 우연한 "
          },
          {
            "type": "text",
            "text": "실수를 방지",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하기 위해 제품 기능에 제한을 두고, "
          },
          {
            "type": "text",
            "text": "사용자의 행동을 제어",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하여 올바른 방식으로만 "
          },
          {
            "type": "text",
            "text": "실행되도록 유도",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "하는 메커니즘이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자가 실수(Mistake)를 하더라도 오류(Error)로 이어지지 않도록 설계하는 실수방지 시스템 개념이며, 일본의 제조업 현장에서 유래한 개념으로, '포카(poka)'는 '실수', '요케(yoke)'는 '방지'를 의미한다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "주로 "
          },
          {
            "type": "text",
            "text": "작업자가 의도치 않게 잘못된 행동을 하더라도 문제 없이 제품을 만들거나 사용하는 설계 장치",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "를 말한다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "→ "
          },
          {
            "type": "text",
            "text": "즉, 실수를 \"할 수 없도록 만드는\" 설계이다.",
            "marks": [
              {
                "type": "bold"
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
            "text": "UXUI에서 포카요케를 활용하는 예시"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "UX에서는 사용자가 실수할 수 있는 순간을 찾아 방지 장치나 경고, 자동화를 넣는 것이 포카요케적 접근이다."
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
            "text": "1. 폼 유효성 검사"
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
                    "text": "이름 및 이메일 형식을 잘못 입력하면 즉시 오류 메시지 제공"
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
                    "text": "비밀번호 조건을 만족하지 않으면 \"입력불가\" 상태로 버튼 비활성화"
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
          "src": "/images/poka-yoke/02.gif",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/poka-yoke/03.png",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": "출처 : https://youngkeol.tistory.com/80, https://donsohn.tistory.com/8"
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
            "text": "2. 삭제 경고창"
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
                    "text": "중요한 정보를 삭제하기 전 “정말 삭제하시겠습니까?” 확인창 제공"
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
                    "text": "실수로 버튼 클릭한 경우를 방지"
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
          "src": "/images/poka-yoke/04.jpg",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/poka-yoke/05.png",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": "삭제 알림, 모달"
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
            "text": "3. 버튼 활성화"
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
                    "text": "Tistory는 게시물 리스트를 선택하기 전까지는 '변경' 같은 편집관련 메뉴버튼은 비활성화"
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
                    "text": "게시글을 체크했을 때에만 버튼이 활성화되어 사용자의 오류 방지"
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
          "src": "/images/poka-yoke/06.png",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/poka-yoke/07.png",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": "Tistory 게시물 관리화면"
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
            "text": "4. 이메일 취소 기능"
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
                    "text": "Gmail과 Naver는 이메일을 보낸 직후 \"전송 취소\" 버튼을 일정 시간 동안 제공함"
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
                    "text": "사용자에게 이메일을 잘못 보낸 실수를 되돌릴 기회 제공"
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
          "src": "/images/poka-yoke/08.png",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": null
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/poka-yoke/09.png",
          "alt": "포카요케(Poka-Yoke) : 사용자의 실수를 방지하는 설계",
          "title": "Google, Naver 이메일 취소"
        }
      }
    ]
  }),
};

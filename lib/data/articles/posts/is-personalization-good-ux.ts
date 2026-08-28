import type { Article } from "@/lib/types";

/** Imported from https://dooday.tistory.com/40 */
export const isPersonalizationGoodUx: Article = {
  id: "a-is-personalization-good-ux",
  slug: "is-personalization-good-ux",
  title: "개인화는 정말 좋은 UX일까?",
  subtitle: "요즘 UX 아티클을 읽다 보면 빠지지 않고 등장하는 단어가 있다. 바로 '개인화(Personalization)'다.",
  authorId: "u-suyeon",
  topics: ["UX","Product","Case Study"],
  coverImage: "/images/is-personalization-good-ux/01.jpg",
  status: "published",
  publishedAt: "2026-07-05",
  createdAt: "2026-07-05",
  updatedAt: "2026-07-05",
  references: [
    { label: "원문 보기", source: "Doodle Day (Tistory)", url: "https://dooday.tistory.com/40" },
  ],
  content: JSON.stringify({
    "type": "doc",
    "content": [
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/01.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.sedaily.com/article/13824361 https://news.lginnotek.com/1300"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/02.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.sedaily.com/article/13824361 https://news.lginnotek.com/1300"
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
            "text": "개인화는 정말 좋은 UX일까?",
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
            "text": "요즘 UX 아티클을 읽다 보면 빠지지 않고 등장하는 단어가 있다. 바로 '개인화(Personalization)'다. 유튜브는 내가 좋아할 영상을 골라주고, 쿠팡은 내가 살 것 같은 상품을 먼저 보여주고, 스포티파이는 내 취향의 플레이리스트를 매주 만들어준다. 개인화는 이제 좋은 UX의 기본값처럼 여겨진다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그런데 문득 궁금해졌다. 개인화는 정말 좋기만 한 걸까? 나를 잘 아는 서비스는 언제나 나에게 이로운 걸까? 이번 글에서는 개인화의 양면을 실제 사례와 함께 들여다보려고 한다."
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
            "text": "개인화는 원래 너무 좋은 아이디어였다",
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
            "text": "개인화가 왜 생겼는지부터 생각해보자. 인터넷에는 콘텐츠가 너무 많다. 유튜브에는 1분마다 수백 시간 분량의 영상이 업로드되고, 넷플릭스에는 평생 봐도 다 못 볼 작품이 쌓여 있다. 사람이 이걸 전부 뒤져서 고를 수는 없다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그래서 서비스들은 생각했다. \"이 사람이 뭘 좋아하는지 안다면, 좋아할 만한 것만 골라서 보여주자.\" 여기까지는 완벽하게 사용자를 위한 좋은 아이디어다. 수만 개의 선택지 앞에서 느끼는 피로를 줄여주고, 탐색 시간을 아껴주고, 내 취향을 알아주는 서비스. 개인화는 분명 사용자를 편하게 만들었다. 문제는 이것이 '너무 잘' 작동하면서 시작되었다."
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/03.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.khan.co.kr/newsletter/inspia/article/202502052040101"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/04.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.khan.co.kr/newsletter/inspia/article/202502052040101"
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
            "text": "필터 버블 :",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "좋아하는 것만 보여줬을 뿐인데..",
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
            "text": "유튜브에서 고양이 영상을 몇 개 봤다고 해보자. 알고리즘은 '이 사람은 고양이를 좋아한다'고 판단하고 고양이 영상을 더 보여준다. 나는 또 보고, 알고리즘은 더 확신하고, 더 보여준다. 이 순환이 반복되면 어느 순간 내 피드에는 고양이만 남는다. 강아지도, 다큐멘터리도, 어쩌면 내가 좋아했을지 모르는 새로운 것들은 애초에 화면에 등장하지 않는다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "고양이라면 귀엽고 끝이지만, 이것이 뉴스나 정치 콘텐츠라면 이야기가 달라진다. 내 생각과 비슷한 의견만 계속 접하다 보면 \"세상 사람들 대부분이 나처럼 생각한다\"는 착각에 빠지게 된다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 현상을 필터 버블(Filter Bubble)이라고 부른다. 2011년 엘리 패리저(Eli Pariser)가 처음 지적한 개념인데, 그는 심지어 구글 검색 결과조차 사람마다 다르게 나온다는 점을 문제 삼았다. 우리는 같은 인터넷을 쓰고 있다고 믿지만, 사실은 각자 다르게 편집된 인터넷을 보고 있는 셈이다. *예전에 필터 버블에 대해 포스팅 한 적이 있으니 참고해도 좋다!"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "여기서 UX 관점의 흥미로운 지점이 있다. 알고리즘은 잘못한 것이 없다는 사실이다. \"사용자가 원하는 것을 보여준다\"는 목표를 충실히 달성했을 뿐이다. 그런데 그 결과로 사용자는 우연히 새로운 것을 발견할 기회, 즉 세렌디피티를 잃었다. 원하는 것만 주는 것이 항상 좋은 것은 아니라는, 개인화의 첫 번째 역설이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "[UX 사회학] 필터 버블 (Filter Bubble)"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "필터 버블 (Filter Bubble) 이란?사용자가 온라인에서 접하는 정보가 개인화 알고리즘에 의해 제한되어, 특정한 관점이나 취향에 갇히게 되는 현상을 의미한다. 검색 엔진, 소셜 미디어, 뉴스 사이트"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "dooday.tistory.com"
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/05.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.youtube.com/watch?v=pdpVXd9GojQ"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/06.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.youtube.com/watch?v=pdpVXd9GojQ"
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
            "text": "소비자의 반감을 샀던 개인화 : Target 임신 예측 사건",
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
            "text": "개인화의 어두운 면을 이야기할 때 빠지지 않는 사건이 하나 있다. 2012년 미국의 대형마트 Target에서 벌어진 일이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Target은 고객의 구매 데이터를 분석해 '이 고객이 임신했을 확률'을 예측하는 모델을 만들었다. 임산부들의 구매 패턴에는 공통점이 있기 때문이다. 무향 로션을 사기 시작하고, 특정 영양제를 구매하는 식이다. Target은 임신한 것으로 추정되는 고객에게 유아용품 쿠폰을 발송했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그러던 어느 날, 한 아버지가 매장에 찾아와 항의했다. \"왜 고등학생인 내 딸에게 아기용품 쿠폰을 보내는 겁니까? 임신이라도 하라는 겁니까?\"라며 역정을 낸 항의에 매니저는 사과했다. 그런데 며칠 뒤, 그 아버지가 다시 전화를 걸어 오히려 사과했다. 딸이 정말로 임신 중이었던 것이다. 아버지보다 마트가 먼저 딸의 임신을 알았던 셈이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 사건이 상징적인 이유는, 개인화가 '틀려서' 실패한 것이 아니라 "
          },
          {
            "type": "text",
            "text": "'정확'하기만 했다는 점에서 실패했다",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 점이다. 예측은 완벽했지만 사용자 경험은 최악이었다. \"이들이 나를 감시하고 있구나\"라는 서늘함이 모든 편리함을 덮어버렸다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "더 흥미로운 것은 이후 Target의 대응이다. 유아용품 쿠폰만 보내면 티가 나니, 그 사이에 와인잔이나 잔디깎이처럼 전혀 상관없는 상품을 일부러 섞어서 보내기 시작했다. 우연히 쿠폰북에 아기용품이 포함된 것처럼 보이게 만든 것이다. 말하자면 '알면서도 모르는 척하는 UX'를 설계한 셈이다. 개인화의 성공을 좌우하는 것은 정확도가 아니라 사용자가 어떻게 '느끼는가'라는 것을 보여주는 사례다."
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
            "text": "사람들은 언제 개인화를 '소름'이라고 느낄까?",
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
            "text": "그렇다면 그 '소름'은 정확히 어디서 오는 걸까. 하버드비즈니스리뷰(HBR)에 실린 연구가 해당 질문에 힌트를 준 것이 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "연구진은 먼저 오프라인 세계의 프라이버시 규범에서 출발한다. 사람들은 프라이버시에 대해 항상 논리적이지 않다. 처음 만난 낯선 사람에게는 비밀을 술술 털어놓으면서, 정작 가까운 사람에게는 같은 이야기를 숨기기도 한다. 다만 사람들이 불쾌함을 느끼는 데에는 일정한 규칙이 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "하나는 "
          },
          {
            "type": "text",
            "text": "정보의 성격",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. 성, 건강, 돈처럼 은밀한 정보일수록 민감해진다. 다른 하나는 "
          },
          {
            "type": "text",
            "text": "정보가 전달되는 방식",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. 내가 직접 말하는 것(1차 공유)은 괜찮지만, 같은 이야기가 나도 모르는 사이 남을 통해 흘러가는 것(제3자 공유)은 매우 불편하다. 임신 초기의 여성이 친한 동료에게 직접 임신 소식을 전하는 것과, 말하기도 전에 동료가 먼저 \"너 임신했지?\"라고 넘겨짚는 것의 차이를 떠올리면 된다. 후자는 받아들이기 어렵다. 정확히 위의 Target 사건에서 벌어진 일이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "연구진은 이 오프라인 규칙이 디지털 광고에도 그대로 적용되는지 실험했다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "참가자들에게 웹사이트를 둘러보게 한 뒤 똑같은 타깃 광고를 보여주되, 광고 옆에 붙는 설명 문구만 다르게 했다."
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
                    "text": "한 그룹에는 \"이 광고는 "
                  },
                  {
                    "type": "text",
                    "text": "우리 사이트에서 클릭하신 제품",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "에 따라 보여집니다\" (1차 공유),"
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
                    "text": "다른 그룹에는 \"이 광고는 "
                  },
                  {
                    "type": "text",
                    "text": "외부 사이트에서 클릭하신 제품",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "에 따라 보여집니다\"(제3자 공유)라고 알려준 것이다."
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
            "text": "결과는 뚜렷했다. 제3자 공유 그룹에서는 개인화의 가치보다 사생활 우려가 더 크게 나타났고, 제품 구매 의사가 다른 그룹 대비 약 24% 낮았다. 등 뒤에서 내 얘기가 오간다는 느낌이 반감을 만든 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "두 번째 실험도 흥미롭다. 참가자들에게 쇼핑 프로필을 직접 작성하게 한 뒤,"
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
                    "text": "한 그룹에는 \""
                  },
                  {
                    "type": "text",
                    "text": "직접 작성",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": "해주신 정보에 따라 보여지는 광고입니다\","
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
                    "text": "다른 그룹에는 \"우리가 여러분에 대해 "
                  },
                  {
                    "type": "text",
                    "text": "추정한 정보에 따라",
                    "marks": [
                      {
                        "type": "bold"
                      }
                    ]
                  },
                  {
                    "type": "text",
                    "text": " 보여지는 광고입니다\"라고 알렸다."
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
            "text": "광고는 모든 그룹에서 동일했다. 그런데 '추정'이라는 단어를 본 그룹의 구매 의사는 약 17% 낮았다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 실험이 아름다운 지점은, 광고 자체는 한 글자도 바뀌지 않았다는 것이다. 달라진 것은 오직 "
          },
          {
            "type": "text",
            "text": "내 정보가 어떤 경로로 흘러왔는지에 대한 설명",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "뿐이었다. 그런데도 구매 의사가 움직였다. 사람들이 거부하는 것은 개인화된 광고가 아니라, 뒤에서 흘러온 정보와 넘겨짚은 추측이라는 것이다."
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
            "text": "사용자들의 모순 : 개인화-프라이버시 패러독스",
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
            "text": "그렇다면 사용자들은 개인화를 싫어하는 걸까? 아니다. 개인화 자체를 싫어하는게 아닌 것을 모두 알고 있을 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "가끔 사용자들에게 설문조사를 해보면 사람들은 \"개인정보 수집이 싫다\"고 답한다. 그런데 동시에 \"나와 상관없는 광고가 뜨는 것도 싫다\"고 답한다. 개인화된 경험은 원하면서, 그것을 위해 필요한 데이터 제공은 꺼리는 것이다. 학계에서는 이 모순을 "
          },
          {
            "type": "text",
            "text": "개인화-프라이버시 패러독스(Personalization-Privacy Paradox)",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "라고 부른다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자 입장에서 보면 이것은 모순이라기보다 일종의 거래 계산에 가깝다. \"내 정보를 주는 대신 얻는 것이 무엇인가?\"라는 저울질을 매 순간 하고 있는 것이다. 쿠폰이나 편리함이 충분히 크다고 느끼면 정보를 내주고, 아니라고 느끼면 거부한다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "그리고 이 저울이 '감시당하는 느낌' 쪽으로 기울면, 흥미로운 일이 벌어진다. 커뮤니티에는 \"친구랑 대화만 했는데 몇 시간 뒤 그 제품 광고가 떴다, 폰이 도청하는 게 분명하다\"는 글이 심심찮게 올라온다. 지금까지 스마트폰이 대화를 몰래 녹음해 광고에 썼다는 증거는 발견된 적이 없고, 보안 연구자들은 이 현상을 같은 와이파이를 쓰는 가족·지인의 검색 기록, 위치 정보, 나와 비슷한 사람들의 행동을 학습한 협업 필터링 같은 데이터 결합으로 설명한다. 하지만 여기서 중요한 것은 진실이 무엇이냐가 아니다. 개인화가 아무런 설명 없이 너무 정확해지면, 사람들은 실제 원리보다 더 무서운 설명을 스스로 만들어내고 시스템 자체를 불신하기 시작한다는 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이렇게 되어버리면 무서워지는 이유가 있다. 불신은 개별 광고에서 멈추지 않고 서비스 전체로 번진다. 마이크 권한을 끄고, 광고를 차단하고, 앱 자체를 지우는 방향으로 이어지는 것이다. 신뢰를 잃은 개인화는 스스로를 망가뜨린다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "와진짜 개무섭다.. 인스타 음성정보 수집하나봐......"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "나 오늘 아침에 엄마랑 배움카드 그걸로 바리스타 자격증 따볼까?? 이런 얘기 했었거든? 엄마가 따는거라 나는 뭐 그거에 대해 단한번도 찾아본 적도 없고 바리스타 관심도 엊ㅅ었는데 방금 인"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.instiz.net"
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
            "text": "같은 데이터, 다른 반응 : Spotify Wrapped와 넷플릭스 썸네일",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/07.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://me.pcmag.com/en/streaming-music-services/33858/spotify-wrapped-is-here-how-to-see-yours-and-whats-new-for-2025"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "여기까지 읽으면 개인화가 나쁜 것처럼 보인다. 하지만 정반대의 사례도 있다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "매년 12월이 되면 SNS는 스포티파이 연말결산(Wrapped)으로 도배된다. \"올해 내가 가장 많이 들은 아티스트\", \"나는 상위 1% 청취자\" 같은 카드들 말이다. 곰곰이 생각해보면 이것도 Target과 본질적으로 같다. 내 행동 데이터를 수집하고 분석해서 나에 대해 알아낸 결과물이다. 그런데 왜 Target은 부정적이고, Wrapped는 긍정적일까?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "차이는 "
          },
          {
            "type": "text",
            "text": "프레이밍과 주도권",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "에 있다. Wrapped는 \"네가 뭘 들었는지 다 알고 있어\"가 아니라 \"너의 한 해를 정리해서 선물로 줄게\"라는 태도를 취한다. 그리고 그것을 열어볼지, 공유할지는 전적으로 사용자의 선택이다. 데이터가 나를 겨냥한 것이 아니라, 나에게 주어진 것이다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/08.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://qz.com/quartzy/1431884/netflix-denies-its-targeting-users-with-ads-based-on-race"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "반대로 넷플릭스는 같은 개인화로 비판을 받은 적이 있다. 넷플릭스는 같은 작품이라도 사용자마다 다른 썸네일을 보여주는데, 2018년 일부 흑인 사용자들이 \"나에게는 흑인 조연 배우가 크게 나온 썸네일만 보인다. 정작 그 배우는 영화에 10분 남짓 등장하는데\"라고 지적했다. 넷플릭스는 인종 데이터를 수집하지 않으며 시청 기록만 사용한다고 해명했지만, 그 해명이 오히려 인종을 묻지 않아도 알고리즘은 시청 패턴만으로 사실상 인종을 추론해낸 다는 것을 알 수 있게 했다. 취향 맞춤인 줄 알았던 개인화가 사실은 인종 프로파일링처럼 느껴진 것이다. 사용자가 이런 민감한 부분을 알게되는 순간, '배려'는 '차별'로 인식이 바뀐다."
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
            "text": "또, 실패한 개인화들은 무엇이 있을까?",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/09.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://kin.eduwill.net/board/qustnView?qustnIdx=137958"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/10.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://kin.eduwill.net/board/qustnView?qustnIdx=137958"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "실패한 개인화는 거창한 것이라기 보단, 우리 일상에 사소하게 널려있다. 모두 한 번씩 겪어 보았을 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "첫번째, "
          },
          {
            "type": "text",
            "text": "이미 산 물건이 나를 따라다닌다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 노트북을 하나 사면, 그날부터 한 달 내내 모든 사이트에서 노트북 광고가 따라온다. 방금 산 사람에게 같은 물건을 파는 것만큼 무의미한 광고가 있을까. 리타게팅 시스템은 내가 '노트북을 봤다'는 데이터는 갖고 있지만, '이미 샀다'는 맥락은 모른다. 데이터는 많은데 이해는 없는, 반쪽짜리 개인화의 전형이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "두번째, "
          },
          {
            "type": "text",
            "text": "한 번의 검색이 나를 규정해버린다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 친구 선물로 캠핑용품을 한 번 검색했을 뿐인데, 알고리즘은 나를 캠핑족으로 분류하고 텐트와 버너를 끝없이 추천한다. 웃고 넘길 수 있는 수준이면 다행이다. 실제로 2018년, 워싱턴포스트의 에디터 질리언 브로켈은 임신 중 아기를 사산했다. 그런데 SNS는 임신 해시태그와 클릭 기록을 학습한 대로 육아용품 광고를 계속 내보냈고, 그녀가 \"관련 없는 광고\"라고 신고하자 알고리즘은 오히려 '출산을 마쳤구나'라고 판단해 수유브라와 유모차 광고를 보내기 시작했다. 그녀는 \"내 임신을 알아챌 만큼 똑똑한 알고리즘이라면, 내 아기가 죽었다는 것도 알아챌 수 있지 않느냐\"는 공개 편지를 IT 기업들에게 보내 큰 반향을 일으켰다. 사용자의 이해없이 데이터만 사용하는 개인화는 사용자의 상황이 바뀌었다는 것을 모른 채, 과거의 데이터로 현재의 사람을 계속 찌른다."
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/11.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.hani.co.kr/arti/economy/it/671179.html"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/12.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.hani.co.kr/arti/economy/it/671179.html"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "세번째,"
          },
          {
            "type": "text",
            "text": "의도치 않은 추천을 했다.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 2014년 페이스북은 '올해의 회고(Year in Review)'라는 기능을 내놨다. 한 해 동안 가장 반응이 좋았던 사진을 골라 파티 일러스트로 꾸며 \"당신의 한 해는 이랬어요!\"라며 보여주는 기능이었다. 문제는 이 기능이 에릭 마이어에게, 그해 세상을 떠난 여섯 살 딸의 사진을 춤추는 파티 그림으로 감싸서 들이밀었다는 것이다. 그는 이 경험을 '알고리즘의 의도치 않은 잔인함(Inadvertent Algorithmic Cruelty)'이라는 글로 남겼다. 알고리즘에게 '반응이 많았던 사진'은 그저 숫자였지만, 사람에게는 가장 아픈 기억이었다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "이 실패들의 공통점이 보이는가? 시스템이 데이터를 못 모아서가 아니라 "
          },
          {
            "type": "text",
            "text": "데이터 뒤에 있는 사람의 맥락을 읽지 못해서",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "다."
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
            "text": "반대로, 성공한 개인화들",
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
            "text": "그렇다면 잘한 개인화는 무엇이 달랐을까."
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
            "text": "1. "
          },
          {
            "type": "text",
            "text": "Spotify의 Discover Weekly",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/13.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://newsroom.spotify.com/2020-07-09/spotify-users-have-spent-over-2-3-billion-hours-streaming-discover-weekly-playlists-since-2015/"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Spotify의 Discover Weekly",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "는 필터 버블을 일부 해소하였다고 생각된 사례다. 매주 월요일 추천 플레이리스트를 주는데, 내가 늘 듣던 것만 주지 않는다. 익숙한 취향을 기반으로 하되, 나와 취향이 비슷한 다른 사람들이 듣는 '내가 아직 모르는 곡'을 섞는다. \"네가 좋아하는 것\"과 \"네가 좋아하게 될 것\" 사이의 균형. 개인화가 세상을 좁히는 게 아니라 넓히는 방향으로도 설계될 수 있다는 것을 보여주는 기능이다."
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
            "text": "2. 당근마켓",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/14.png",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.ebn.co.kr/news/articleView.html?idxno=1529505"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/15.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://www.ebn.co.kr/news/articleView.html?idxno=1529505"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "당근마켓",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "은 '딱 필요한 만큼만'의 좋은 예다. 위치라는 꽤 민감한 정보를 쓰지만, 사용자가 거부감을 느끼지 않는다. 왜 이 정보가 필요한지(동네 거래니까), 어디까지 쓰는지(동네 인증)가 명확하고, 그 대가로 받는 가치가 즉각적이기 때문이다. \"일단 다 수집하고 나중에 쓸 데를 찾자\"가 아니라, 목적이 먼저 있고 수집이 따라오는 구조다."
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
            "text": "3. 토스 소비 리포트",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/16.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://toss.im/tossfeed/article/toss-user-interview-timeline?srsltid=AfmBOoq6mxGL8bYQkwVmCphRZNOSeke1erl1MpKeJlwFqKvrk_rTi4mD"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/17.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://toss.im/tossfeed/article/toss-user-interview-timeline?srsltid=AfmBOoq6mxGL8bYQkwVmCphRZNOSeke1erl1MpKeJlwFqKvrk_rTi4mD"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "토스의 소비 리포트",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "도 있다. 내 계좌와 카드 내역이라는 가장 민감한 데이터를 다루면서, \"이번 달 지난달보다 12만 원 더 썼어요\" 같은 요약으로 돌려준다. 데이터가 회사의 마케팅 재료로만 쓰이는 게 아니라 나를 위한 정보로 돌아온다고 느끼게 만드는 것. Wrapped와 같은 원리다. 수집한 데이터를 사용자에게 '선물'로 되돌려주는 개인화는 미움받지 않는다."
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
            "text": "2026년 유행한 셋로그는 왜 불편하지 않을까?",
            "marks": [
              {
                "type": "bold"
              }
            ]
          }
        ]
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/18.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://v.daum.net/v/20260505110236129"
        }
      },
      {
        "type": "image",
        "attrs": {
          "src": "/images/is-personalization-good-ux/19.jpg",
          "alt": "개인화는 정말 좋은 UX일까?",
          "title": "https://v.daum.net/v/20260505110236129"
        }
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "여기서 글을 쓰다가 문득 떠오른 서비스가 하나 있다. 요즘 유행하는 셋로그(Setlog)다. 매시간 알림이 오면 지금 눈앞의 장면을 짧게 찍어 올리고, 하루가 끝나면 친구들의 영상과 분할 화면으로 합쳐져 하나의 브이로그가 완성되는 앱이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "가만 생각해보면 이상하다. 사람들은 분명 \"민감한 개인정보 수집이 싫다\"고 했다. 그런데 셋로그에서는 한 시간마다 자기가 어디서 뭘 하는지를 영상으로 찍어서 올린다. 기업이 몰래 수집하는 위치 데이터보다 훨씬 생생하고 사적인 정보를, 자발적으로, 심지어 즐겁게 공유하는 것이다. 사람들은 프라이버시에 신경 쓰지 않는 걸까?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "아니다. 셋로그를 뜯어보면 이 글에서 계속 이야기한 조건들이 전부 들어 있다. "
          },
          {
            "type": "text",
            "text": "누구에게 보여줄지 내가 정한다",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "(내가 초대한 소수의 친구 그룹). "
          },
          {
            "type": "text",
            "text": "무엇을 보여줄지 내가 정한다",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "(카메라 셔터는 내 손에 있다). "
          },
          {
            "type": "text",
            "text": "언제 할지도 내가 정한다",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "(알림 주기를 매시간, 3시간, 끔 중에서 선택할 수 있다). 즉 셋로그에서 정보는 '수집당하는' 것이 아니라 '내가 주는' 것이다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "결국 프라이버시의 본질은 정보를 숨기는 것이 아니라, "
          },
          {
            "type": "text",
            "text": "내 정보의 흐름을 내가 통제하는 것",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. 그래서 사람들은 기업이 몰래 가져간 검색 기록 한 줄에는 소름 돋아 하면서, 친구에게 보여주는 내 집안 영상에는 아무렇지 않을 수 있다. 개인화를 향한 거부감의 정체도 이것이다. 사람들이 거부하는 것은 '나에 대한 정보가 쓰이는 것'이 아니라, '나도 모르는 곳에서, 내 허락 없이 쓰이는 것'이다."
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
            "text": "결론 : 문제는 개인화가 아니라, 주도권이다",
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
            "text": "사례들을 나란히 놓고 보면 하나의 패턴이 보인다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "실패한 개인화의 공통점은 정확도가 낮아서가 아니었다. "
          },
          {
            "type": "text",
            "text": "사용자 모르게, 사용자의 통제 밖에서",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": " 일어났다는 것이다. 성공한 개인화는 반대로 사용자에게 주도권이 있다고 느끼게 해주었다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "요즘의 변화도 이 방향을 향하고 있다. 인스타그램과 틱톡이 '이런 게시물 추천 안 함' 버튼이나 시간순 피드 옵션을 제공하는 것도, 결국 알고리즘의 고삐를 사용자의 손에 쥐여주려는 제스처다."
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
            "text": "UX 디자이너라면 어떤 질문을 해야 할까?",
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
            "text": "예전에는 개인화를 설계한다면 이렇게 물었다."
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
                "text": "\"추천 정확도를 어떻게 높일까?\""
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
            "text": "하지만, 이제는 질문이 조금 달라져야 한다."
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
                "text": "\"사용자는 해당 개인화에 대해서 거부감이 들까?\" \"사용자는 왜 이 추천이 나왔는지 알고 있을까?\" \"사용자는 개인화는 어떻게 사용하고 싶어할까?\""
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
            "text": "개인화는 앞으로 더 많아질 것이다. AI는 우리를 지금보다 훨씬 더 잘 이해하게 될 것이고, 서비스는 점점 더 '나만을 위한 경험'을 제공하려고 할 것이다. 하지만 좋은 UX는 사용자를 대신 결정하는 것이 아니다."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "사용자가 "
          },
          {
            "type": "text",
            "text": "스스로 선택하고 있다고 느끼게 만드는 것",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "이다. 결국 개인화 UX에서 가장 중요한 것은 추천의 정확도가 아니라 "
          },
          {
            "type": "text",
            "text": "사용자가 운전대를 잡고 있다고 느끼는 경험.",
            "marks": [
              {
                "type": "bold"
              }
            ]
          },
          {
            "type": "text",
            "text": "아마 그것이 앞으로의 개인화 UX가 가야 할 방향일 것이다."
          }
        ]
      },
      {
        "type": "horizontalRule"
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "참고 자료",
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
                    "text": "Eli Pariser, 『The Filter Bubble』 (2011) — "
                  },
                  {
                    "type": "text",
                    "text": "https://www.ted.com/talks/eli_pariser_beware_online_filter_bubbles",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.ted.com/talks/eli_pariser_beware_online_filter_bubbles"
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
                    "text": "Charles Duhigg, \"How Companies Learn Your Secrets\", The New York Times Magazine (2012) — "
                  },
                  {
                    "type": "text",
                    "text": "https://www.nytimes.com/2012/02/19/magazine/shopping-habits.html",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.nytimes.com/2012/02/19/magazine/shopping-habits.html"
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
                    "text": "Leslie K. John, Tami Kim, Kate Barasz, \"Ads That Don't Overstep\", Harvard Business Review (2018) "
                  },
                  {
                    "type": "text",
                    "text": "https://hbr.org/2018/01/ads-that-dont-overstep",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://hbr.org/2018/01/ads-that-dont-overstep"
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
                    "text": "Smith, Dinev & Xu, \"Information Privacy Research: An Interdisciplinary Review\", MIS Quarterly (2011)"
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
                    "text": "ScreenCrush, 넷플릭스 개인화 썸네일 논란 (2018) — "
                  },
                  {
                    "type": "text",
                    "text": "https://screencrush.com/netflix-targeting-users-race-personal-thumbnails/",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://screencrush.com/netflix-targeting-users-race-personal-thumbnails/"
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
                    "text": "Quartz, 넷플릭스 공식 해명 보도 (2018) — "
                  },
                  {
                    "type": "text",
                    "text": "https://qz.com/quartzy/1431884/netflix-denies-its-targeting-users-with-ads-based-on-race",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://qz.com/quartzy/1431884/netflix-denies-its-targeting-users-with-ads-based-on-race"
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
                    "text": "Eric Meyer, \"Inadvertent Algorithmic Cruelty\" (2014) — "
                  },
                  {
                    "type": "text",
                    "text": "https://meyerweb.com/eric/thoughts/2014/12/24/inadvertent-algorithmic-cruelty/",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://meyerweb.com/eric/thoughts/2014/12/24/inadvertent-algorithmic-cruelty/"
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
                    "text": "Gillian Brockell, \"Dear tech companies, I don't want to see pregnancy ads after my child was stillborn\", The Washington Post (2018) — "
                  },
                  {
                    "type": "text",
                    "text": "https://www.washingtonpost.com/lifestyle/2018/12/12/dear-tech-companies-i-dont-want-see-pregnancy-ads-after-my-child-was-stillborn/",
                    "marks": [
                      {
                        "type": "link",
                        "attrs": {
                          "href": "https://www.washingtonpost.com/lifestyle/2018/12/12/dear-tech-companies-i-dont-want-see-pregnancy-ads-after-my-child-was-stillborn/"
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
            "text": "Beware online \"filter bubbles\""
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "As web companies strive to tailor their services (including news and search results) to our personal tastes, there's a dangerous unintended consequence: We get trapped in a \"filter bubble\" and don't get exposed to information that could challenge or broade"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "www.ted.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Ads That Don’t Overstep"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Data gathered on the web has vastly enhanced the capabilities of marketers. With people regularly sharing personal details online and internet cookies tracking every click, companies can now gain unprecedented insight into individual consumers and target t"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "hbr.org"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Netflix Denies Targeting Users By Race, But Something’s Up"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "After accusations that Netflix has been targeting black users, we found a few more bizarre differences in Netflix marketing."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "screencrush.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Why are black Netflix viewers seeing ads showing minor black characters from movies?"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Netflix is being called out for seeming to target customers based on race after a Twitter user noticed the site appeared to be generating thumbnails with black cast members on them, even if those characters played minor roles in the actual production."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "qz.com"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Inadvertent Algorithmic Cruelty"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "I didn’t go looking for grief this afternoon, but it found me anyway, and I have designers and programmers to thank for it."
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "meyerweb.com"
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

// type
import { 
  TPaginationModel,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TMathKnowledgeConcept1Model,
} from '@/apis/models/mathModel.type';

const mockKC1List: TPaginationModel<TMathKnowledgeConcept1Model> = {
  "current_page": 1,
  "last_page": 2,
  "page_size": 100,
  "count": 112,
  "previous": null,
  "next": "http://ec2-13-124-240-118.ap-northeast-2.compute.amazonaws.com:8000/cms/api/kcs/?page=2",
  "results": [
    {
      "id": 1,
      "title": "다항식의 덧셈과 뺄셈 2 (수정1)",
      "comment": "참고1",
      "kc2_set": [
        {
          "id": 694,
          "title": "다항식을 오름차순과 내림차순으로 나타내기",
          "comment": "참고1-1"
        },
        {
          "id": 695,
          "title": "다항식의 덧셈의 성질을 이용하여 다항식의 덧셈과 뺄셈 계산하기",
          "comment": null
        }
      ],
      "achievement3_id": 1,
      "achievement3": {
        "id": 1,
        "title": "다항식의 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 1,
          "title": "다항식의 연산",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 2,
      "title": "다항식의 나눗셈",
      "comment": null,
      "kc2_set": [
        {
          "id": 329,
          "title": "다항식의 나눗셈에서 몫과 나머지 알아보기",
          "comment": null
        },
        {
          "id": 330,
          "title": "다항식의 나눗셈 계산하기 - A=BQ+R꼴로 나타내기",
          "comment": null
        }
      ],
      "achievement3_id": 1,
      "achievement3": {
        "id": 1,
        "title": "다항식의 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 1,
          "title": "다항식의 연산",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 3,
      "title": "항등식과 미정계수",
      "comment": null,
      "kc2_set": [
        {
          "id": 331,
          "title": "항등식의 미정계수 구하기 - 계수비교법",
          "comment": null
        },
        {
          "id": 332,
          "title": "항등식의 미정계수 구하기 - 수치대입법",
          "comment": null
        },
        {
          "id": 333,
          "title": "항등식에서 계수의 합 구하기",
          "comment": null
        },
        {
          "id": 334,
          "title": "다항식의 나눗셈과 항등식 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 2,
      "achievement3": {
        "id": 2,
        "title": "항등식의 성질을 이해한다.",
        "achievement2": {
          "id": 2,
          "title": "나머지정리",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 4,
      "title": "나머지정리",
      "comment": null,
      "kc2_set": [
        {
          "id": 335,
          "title": "나머지정리 이용하여 계산하기 - 미정계수 구하기",
          "comment": null
        },
        {
          "id": 336,
          "title": "나머지정리 이용하여 계산하기 - 이차 이상의 식으로 나누었을 때",
          "comment": null
        },
        {
          "id": 337,
          "title": "나머지정리 이용하여 계산하기 - 몫을 x-a로 나누었을 때",
          "comment": null
        },
        {
          "id": 338,
          "title": "나머지정리 이용하여 계산하기 - P(ax+b)를 x-α로 나누었을 때",
          "comment": null
        }
      ],
      "achievement3_id": 3,
      "achievement3": {
        "id": 3,
        "title": "나머지정리의 의미를 이해하고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 2,
          "title": "나머지정리",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 5,
      "title": "인수정리",
      "comment": null,
      "kc2_set": [
        {
          "id": 339,
          "title": "인수정리 알아보기 - 일차식으로 나누었을 때",
          "comment": null
        },
        {
          "id": 550,
          "title": "인수정리 활용하기",
          "comment": null
        },
        {
          "id": 598,
          "title": "인수정리 알아보기 - 이차식으로 나누었을 때",
          "comment": null
        }
      ],
      "achievement3_id": 3,
      "achievement3": {
        "id": 3,
        "title": "나머지정리의 의미를 이해하고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 2,
          "title": "나머지정리",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 6,
      "title": "조립제법",
      "comment": null,
      "kc2_set": [
        {
          "id": 340,
          "title": "조립제법 알아보기",
          "comment": null
        },
        {
          "id": 551,
          "title": "조립제법 이용하여 항등식의 미정계수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 3,
      "achievement3": {
        "id": 3,
        "title": "나머지정리의 의미를 이해하고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 2,
          "title": "나머지정리",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 7,
      "title": "다항식의 인수분해",
      "comment": null,
      "kc2_set": [
        {
          "id": 341,
          "title": "인수분해 공식을 이용하여 다항식 인수분해하기",
          "comment": null
        },
        {
          "id": 342,
          "title": "공통부분이 있는 다항식 인수분해하기",
          "comment": null
        },
        {
          "id": 343,
          "title": "문자가 여러 개인 다항식 인수분해하기",
          "comment": null
        },
        {
          "id": 345,
          "title": "인수정리를 이용한 다항식 인수분해하기",
          "comment": null
        }
      ],
      "achievement3_id": 4,
      "achievement3": {
        "id": 4,
        "title": "다항식의 인수분해를 할 수 있다.",
        "achievement2": {
          "id": 3,
          "title": "인수분해",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 8,
      "title": "인수분해의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 344,
          "title": "인수분해를 활용한 문제 풀이 - 삼각형 모양 판단",
          "comment": null
        },
        {
          "id": 552,
          "title": "인수분해를 활용한 문제 풀이 - 복잡한 수의 계산",
          "comment": null
        }
      ],
      "achievement3_id": 4,
      "achievement3": {
        "id": 4,
        "title": "다항식의 인수분해를 할 수 있다.",
        "achievement2": {
          "id": 3,
          "title": "인수분해",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 9,
      "title": "복소수",
      "comment": null,
      "kc2_set": [
        {
          "id": 346,
          "title": "복소수의 뜻과 분류 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 5,
      "achievement3": {
        "id": 5,
        "title": "복소수의 뜻과 성질을 이해하고 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 10,
      "title": "복소수와 식의 값",
      "comment": null,
      "kc2_set": [
        {
          "id": 347,
          "title": "복소수가 서로 같을 조건 구하기",
          "comment": null
        },
        {
          "id": 348,
          "title": "복소수 z가 실수 또는 순허수가 되는 조건 구하기",
          "comment": null
        },
        {
          "id": 350,
          "title": "복소수가 주어질 때 식의 값 구하기",
          "comment": null
        },
        {
          "id": 352,
          "title": "복소수 z²이 실수가 되는 조건 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 5,
      "achievement3": {
        "id": 5,
        "title": "복소수의 뜻과 성질을 이해하고 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 11,
      "title": "복소수의 사칙연산",
      "comment": null,
      "kc2_set": [
        {
          "id": 349,
          "title": "복소수의 곱셈과 나눗셈 계산하기",
          "comment": null
        }
      ],
      "achievement3_id": 5,
      "achievement3": {
        "id": 5,
        "title": "복소수의 뜻과 성질을 이해하고 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 12,
      "title": "켤레복소수",
      "comment": null,
      "kc2_set": [
        {
          "id": 351,
          "title": "켤레복소수의 성질을 이용하여 계산하기",
          "comment": null
        },
        {
          "id": 353,
          "title": "조건을 만족시키는 복소수 구하기",
          "comment": null
        },
        {
          "id": 554,
          "title": "켤레복소수의 성질 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 5,
      "achievement3": {
        "id": 5,
        "title": "복소수의 뜻과 성질을 이해하고 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 13,
      "title": "이차방정식의 풀이",
      "comment": null,
      "kc2_set": [
        {
          "id": 354,
          "title": "절댓값 기호를 포함한 이차방정식의 풀이",
          "comment": null
        },
        {
          "id": 355,
          "title": "이차방정식의 풀이 알아보기",
          "comment": null
        },
        {
          "id": 356,
          "title": "한 근이 주어진 이차방정식의 풀이",
          "comment": null
        },
        {
          "id": 357,
          "title": "허근을 갖는 이차방정식의 풀이 알아보기",
          "comment": null
        },
        {
          "id": 561,
          "title": "가우스 기호를 포함한 방정식의 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 6,
      "achievement3": {
        "id": 6,
        "title": "이차방정식의 실근과 허근의 뜻을 안다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 14,
      "title": "이차방정식의 근의 판별",
      "comment": null,
      "kc2_set": [
        {
          "id": 358,
          "title": "이차방정식이 실근을 가질 조건 알아보기",
          "comment": null
        },
        {
          "id": 359,
          "title": "이차방정식이 중근을 가질 조건 알아보기",
          "comment": null
        },
        {
          "id": 557,
          "title": "이차방정식이 허근을 가질 조건 알아보기",
          "comment": null
        },
        {
          "id": 599,
          "title": "이차방정식이 완전제곱식이 될 조건 알아보기",
          "comment": null
        },
        {
          "id": 600,
          "title": "이차방정식의 판별식을 이용하여 삼각형의 모양 판단하기",
          "comment": null
        }
      ],
      "achievement3_id": 7,
      "achievement3": {
        "id": 7,
        "title": "이차방정식에서 판별식의 의미를 이해하고 이를 설명할 수 있다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 15,
      "title": "이차방정식과 근과 계수의 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 360,
          "title": "근과 계수의 관계를 이용하여 식의 값 구하기",
          "comment": null
        },
        {
          "id": 361,
          "title": "근과 계수의 관계를 이용하여 미정계수 구하기 - 두 근의 관계식이 주어졌을 때",
          "comment": null
        },
        {
          "id": 362,
          "title": "근과 계수의 관계를 이용하여 미정계수 구하기 - 두 근의 조건이 주어졌을 때",
          "comment": null
        },
        {
          "id": 363,
          "title": "근과 계수의 관계를 이용하여 미정계수 구하기 - 두 이차방정식이 주어졌을 때",
          "comment": null
        },
        {
          "id": 364,
          "title": "근과 계수를 바탕으로 이차방정식 구하기",
          "comment": null
        },
        {
          "id": 365,
          "title": "근의 공식을 이용하여 이차식 인수분해하기",
          "comment": null
        },
        {
          "id": 555,
          "title": "잘못 보고 푼 이차방정식 바르게 풀기",
          "comment": null
        }
      ],
      "achievement3_id": 8,
      "achievement3": {
        "id": 8,
        "title": "이차방정식의 근과 계수의 관계를 이해한다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 16,
      "title": "이차방정식의 켤레근",
      "comment": null,
      "kc2_set": [
        {
          "id": 366,
          "title": "이차방정식의 켤레근 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 8,
      "achievement3": {
        "id": 8,
        "title": "이차방정식의 근과 계수의 관계를 이해한다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 17,
      "title": "일차함수의 식 구하기",
      "comment": null,
      "kc2_set": [
        {
          "id": 367,
          "title": "서로 다른 두 점이 주어질 때, 일차함수의 식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 9,
      "achievement3": {
        "id": 9,
        "title": "일차함수의 그래프의 성질을 이해하고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 5,
          "title": "일차함수와 그래프",
          "achievement1": {
            "id": 2,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 18,
      "title": "일차함수와 일차방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 368,
          "title": "일차방정식 ax+by+c=0의 그래프 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 10,
      "achievement3": {
        "id": 10,
        "title": "일차함수와 미지수가 2개인 일차방정식의 관계를 이해한다.",
        "achievement2": {
          "id": 6,
          "title": "일차함수와 일차방정식의 관계",
          "achievement1": {
            "id": 2,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 19,
      "title": "이차함수 y=a(x-p)²+q의 그래프",
      "comment": null,
      "kc2_set": [
        {
          "id": 369,
          "title": "이차함수 y=a(x-p)²+q의 그래프에서 a, p, q의 부호 구하기",
          "comment": null
        },
        {
          "id": 560,
          "title": "이차함수 y=ax²+q의 그래프 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 11,
      "achievement3": {
        "id": 11,
        "title": "이차함수의 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 7,
          "title": "이차함수와 그래프",
          "achievement1": {
            "id": 2,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 20,
      "title": "이차함수 y=ax²+bx+c의 그래프",
      "comment": null,
      "kc2_set": [
        {
          "id": 370,
          "title": "이차함수 y=ax²+bx+c의 그래프와 축의 교점 구하기",
          "comment": null
        },
        {
          "id": 373,
          "title": "이차함수 y=ax²+bx+c의 그래프에서 a, b, c의 부호 구하기",
          "comment": null
        },
        {
          "id": 564,
          "title": "이차함수 y=ax²+bx+c의 그래프의 꼭짓점의 좌표와 축의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 11,
      "achievement3": {
        "id": 11,
        "title": "이차함수의 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 7,
          "title": "이차함수와 그래프",
          "achievement1": {
            "id": 2,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 21,
      "title": "이차함수의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 371,
          "title": "서로 다른 세 점을 알 때, 이차함수의 식 구하기",
          "comment": null
        },
        {
          "id": 372,
          "title": "x축과의 두 교점과 다른 한 점을 알 때, 이차함수의 식 구하기",
          "comment": null
        },
        {
          "id": 383,
          "title": "실생활에서 이차함수의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 384,
          "title": "도형에서 이차함수의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 562,
          "title": "꼭짓점과 다른 한 점을 알 때, 이차함수의 식 구하기",
          "comment": null
        },
        {
          "id": 563,
          "title": "축의 방정식과 서로 다른 두 점을 알 때, 이차함수의 식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 11,
      "achievement3": {
        "id": 11,
        "title": "이차함수의 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 7,
          "title": "이차함수와 그래프",
          "achievement1": {
            "id": 2,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 22,
      "title": "이차함수의 그래프와 직선의 위치 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 374,
          "title": "이차함수의 그래프와 x축의 위치 관계 알아보기",
          "comment": null
        },
        {
          "id": 376,
          "title": "이차함수의 그래프와 직선의 위치 관계 알아보기",
          "comment": null
        },
        {
          "id": 377,
          "title": "이차함수의 그래프에 접하는 직선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 378,
          "title": "이차함수의 그래프와 직선의 교점 구하기",
          "comment": null
        },
        {
          "id": 565,
          "title": "두 이차함수의 그래프의 교점 구하기",
          "comment": null
        },
        {
          "id": 638,
          "title": "절댓값 기호를 포함한 이차방정식과 이차함수의 그래프의 관계 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 12,
      "achievement3": {
        "id": 12,
        "title": "이차함수의 그래프와 직선의 위치 관계를 이해한다.",
        "achievement2": {
          "id": 8,
          "title": "이차방정식과 이차함수",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 23,
      "title": "이차방정식과 이차함수의 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 375,
          "title": "이차함수의 그래프와 x축의 두 교점 사이의 거리 구하기",
          "comment": null
        },
        {
          "id": 567,
          "title": "이차함수의 그래프와 x축의 교점 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 13,
      "achievement3": {
        "id": 13,
        "title": "이차방정식과 이차함수의 관계를 이해한다.",
        "achievement2": {
          "id": 8,
          "title": "이차방정식과 이차함수",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 24,
      "title": "이차함수의 최대 · 최소",
      "comment": null,
      "kc2_set": [
        {
          "id": 379,
          "title": "최댓값 또는 최솟값이 주어질 때 미지수의 값 구하기",
          "comment": null
        },
        {
          "id": 380,
          "title": "제한된 범위에서 이차함수의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 381,
          "title": "조건을 만족시키는 이차식의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 382,
          "title": "공통부분이 있는 함수의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 566,
          "title": "이차함수의 최댓값과 최솟값 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 14,
      "achievement3": {
        "id": 14,
        "title": "이차함수의 최대, 최소를 이해하고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 8,
          "title": "이차방정식과 이차함수",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 25,
      "title": "삼차방정식과 사차방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 385,
          "title": "근이 주어진 삼차방정식과 사차방정식의 풀이",
          "comment": null
        },
        {
          "id": 387,
          "title": "삼차방정식의 근 판별하기",
          "comment": null
        },
        {
          "id": 568,
          "title": "사차방정식의 풀이",
          "comment": null
        },
        {
          "id": 571,
          "title": "근의 조건이 주어진 삼차방정식과 사차방정식의 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 15,
      "achievement3": {
        "id": 15,
        "title": "간단한 삼차방정식과 사차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 26,
      "title": "연립이차방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 386,
          "title": "공통근을 갖는 방정식의 풀이",
          "comment": null
        },
        {
          "id": 393,
          "title": "두 이차방정식으로 이루어진 연립이차방정식의 풀이",
          "comment": null
        },
        {
          "id": 394,
          "title": "연립이차방정식의 해의 조건 구하기",
          "comment": null
        },
        {
          "id": 395,
          "title": "일차방정식과 이차방정식으로 이루어진 연립이차방정식의 풀이",
          "comment": null
        },
        {
          "id": 639,
          "title": "연립방정식 활용하기",
          "comment": null
        }
      ],
      "achievement3_id": 16,
      "achievement3": {
        "id": 16,
        "title": "미지수가 2개인 연립이차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 27,
      "title": "삼차방정식의 근과 계수의 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 388,
          "title": "삼차방정식의 근과 계수의 관계 알아보기",
          "comment": null
        },
        {
          "id": 569,
          "title": "삼차방정식과 사차방정식의 켤레근 구하기",
          "comment": null
        },
        {
          "id": 570,
          "title": "삼차방정식의 근의 역수와 계수의 관계 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 15,
      "achievement3": {
        "id": 15,
        "title": "간단한 삼차방정식과 사차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 28,
      "title": "방정식 x³=1, x³=-1의 허근의 성질",
      "comment": null,
      "kc2_set": [
        {
          "id": 389,
          "title": "방정식 x³=1, x³=-1의 허근의 성질 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 15,
      "achievement3": {
        "id": 15,
        "title": "간단한 삼차방정식과 사차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 29,
      "title": "삼차방정식과 사차방정식의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 390,
          "title": "삼차방정식, 사차방정식을 활용하여 도형, 실생활 문제 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 15,
      "achievement3": {
        "id": 15,
        "title": "간단한 삼차방정식과 사차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 30,
      "title": "연립방정식의 풀이의 응용",
      "comment": null,
      "kc2_set": [
        {
          "id": 391,
          "title": "연립방정식의 해가 주어질 때 미지수 구하기",
          "comment": null
        },
        {
          "id": 392,
          "title": "해에 대한 조건이 주어진 경우 미지수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 17,
      "achievement3": {
        "id": 17,
        "title": "미지수가 2개인 연립일차방정식을 풀 수 있고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 10,
          "title": "일차부등식과 연립일차방정식",
          "achievement1": {
            "id": 3,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 31,
      "title": "부정방정식의 풀이",
      "comment": null,
      "kc2_set": [
        {
          "id": 396,
          "title": "실수 조건의 부정방정식의 풀이",
          "comment": null
        },
        {
          "id": 397,
          "title": "정수 조건의 부정방정식의 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 16,
      "achievement3": {
        "id": 16,
        "title": "미지수가 2개인 연립이차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 32,
      "title": "연립일차부등식의 풀이",
      "comment": null,
      "kc2_set": [
        {
          "id": 398,
          "title": "연립일차부등식의 풀이",
          "comment": null
        },
        {
          "id": 399,
          "title": "A<B<C꼴의 부등식의 풀이",
          "comment": null
        },
        {
          "id": 574,
          "title": "연립일차부등식의 해가 주어진 경우 미지수 구하기",
          "comment": null
        },
        {
          "id": 580,
          "title": "연립일차부등식 활용하기",
          "comment": null
        },
        {
          "id": 640,
          "title": "정수인 해의 개수가 주어진 연립일차부등식의 풀이",
          "comment": null
        },
        {
          "id": 649,
          "title": "연립일차부등식이 해를 갖거나 갖지 않는 경우 미지수의 값 또는 범위 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 18,
      "achievement3": {
        "id": 18,
        "title": "미지수가 1개인 연립일차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 33,
      "title": "절댓값 기호를 포함한 부등식의 풀이",
      "comment": null,
      "kc2_set": [
        {
          "id": 400,
          "title": "절댓값 기호가 두 개인 부등식 풀이",
          "comment": null
        },
        {
          "id": 575,
          "title": "부등식 |ax+b|<|cx+d| 풀이",
          "comment": null
        },
        {
          "id": 576,
          "title": "부등식 |ax+b|<c 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 19,
      "achievement3": {
        "id": 19,
        "title": "절댓값을 포함한 일차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 34,
      "title": "이차부등식의 작성",
      "comment": null,
      "kc2_set": [
        {
          "id": 401,
          "title": "해가 주어진 이차부등식의 풀이",
          "comment": null
        },
        {
          "id": 579,
          "title": "부등식 f(x)<0과 부등식 f(ax+b)<0의 관계 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 20,
      "achievement3": {
        "id": 20,
        "title": "이차부등식과 이차함수의 관계를 이해하고, 이차부등식과 연립이차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 35,
      "title": "연립이차부등식의 풀이",
      "comment": null,
      "kc2_set": [
        {
          "id": 402,
          "title": "연립이차부등식의 풀이",
          "comment": null
        },
        {
          "id": 403,
          "title": "해가 주어진 연립이차부등식의 풀이",
          "comment": null
        },
        {
          "id": 404,
          "title": "정수인 해의 조건이 주어진 연립이차부등식의 풀이",
          "comment": null
        },
        {
          "id": 407,
          "title": "연립이차부등식 활용하기",
          "comment": null
        }
      ],
      "achievement3_id": 20,
      "achievement3": {
        "id": 20,
        "title": "이차부등식과 이차함수의 관계를 이해하고, 이차부등식과 연립이차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 36,
      "title": "이차부등식 해의 조건",
      "comment": null,
      "kc2_set": [
        {
          "id": 405,
          "title": "이차부등식이 항상 성립할 조건 알아보기",
          "comment": null
        },
        {
          "id": 406,
          "title": "이차부등식이 해를 갖지 않을 조건 알아보기",
          "comment": null
        },
        {
          "id": 641,
          "title": "제한된 범위에서 이차부등식이 항상 성립할 조건 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 20,
      "achievement3": {
        "id": 20,
        "title": "이차부등식과 이차함수의 관계를 이해하고, 이차부등식과 연립이차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 37,
      "title": "두 함수의 그래프와 이차부등식의 해",
      "comment": null,
      "kc2_set": [
        {
          "id": 408,
          "title": "만나는 두 그래프의 위치 관계와 이차부등식 구하기",
          "comment": null
        },
        {
          "id": 409,
          "title": "만나지 않는 두 그래프의 위치 관계와 이차부등식 알아보기",
          "comment": null
        },
        {
          "id": 581,
          "title": "이차부등식 활용하기",
          "comment": null
        }
      ],
      "achievement3_id": 20,
      "achievement3": {
        "id": 20,
        "title": "이차부등식과 이차함수의 관계를 이해하고, 이차부등식과 연립이차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 38,
      "title": "이차부등식과 이차방정식의 실근의 조건",
      "comment": null,
      "kc2_set": [
        {
          "id": 410,
          "title": "이차방정식의 근의 위치 찾기",
          "comment": null
        },
        {
          "id": 642,
          "title": "이차방정식의 실근의 부호 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 20,
      "achievement3": {
        "id": 20,
        "title": "이차부등식과 이차함수의 관계를 이해하고, 이차부등식과 연립이차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 39,
      "title": "두 점 사이의 거리",
      "comment": null,
      "kc2_set": [
        {
          "id": 411,
          "title": "두 점 사이의 거리 구하기",
          "comment": null
        },
        {
          "id": 412,
          "title": "같은 거리에 있는 점 구하기",
          "comment": null
        },
        {
          "id": 582,
          "title": "삼각형의 외심을 이용한 점 사이의 거리 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 21,
      "achievement3": {
        "id": 21,
        "title": "두 점 사이의 거리를 구할 수 있다.",
        "achievement2": {
          "id": 11,
          "title": "평면좌표",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 40,
      "title": "두 점 사이의 거리의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 413,
          "title": "두 점 사이의 거리 활용하기 -삼각형의 모양 판정",
          "comment": null
        },
        {
          "id": 414,
          "title": "두 점 사이의 거리 활용하기 -선분의 길이의 제곱의 합의 최솟값",
          "comment": null
        },
        {
          "id": 583,
          "title": "좌표를 이용한 도형의 성질 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 21,
      "achievement3": {
        "id": 21,
        "title": "두 점 사이의 거리를 구할 수 있다.",
        "achievement2": {
          "id": 11,
          "title": "평면좌표",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 41,
      "title": "선분의 내분점과 외분점",
      "comment": null,
      "kc2_set": [
        {
          "id": 415,
          "title": "수직선 위의 선분의 내분점과 외분점 구하기",
          "comment": null
        },
        {
          "id": 416,
          "title": "좌표평면 위의 선분의 내분점과 외분점 구하기",
          "comment": null
        },
        {
          "id": 418,
          "title": "등식을 만족시키는 점 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 22,
      "achievement3": {
        "id": 22,
        "title": "선분의 내분과 외분을 이해하고, 내분점과 외분점의 좌표를 구할 수 있다.",
        "achievement2": {
          "id": 11,
          "title": "평면좌표",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 42,
      "title": "도형에서 선분의 내분점과 외분점의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 417,
          "title": "삼각형의 무게중심의 좌표 구하기",
          "comment": null
        },
        {
          "id": 587,
          "title": "내분점 혹은 외분점이 나타내는 도형의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 22,
      "achievement3": {
        "id": 22,
        "title": "선분의 내분과 외분을 이해하고, 내분점과 외분점의 좌표를 구할 수 있다.",
        "achievement2": {
          "id": 11,
          "title": "평면좌표",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 43,
      "title": "직선의 방정식 구하기",
      "comment": null,
      "kc2_set": [
        {
          "id": 419,
          "title": "한 점과 기울기가 주어진 직선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 420,
          "title": "두 점을 지나는 직선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 421,
          "title": "x절편과 y절편이 주어진 직선의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 23,
      "achievement3": {
        "id": 23,
        "title": "직선의 방정식을 구할 수 있다.",
        "achievement2": {
          "id": 12,
          "title": "직선의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 44,
      "title": "다양한 직선의 방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 422,
          "title": "직선에서 세 점이 한 직선 위에 있을 조건 알아보기",
          "comment": null
        },
        {
          "id": 423,
          "title": "도형의 넓이를 등분하는 직선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 424,
          "title": "직선 ax+by+c=0의 개형 알아보기",
          "comment": null
        },
        {
          "id": 425,
          "title": "정점을 지나는 직선의 방정식 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 23,
      "achievement3": {
        "id": 23,
        "title": "직선의 방정식을 구할 수 있다.",
        "achievement2": {
          "id": 12,
          "title": "직선의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 45,
      "title": "직선의 위치 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 426,
          "title": "두 직선의 교점을 지나는 직선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 427,
          "title": "평행한 직선과 수직인 직선 활용하기",
          "comment": null
        },
        {
          "id": 428,
          "title": "두 직선의 위치 관계 알아보기",
          "comment": null
        },
        {
          "id": 429,
          "title": "수직이등분선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 430,
          "title": "세 직선의 위치 관계 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 24,
      "achievement3": {
        "id": 24,
        "title": "두 직선의 평행 조건과 수직 조건을 이해한다.",
        "achievement2": {
          "id": 12,
          "title": "직선의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 46,
      "title": "점과 직선 사이의 거리",
      "comment": null,
      "kc2_set": [
        {
          "id": 431,
          "title": "점과 직선 사이의 거리 구하기",
          "comment": null
        },
        {
          "id": 432,
          "title": "평행한 두 직선 사이의 거리 구하기",
          "comment": null
        },
        {
          "id": 433,
          "title": "점과 직선 사이의 거리의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 586,
          "title": "도형에서 점과 직선 사이의 거리 활용하기",
          "comment": null
        }
      ],
      "achievement3_id": 25,
      "achievement3": {
        "id": 25,
        "title": "점과 직선 사이의 거리를 구할 수 있다.",
        "achievement2": {
          "id": 12,
          "title": "직선의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 47,
      "title": "원의 방정식 ",
      "comment": null,
      "kc2_set": [
        {
          "id": 434,
          "title": "중심의 좌표가 주어진 원의 방정식 구하기",
          "comment": null
        },
        {
          "id": 435,
          "title": "중심이 직선 위에 있는 원의 방정식 구하기",
          "comment": null
        },
        {
          "id": 436,
          "title": "지름의 양 끝점이 주어진 원의 방정식 구하기",
          "comment": null
        },
        {
          "id": 437,
          "title": "원의 방정식이 되기 위한 조건 알아보기",
          "comment": null
        },
        {
          "id": 438,
          "title": "방정식 x²+y²+Ax+By+C=0이 나타내는 도형 구하기",
          "comment": null
        },
        {
          "id": 439,
          "title": "원점이 아닌 세 점을 지나는 원의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 26,
      "achievement3": {
        "id": 26,
        "title": "원의 방정식을 구할 수 있다.",
        "achievement2": {
          "id": 13,
          "title": "원의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 48,
      "title": "축에 접하는 원의 방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 440,
          "title": "x축 또는 y축에 접하는 원의 방정식 구하기",
          "comment": null
        },
        {
          "id": 441,
          "title": "x축, y축에 동시에 접하는 원의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 26,
      "achievement3": {
        "id": 26,
        "title": "원의 방정식을 구할 수 있다.",
        "achievement2": {
          "id": 13,
          "title": "원의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 49,
      "title": "원의 방정식의 응용",
      "comment": null,
      "kc2_set": [
        {
          "id": 442,
          "title": "조건을 만족시키는 점이 나타내는 도형의 방정식 구하기",
          "comment": null
        },
        {
          "id": 588,
          "title": "원 밖의 한 점에서 원에 이르는 거리의 최대 · 최소 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 26,
      "achievement3": {
        "id": 26,
        "title": "원의 방정식을 구할 수 있다.",
        "achievement2": {
          "id": 13,
          "title": "원의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 50,
      "title": "원과 직선의 위치 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 443,
          "title": "원과 직선의 위치 관계 구하기 - 원과 직선이 서로 다른 두 점에서 만나는 조건 구하기",
          "comment": null
        },
        {
          "id": 444,
          "title": "원과 직선의 위치 관계 구하기 - 현의 길이 구하기",
          "comment": null
        },
        {
          "id": 445,
          "title": "원과 직선의 위치 관계 구하기 - 원과 직선이 접하는 조건 구하기",
          "comment": null
        },
        {
          "id": 446,
          "title": "원과 직선의 위치 관계 구하기 - 원과 직선이 만나지 않을 조건 구하기",
          "comment": null
        },
        {
          "id": 450,
          "title": "원 위의 점과 직선 사이의 거리의 최대 · 최소 구하기",
          "comment": null
        },
        {
          "id": 592,
          "title": "두 원의 위치 관계 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 27,
      "achievement3": {
        "id": 27,
        "title": "좌표평면에서 원과 직선의 위치 관계를 이해한다.",
        "achievement2": {
          "id": 13,
          "title": "원의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 51,
      "title": "원의 접선의 방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 447,
          "title": "원 위의 점에서의 접선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 448,
          "title": "원 밖의 한 점에서 원에 그은 접선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 449,
          "title": "원에 그은 접선의 길이 구하기",
          "comment": null
        },
        {
          "id": 589,
          "title": "기울기가 주어진 원의 접선의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 27,
      "achievement3": {
        "id": 27,
        "title": "좌표평면에서 원과 직선의 위치 관계를 이해한다.",
        "achievement2": {
          "id": 13,
          "title": "원의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 52,
      "title": "점과 도형의 평행이동",
      "comment": null,
      "kc2_set": [
        {
          "id": 451,
          "title": "직선의 평행이동 알아보기",
          "comment": null
        },
        {
          "id": 452,
          "title": "포물선과 원의 평행이동 알아보기",
          "comment": null
        },
        {
          "id": 597,
          "title": "점의 평행이동 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 28,
      "achievement3": {
        "id": 28,
        "title": "평행이동의 의미를 이해한다.",
        "achievement2": {
          "id": 14,
          "title": "평면도형의 이동",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 53,
      "title": "점과 도형의 대칭이동",
      "comment": null,
      "kc2_set": [
        {
          "id": 453,
          "title": "점의 대칭이동 알아보기",
          "comment": null
        },
        {
          "id": 455,
          "title": "직선의 대칭이동 알아보기",
          "comment": null
        },
        {
          "id": 456,
          "title": "포물선과 원의 대칭이동 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 29,
      "achievement3": {
        "id": 29,
        "title": "원점, x축, y축, 직선 y=x에 대한 대칭이동의 의미를 이해한다.",
        "achievement2": {
          "id": 14,
          "title": "평면도형의 이동",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 54,
      "title": "점과 도형의 대칭이동의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 454,
          "title": "대칭이동을 이용한 거리의 최솟값 구하기",
          "comment": null
        },
        {
          "id": 593,
          "title": "점에 대한 대칭이동 알아보기",
          "comment": null
        },
        {
          "id": 594,
          "title": "직선에 대한 대칭이동 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 29,
      "achievement3": {
        "id": 29,
        "title": "원점, x축, y축, 직선 y=x에 대한 대칭이동의 의미를 이해한다.",
        "achievement2": {
          "id": 14,
          "title": "평면도형의 이동",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 55,
      "title": "점과 도형의 평행이동과 대칭이동",
      "comment": null,
      "kc2_set": [
        {
          "id": 457,
          "title": "평행이동과 대칭이동한 점의 좌표 구하기",
          "comment": null
        },
        {
          "id": 458,
          "title": "평행이동과 대칭이동한 직선의 방정식 구하기",
          "comment": null
        },
        {
          "id": 595,
          "title": "평행이동과 대칭이동한 도형 f(x, y)=0의 방정식, 그래프 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 29,
      "achievement3": {
        "id": 29,
        "title": "원점, x축, y축, 직선 y=x에 대한 대칭이동의 의미를 이해한다.",
        "achievement2": {
          "id": 14,
          "title": "평면도형의 이동",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 56,
      "title": "집합의 표현과 분류",
      "comment": null,
      "kc2_set": [
        {
          "id": 459,
          "title": "집합의 표현 방법 알아보기 - 원소나열법, 조건제시법, 벤다이어그램",
          "comment": null
        },
        {
          "id": 460,
          "title": "집합의 분류 알아보기 - 유한집합, 무한집합, 공집합",
          "comment": null
        },
        {
          "id": 602,
          "title": "유한집합의 원소의 개수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 30,
      "achievement3": {
        "id": 30,
        "title": "집합의 개념을 이해하고, 집합을 표현할 수 있다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 57,
      "title": "집합 사이의 포함 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 461,
          "title": "집합 사이의 포함 관계 나타내기",
          "comment": null
        },
        {
          "id": 462,
          "title": "부분집합 구하기",
          "comment": null
        },
        {
          "id": 464,
          "title": "서로 같은 집합의 조건 알아보기",
          "comment": null
        },
        {
          "id": 465,
          "title": "집합 사이의 포함 관계를 이용하여 상수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 31,
      "achievement3": {
        "id": 31,
        "title": "두 집합 사이의 포함 관계를 이해한다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 58,
      "title": "부분집합의 개수",
      "comment": null,
      "kc2_set": [
        {
          "id": 463,
          "title": "부분집합의 개수 구하기",
          "comment": null
        },
        {
          "id": 466,
          "title": "특정 원소를 포함하는 부분집합의 개수 구하기",
          "comment": null
        },
        {
          "id": 467,
          "title": "특정한 원소를 갖거나 갖지 않는 부분집합의 개수 구하기",
          "comment": null
        },
        {
          "id": 468,
          "title": "A⊂X⊂B를 만족시키는 집합 X의 개수 구하기",
          "comment": null
        },
        {
          "id": 606,
          "title": "조건을 만족시키는 집합 구하기",
          "comment": null
        },
        {
          "id": 608,
          "title": "부분집합의 원소의 합과 곱 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 31,
      "achievement3": {
        "id": 31,
        "title": "두 집합 사이의 포함 관계를 이해한다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 59,
      "title": "집합의 연산",
      "comment": null,
      "kc2_set": [
        {
          "id": 469,
          "title": "합집합과 교집합 알아보기",
          "comment": null
        },
        {
          "id": 470,
          "title": "여집합과 차집합 알아보기",
          "comment": null
        },
        {
          "id": 471,
          "title": "서로소인 두 집합 알아보기",
          "comment": null
        },
        {
          "id": 475,
          "title": "집합의 연산을 이용하여 미지수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 32,
      "achievement3": {
        "id": 32,
        "title": "집합의 연산을 할 수 있다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 60,
      "title": "집합의 연산 법칙",
      "comment": null,
      "kc2_set": [
        {
          "id": 472,
          "title": "집합의 연산의 성질 알아보기- 포함 관계가 있는 경우",
          "comment": null
        },
        {
          "id": 473,
          "title": "벤다이어그램과 집합의 연산 구하기",
          "comment": null
        },
        {
          "id": 474,
          "title": "집합의 연산의 성질 알아보기",
          "comment": null
        },
        {
          "id": 477,
          "title": "드모르간의 법칙 알아보기",
          "comment": null
        },
        {
          "id": 478,
          "title": "같은 집합 구하기",
          "comment": null
        },
        {
          "id": 603,
          "title": "주어진 조건을 만족시키는 부분집합의 개수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 32,
      "achievement3": {
        "id": 32,
        "title": "집합의 연산을 할 수 있다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 61,
      "title": "집합의 연산의 응용",
      "comment": null,
      "kc2_set": [
        {
          "id": 476,
          "title": "방정식 또는 부등식과 집합의 연산 나타내기",
          "comment": null
        },
        {
          "id": 479,
          "title": "배수의 집합 연산하기",
          "comment": null
        },
        {
          "id": 481,
          "title": "새롭게 정의된 집합의 연산 해결하기",
          "comment": null
        },
        {
          "id": 607,
          "title": "약수의 집합 연산하기",
          "comment": null
        }
      ],
      "achievement3_id": 32,
      "achievement3": {
        "id": 32,
        "title": "집합의 연산을 할 수 있다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 62,
      "title": "유한집합의 원소의 개수",
      "comment": null,
      "kc2_set": [
        {
          "id": 480,
          "title": "유한집합(합집합, 여집합, 차집합)의 원소의 개수 구하기",
          "comment": null
        },
        {
          "id": 604,
          "title": "집합의 원소의 개수의 최댓값과 최솟값 구하기",
          "comment": null
        },
        {
          "id": 605,
          "title": "집합의 원소의 개수를 실생활에서 활용하기",
          "comment": null
        }
      ],
      "achievement3_id": 32,
      "achievement3": {
        "id": 32,
        "title": "집합의 연산을 할 수 있다.",
        "achievement2": {
          "id": 15,
          "title": "집합",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 63,
      "title": "명제와 조건",
      "comment": null,
      "kc2_set": [
        {
          "id": 482,
          "title": "진리집합 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 33,
      "achievement3": {
        "id": 33,
        "title": "명제와 조건의 뜻을 알고, ‘모든’, ‘어떤’을 포함한 명제를 이해한다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 64,
      "title": "명제의 참, 거짓",
      "comment": null,
      "kc2_set": [
        {
          "id": 483,
          "title": "명제의 참, 거짓과 진리집합 사이의 관계 알아보기",
          "comment": null
        },
        {
          "id": 484,
          "title": "거짓인 명제의 반례 찾기",
          "comment": null
        },
        {
          "id": 485,
          "title": "집합의 포함 관계가 주어졌을 때, 명제의 참, 거짓 판별하기",
          "comment": null
        },
        {
          "id": 486,
          "title": "'모든'이나 '어떤'을 포함한 명제의 참, 거짓 판별하기",
          "comment": null
        },
        {
          "id": 487,
          "title": "명제가 참이 되도록 하는 미지수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 33,
      "achievement3": {
        "id": 33,
        "title": "명제와 조건의 뜻을 알고, ‘모든’, ‘어떤’을 포함한 명제를 이해한다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 65,
      "title": "명제의 역과 대우",
      "comment": null,
      "kc2_set": [
        {
          "id": 488,
          "title": "명제의 역과 대우의 참, 거짓 알아보기",
          "comment": null
        },
        {
          "id": 489,
          "title": "명제의 대우를 이용하여 미지수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 34,
      "achievement3": {
        "id": 34,
        "title": "명제의 역과 대우를 이해한다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 66,
      "title": "삼단논법",
      "comment": null,
      "kc2_set": [
        {
          "id": 490,
          "title": "삼단논법 이해하기",
          "comment": null
        }
      ],
      "achievement3_id": 34,
      "achievement3": {
        "id": 34,
        "title": "명제의 역과 대우를 이해한다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 67,
      "title": "명제의 증명",
      "comment": null,
      "kc2_set": [
        {
          "id": 491,
          "title": "대우를 이용하여 명제 증명하기",
          "comment": null
        },
        {
          "id": 492,
          "title": "귀류법을 이용하여 명제 증명하기",
          "comment": null
        },
        {
          "id": 609,
          "title": "삼단논법을 이용하여 명제 추론하기",
          "comment": null
        }
      ],
      "achievement3_id": 35,
      "achievement3": {
        "id": 35,
        "title": "대우를 이용한 증명법과 귀류법을 이해한다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 68,
      "title": "충분조건, 필요조건, 필요충분조건",
      "comment": null,
      "kc2_set": [
        {
          "id": 493,
          "title": "충분조건, 필요조건, 필요충분조건 알아보기",
          "comment": null
        },
        {
          "id": 494,
          "title": "충분조건, 필요조건과 삼단논법 알아보기",
          "comment": null
        },
        {
          "id": 495,
          "title": "충분조건, 필요조건, 필요충분조건과 진리집합 알아보기",
          "comment": null
        },
        {
          "id": 496,
          "title": "충분조건, 필요조건과 부등식 구하기",
          "comment": null
        },
        {
          "id": 497,
          "title": "충분조건, 필요조건과 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 36,
      "achievement3": {
        "id": 36,
        "title": "충분조건과 필요조건을 이해하고 구별할 수 있다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 69,
      "title": "절대부등식",
      "comment": null,
      "kc2_set": [
        {
          "id": 498,
          "title": "실수의 성질을 이용하여 절대부등식 증명하기",
          "comment": null
        },
        {
          "id": 499,
          "title": "절댓값 기호를 포함한 절대부등식 증명하기",
          "comment": null
        }
      ],
      "achievement3_id": 37,
      "achievement3": {
        "id": 37,
        "title": "절대부등식의 의미를 이해하고, 간단한 절대부등식을 증명할 수 있다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 70,
      "title": "산술평균과 기하평균",
      "comment": null,
      "kc2_set": [
        {
          "id": 500,
          "title": "산술평균과 기하평균의 관계 알아보기 - 식의 변형을 이용할 때",
          "comment": null
        },
        {
          "id": 501,
          "title": "산술평균과 기하평균의 관계 알아보기 - 합 또는 곱이 일정할 때",
          "comment": null
        },
        {
          "id": 502,
          "title": "산술평균과 기하평균의 관계 알아보기 - 도형에서의 활용",
          "comment": null
        }
      ],
      "achievement3_id": 37,
      "achievement3": {
        "id": 37,
        "title": "절대부등식의 의미를 이해하고, 간단한 절대부등식을 증명할 수 있다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 71,
      "title": "코시-슈바르츠의 부등식",
      "comment": null,
      "kc2_set": [
        {
          "id": 503,
          "title": "코시-슈바르츠의 부등식 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 37,
      "achievement3": {
        "id": 37,
        "title": "절대부등식의 의미를 이해하고, 간단한 절대부등식을 증명할 수 있다.",
        "achievement2": {
          "id": 16,
          "title": "명제",
          "achievement1": {
            "id": 5,
            "title": "수와 연산",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 72,
      "title": "함수",
      "comment": null,
      "kc2_set": [
        {
          "id": 504,
          "title": "함수의 정의 알아보기",
          "comment": null
        },
        {
          "id": 505,
          "title": "함숫값 구하기 - f(ax+b)에서 f(k)의 값 구하기",
          "comment": null
        },
        {
          "id": 506,
          "title": "서로 같은 함수 구하기",
          "comment": null
        },
        {
          "id": 650,
          "title": "함수의 정의역, 공역, 치역 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 38,
      "achievement3": {
        "id": 38,
        "title": "함수의 개념을 이해하고, 그 그래프를 이해한다.",
        "achievement2": {
          "id": 17,
          "title": "함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 73,
      "title": "여러 가지 함수",
      "comment": null,
      "kc2_set": [
        {
          "id": 507,
          "title": "일대일대응이 되기 위한 조건 알아보기",
          "comment": null
        },
        {
          "id": 508,
          "title": "항등함수와 상수함수 알아보기",
          "comment": null
        },
        {
          "id": 611,
          "title": "일대일함수와 일대일대응 알아보기",
          "comment": null
        },
        {
          "id": 612,
          "title": "함수의 개수 구하기",
          "comment": null
        },
        {
          "id": 615,
          "title": "조건을 이용하여 함숫값 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 38,
      "achievement3": {
        "id": 38,
        "title": "함수의 개념을 이해하고, 그 그래프를 이해한다.",
        "achievement2": {
          "id": 17,
          "title": "함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 74,
      "title": "합성함수",
      "comment": null,
      "kc2_set": [
        {
          "id": 509,
          "title": "합성함수의 함숫값 구하기",
          "comment": null
        },
        {
          "id": 510,
          "title": "함수의 결합법칙 (fºg)ºh=fº(gºh) 알아보기",
          "comment": null
        },
        {
          "id": 511,
          "title": "fºg=gºf 인 경우 구하기",
          "comment": null
        },
        {
          "id": 512,
          "title": "fºf에 대한 조건이 주어진 경우 구하기",
          "comment": null
        },
        {
          "id": 513,
          "title": "fºh=g에서 함수 f 또는 h 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 39,
      "achievement3": {
        "id": 39,
        "title": "함수의 합성을 이해하고, 합성함수를 구할 수 있다.",
        "achievement2": {
          "id": 17,
          "title": "함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 75,
      "title": "역함수",
      "comment": null,
      "kc2_set": [
        {
          "id": 514,
          "title": "역함수의 함숫값 구하기",
          "comment": null
        },
        {
          "id": 515,
          "title": "역함수가 존재하기 위한 조건 알아보기",
          "comment": null
        },
        {
          "id": 516,
          "title": "역함수의 식 구하기",
          "comment": null
        },
        {
          "id": 519,
          "title": "역함수의 성질 알아보기",
          "comment": null
        },
        {
          "id": 614,
          "title": "합성함수와 역함수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 40,
      "achievement3": {
        "id": 40,
        "title": "역함수의 의미를 이해하고, 주어진 함수의 역함수를 구할 수 있다.",
        "achievement2": {
          "id": 17,
          "title": "함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 76,
      "title": "역함수의 응용",
      "comment": null,
      "kc2_set": [
        {
          "id": 517,
          "title": "f=f-1인 함수 구하기",
          "comment": null
        },
        {
          "id": 518,
          "title": "그래프를 이용하여 역함수의 함숫값 구하기",
          "comment": null
        },
        {
          "id": 520,
          "title": "함수와 그 역함수의 그래프의 교점 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 40,
      "achievement3": {
        "id": 40,
        "title": "역함수의 의미를 이해하고, 주어진 함수의 역함수를 구할 수 있다.",
        "achievement2": {
          "id": 17,
          "title": "함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 77,
      "title": "유리식의 계산",
      "comment": null,
      "kc2_set": [
        {
          "id": 521,
          "title": "유리식의 덧셈과 뺄셈 계산하기",
          "comment": null
        },
        {
          "id": 616,
          "title": "(분자의 차수)≥(분모의 차수)인 유리식 계산하기",
          "comment": null
        },
        {
          "id": 617,
          "title": "유리식과 항등식 비교하기",
          "comment": null
        },
        {
          "id": 622,
          "title": "부분분수로 변형하여 유리식 계산하기",
          "comment": null
        }
      ],
      "achievement3_id": 41,
      "achievement3": {
        "id": 41,
        "title": "유리함수 y=(ax+b)/(cx+d)의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 78,
      "title": "유리함수의 그래프",
      "comment": null,
      "kc2_set": [
        {
          "id": 522,
          "title": "유리함수의 그래프의 평행이동 알아보기",
          "comment": null
        },
        {
          "id": 523,
          "title": "유리함수의 그래프의 점근선 구하기",
          "comment": null
        },
        {
          "id": 524,
          "title": "유리함수의 그래프의 대칭성 알아보기",
          "comment": null
        },
        {
          "id": 525,
          "title": "유리함수의 그래프의 성질 알아보기",
          "comment": null
        },
        {
          "id": 618,
          "title": "유리함수의 정의역과 치역 알아보기",
          "comment": null
        },
        {
          "id": 623,
          "title": "유리함수의 그래프가 지나는 사분면 구하기",
          "comment": null
        },
        {
          "id": 643,
          "title": "유리함수의 그래프 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 41,
      "achievement3": {
        "id": 41,
        "title": "유리함수 y=(ax+b)/(cx+d)의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 79,
      "title": "유리함수의 그래프를 이용한 문제 해결",
      "comment": null,
      "kc2_set": [
        {
          "id": 526,
          "title": "그래프를 이용하여 유리함수의 식 구하기",
          "comment": null
        },
        {
          "id": 620,
          "title": "유리함수의 그래프와 직선의 위치 관계 구하기",
          "comment": null
        },
        {
          "id": 651,
          "title": "유리함수의 최대 · 최소 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 41,
      "achievement3": {
        "id": 41,
        "title": "유리함수 y=(ax+b)/(cx+d)의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 80,
      "title": "유리함수의 합성함수, 역함수",
      "comment": null,
      "kc2_set": [
        {
          "id": 527,
          "title": "유리함수의 역함수 구하기",
          "comment": null
        },
        {
          "id": 619,
          "title": "f=f-1인 유리함수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 41,
      "achievement3": {
        "id": 41,
        "title": "유리함수 y=(ax+b)/(cx+d)의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 81,
      "title": "무리식의 계산",
      "comment": null,
      "kc2_set": [
        {
          "id": 528,
          "title": "분모의 유리화를 통해 무리식 계산하기",
          "comment": null
        },
        {
          "id": 624,
          "title": "제곱근의 성질을 이용하여 무리식 계산하기",
          "comment": null
        }
      ],
      "achievement3_id": 42,
      "achievement3": {
        "id": 42,
        "title": "무리함수 y=√(ax+b)+c의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 82,
      "title": "무리함수의 그래프",
      "comment": null,
      "kc2_set": [
        {
          "id": 529,
          "title": "무리함수의 정의역과 치역 알아보기",
          "comment": null
        },
        {
          "id": 530,
          "title": "무리함수의 그래프의 대칭이동 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 42,
      "achievement3": {
        "id": 42,
        "title": "무리함수 y=√(ax+b)+c의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 83,
      "title": "무리함수의 그래프를 이용한 문제 해결",
      "comment": null,
      "kc2_set": [
        {
          "id": 531,
          "title": "그래프를 이용하여 무리함수의 식 구하기",
          "comment": null
        },
        {
          "id": 532,
          "title": "무리함수의 최대 · 최소 구하기",
          "comment": null
        },
        {
          "id": 534,
          "title": "무리함수의 그래프와 직선의 위치 관계 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 42,
      "achievement3": {
        "id": 42,
        "title": "무리함수 y=√(ax+b)+c의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 84,
      "title": "무리함수의 합성함수, 역함수",
      "comment": null,
      "kc2_set": [
        {
          "id": 533,
          "title": "무리함수의 역함수 구하기",
          "comment": null
        },
        {
          "id": 535,
          "title": "무리함수의 합성함수와 역함수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 42,
      "achievement3": {
        "id": 42,
        "title": "무리함수 y=√(ax+b)+c의 그래프를 그릴 수 있고, 그 그래프의 성질을 이해한다.",
        "achievement2": {
          "id": 18,
          "title": "유리함수와 무리함수",
          "achievement1": {
            "id": 6,
            "title": "함수",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 85,
      "title": "경우의 수",
      "comment": null,
      "kc2_set": [
        {
          "id": 536,
          "title": "경우의 수 구하기 - 동전 또는 주사위 던지기, 수 뽑기",
          "comment": null
        }
      ],
      "achievement3_id": 43,
      "achievement3": {
        "id": 43,
        "title": "경우의 수를 구할 수 있다.",
        "achievement2": {
          "id": 19,
          "title": "확률과 그 기본 성질",
          "achievement1": {
            "id": 7,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 86,
      "title": "합의 법칙",
      "comment": null,
      "kc2_set": [
        {
          "id": 537,
          "title": "방정식의 해의 개수 구하기",
          "comment": null
        },
        {
          "id": 629,
          "title": "부등식의 해의 개수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 44,
      "achievement3": {
        "id": 44,
        "title": "합의 법칙과 곱의 법칙을 이해하고, 이를 이용하여 경우의 수를 구할 수 있다.",
        "achievement2": {
          "id": 20,
          "title": "경우의 수",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 87,
      "title": "합의 법칙과 곱의 법칙을 이용한 여러 가지 경우의 수",
      "comment": null,
      "kc2_set": [
        {
          "id": 538,
          "title": "여러 가지 경우의 수 구하기 - 조건이 있는 자연수의 개수 구하기",
          "comment": null
        },
        {
          "id": 539,
          "title": "여러 가지 경우의 수 구하기 - 약수의 개수 구하기",
          "comment": null
        },
        {
          "id": 644,
          "title": "여러 가지 경우의 수 구하기 - 지불 방법의 수와 지불 금액의 수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 44,
      "achievement3": {
        "id": 44,
        "title": "합의 법칙과 곱의 법칙을 이해하고, 이를 이용하여 경우의 수를 구할 수 있다.",
        "achievement2": {
          "id": 20,
          "title": "경우의 수",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 88,
      "title": "곱의 법칙",
      "comment": null,
      "kc2_set": [
        {
          "id": 540,
          "title": "곱의 법칙을 이용한 항의 개수 구하기",
          "comment": null
        },
        {
          "id": 630,
          "title": "곱의 법칙 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 44,
      "achievement3": {
        "id": 44,
        "title": "합의 법칙과 곱의 법칙을 이해하고, 이를 이용하여 경우의 수를 구할 수 있다.",
        "achievement2": {
          "id": 20,
          "title": "경우의 수",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 89,
      "title": "순열",
      "comment": null,
      "kc2_set": [
        {
          "id": 541,
          "title": "nPr 계산하기",
          "comment": null
        },
        {
          "id": 542,
          "title": "‘적어도’의 조건이 있는 순열의 수 구하기",
          "comment": null
        },
        {
          "id": 631,
          "title": "조건이 있는 순열의 수 구하기",
          "comment": null
        },
        {
          "id": 633,
          "title": "이웃하지 않는 순열의 수 구하기",
          "comment": null
        },
        {
          "id": 636,
          "title": "순열의 수 구하기",
          "comment": null
        },
        {
          "id": 645,
          "title": "자리가 정해진 순열의 수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 45,
      "achievement3": {
        "id": 45,
        "title": "순열의 의미를 이해하고, 순열의 수를 구할 수 있다.",
        "achievement2": {
          "id": 21,
          "title": "순열과 조합",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 90,
      "title": "순열의 수 응용",
      "comment": null,
      "kc2_set": [
        {
          "id": 543,
          "title": "순열을 이용하여 자연수의 개수 구하기",
          "comment": null
        },
        {
          "id": 632,
          "title": "사전식으로 배열하는 경우의 수 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 45,
      "achievement3": {
        "id": 45,
        "title": "순열의 의미를 이해하고, 순열의 수를 구할 수 있다.",
        "achievement2": {
          "id": 21,
          "title": "순열과 조합",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 91,
      "title": "조합",
      "comment": null,
      "kc2_set": [
        {
          "id": 544,
          "title": "조합의 수 구하기",
          "comment": null
        },
        {
          "id": 545,
          "title": "특정한 것을 포함하거나 포함하지 않는 조합의 수 구하기",
          "comment": null
        },
        {
          "id": 634,
          "title": "nCr 계산하기",
          "comment": null
        }
      ],
      "achievement3_id": 46,
      "achievement3": {
        "id": 46,
        "title": "조합의 의미를 이해하고, 조합의 수를 구할 수 있다.",
        "achievement2": {
          "id": 21,
          "title": "순열과 조합",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 92,
      "title": "조합의 수 응용",
      "comment": null,
      "kc2_set": [
        {
          "id": 546,
          "title": "뽑아서 나열하는 경우의 수 구하기",
          "comment": null
        },
        {
          "id": 547,
          "title": "조합을 이용한 함수의 개수 구하기",
          "comment": null
        },
        {
          "id": 637,
          "title": "조합의 수 구하기 - 부분집합",
          "comment": null
        }
      ],
      "achievement3_id": 46,
      "achievement3": {
        "id": 46,
        "title": "조합의 의미를 이해하고, 조합의 수를 구할 수 있다.",
        "achievement2": {
          "id": 21,
          "title": "순열과 조합",
          "achievement1": {
            "id": 8,
            "title": "확률과 통계",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 93,
      "title": "곱셈 공식의 변형 2",
      "comment": null,
      "kc2_set": [
        {
          "id": 548,
          "title": "문자가 세 개인 곱셈 공식 변형하기",
          "comment": null
        }
      ],
      "achievement3_id": 1,
      "achievement3": {
        "id": 1,
        "title": "다항식의 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 1,
          "title": "다항식의 연산",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 94,
      "title": "곱셈 공식의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 549,
          "title": "도형에서 곱셈 공식 활용하기",
          "comment": null
        }
      ],
      "achievement3_id": 1,
      "achievement3": {
        "id": 1,
        "title": "다항식의 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 1,
          "title": "다항식의 연산",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 95,
      "title": "허수단위 i의 거듭제곱",
      "comment": null,
      "kc2_set": [
        {
          "id": 553,
          "title": "복소수의 거듭제곱 계산하기",
          "comment": null
        }
      ],
      "achievement3_id": 5,
      "achievement3": {
        "id": 5,
        "title": "복소수의 뜻과 성질을 이해하고 사칙연산을 할 수 있다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 96,
      "title": "이차방정식과 근과 계수의 관계의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 556,
          "title": "이차식을 두 일차식의 곱으로 인수분해하기",
          "comment": null
        },
        {
          "id": 558,
          "title": "두 실근의 절댓값 조건이 주어진 이차방정식 구하기",
          "comment": null
        },
        {
          "id": 559,
          "title": "두 실근의 부호가 주어진 이차방정식 구하기",
          "comment": null
        },
        {
          "id": 601,
          "title": "이차방정식 f(x)=0과 f(ax+b)=0의 관계 알아보기",
          "comment": null
        }
      ],
      "achievement3_id": 8,
      "achievement3": {
        "id": 8,
        "title": "이차방정식의 근과 계수의 관계를 이해한다.",
        "achievement2": {
          "id": 4,
          "title": "복소수와 이차방정식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 97,
      "title": "특수한 형태의 사차방정식",
      "comment": null,
      "kc2_set": [
        {
          "id": 572,
          "title": "ax⁴+bx³+cx²+bx+a=0 (a≠0)꼴의 사차방정식의 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 15,
      "achievement3": {
        "id": 15,
        "title": "간단한 삼차방정식과 사차방정식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 98,
      "title": "연립방정식의 풀이",
      "comment": null,
      "kc2_set": [
        {
          "id": 573,
          "title": "연립방정식 풀기",
          "comment": null
        }
      ],
      "achievement3_id": 17,
      "achievement3": {
        "id": 17,
        "title": "미지수가 2개인 연립일차방정식을 풀 수 있고, 이를 활용하여 문제를 해결할 수 있다.",
        "achievement2": {
          "id": 10,
          "title": "일차부등식과 연립일차방정식",
          "achievement1": {
            "id": 3,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "중등",
            "grade_cluster": "중1~3"
          }
        }
      }
    },
    {
      "id": 99,
      "title": "이차부등식과 이차함수의 관계",
      "comment": null,
      "kc2_set": [
        {
          "id": 577,
          "title": "이차부등식의 풀이",
          "comment": null
        },
        {
          "id": 578,
          "title": "그래프를 이용한 이차부등식의 풀이",
          "comment": null
        }
      ],
      "achievement3_id": 20,
      "achievement3": {
        "id": 20,
        "title": "이차부등식과 이차함수의 관계를 이해하고, 이차부등식과 연립이차부등식을 풀 수 있다.",
        "achievement2": {
          "id": 9,
          "title": "여러 가지 방정식과 부등식",
          "achievement1": {
            "id": 1,
            "title": "문자와 식",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    },
    {
      "id": 100,
      "title": "도형에서 점과 직선 사이의 거리의 활용",
      "comment": null,
      "kc2_set": [
        {
          "id": 584,
          "title": "점과 직선 사이의 거리와 삼각형의 넓이 구하기",
          "comment": null
        },
        {
          "id": 585,
          "title": "점이 나타내는 도형의 방정식 구하기",
          "comment": null
        }
      ],
      "achievement3_id": 25,
      "achievement3": {
        "id": 25,
        "title": "점과 직선 사이의 거리를 구할 수 있다.",
        "achievement2": {
          "id": 12,
          "title": "직선의 방정식",
          "achievement1": {
            "id": 4,
            "title": "기하",
            "curriculum": "2015",
            "classtype": "고등",
            "grade_cluster": "공통과목"
          }
        }
      }
    }
  ]
};

export default mockKC1List;

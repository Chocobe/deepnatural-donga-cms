// type
import { 
  TMathQuestionModel,
} from '../models/mathModel.type';

// Question mockup v2
const mockMathQuestion: TMathQuestionModel = {
  "id": 1,
  "internal_id": "741480",
  "source": {
    "id": 1,
    "name": "고등 코드엠 수학(상)",
    "curriculum": "2015",
    "classtype": "고등",
    "grade": 1,
    "term": 0,
    "serviceyear": "2018",
    "publisher": "동아출판㈜",
    "expiration_date": "9999-12-31",
    "source_type": "교사용부록",
    "isview": true
  },
  "instruction": null,
  "achievement": [
    {
      "id": 1,
      "title": "다항식의 사칙연산을 할 수 있다.",
      "no": "01",
      "code": "[10수학01-01]"
    }
  ],
  "curriculum": "2015",
  "subject": "수학",
  "keyword": "|다항식|계수|상수항|식의 정리|다항식의 곱셈과 곱셈 공식 2|다항식의 전개에서 특정한 항의 계수 구하기|",
  "behavior_domain": "이해",
  "inquiry": "다음 중 다항식 $2x^3 +3y^2-x^2y+4xy^2+7$에 대한 설명으로 옳지 않은 것은?",
  "choice1": "$x$에 대한 삼차식이다.",
  "choice2": "$y$에 대한 이차식이다.",
  "choice3": "$x^3$의 계수는 $2$이다.",
  "choice4": "$x$에 대한 상수항은 $3 y^2+7$이다.",
  "choice5": "$y$에 대한 상수항은 $7$이다.",
  "choice_answer": "5",
  "short_answer_count": null,
  "short_answer1": "",
  "short_answer2": "",
  "short_answer3": "",
  "short_answer4": "",
  "short_answer5": "",
  "short_answer6": "",
  "short_answer7": "",
  "short_answer8": "",
  "short_answer9": "",
  "short_answer10": "",
  "short_answer11": "",
  "short_answer12": "",
  "short_answer13": "",
  "short_answer14": "",
  "short_answer15": "",
  "short_answer16": "",
  "short_answer17": "",
  "short_answer18": "",
  "short_answer19": "",
  "short_answer20": "",
  "solution": "$y$에 대한 상수항은 $2 x^3+7$이다.",
  "evaluation_criteria1": "",
  "evaluation_criteria1_percent": "nan",
  "evaluation_criteria2": "",
  "evaluation_criteria2_percent": "nan",
  "evaluation_criteria3": "",
  "evaluation_criteria3_percent": "nan",
  "evaluation_criteria4": "",
  "evaluation_criteria4_percent": "nan",
  "evaluation_criteria5": "",
  "evaluation_criteria5_percent": "",
  "difficulty": 1,
  "question_type": "객관식-단답형",
  "choice_type": null,
  "choice_count": null,
  "is_set": false,
  "representation_question_id": null,
  "individual_questioning": false,
  "source_page_no": 24,
  "source_question_no": "",
  "is_reviewed": false,
  "kc2": {
    "id": 327,
    "title": "다항식을 오름차순과 내림차순으로 나타내기",
    "comment": null,
    "kc1": null
  },
  "textbook": {
    "id": 6,
    "curriculum": "2015",
    "title": "수학",
    "author": "박교식",
    "classtype": "고등",
    "grade": 1,
    "term": 0
  },
  "chapter1": [
    {
      "id": 7,
      "title": "다항식",
      "no": "01"
    }
  ],
  "chapter2": [
    {
      "id": 1,
      "title": "다항식의 연산",
      "no": "01"
    }
  ],
  "chapter3": [
    {
      "id": 1,
      "title": "다항식의 연산",
      "no": "01"
    }
  ]
};

// Question mockup v1
// const mockMathQuestion: TMathQuestionModel = {
//   "id": 9,
//   "internal_id": "741501",
//   "source": {
//     "id": 1,
//     "name": "고등 코드엠 수학(상)",
//     "curriculum": "2015",
//     "classtype": "고등",
//     "grade": 1,
//     "term": 0,
//     "serviceyear": "2018",
//     "publisher": "동아출판㈜",
//     "expiration_date": "9999-12-31",
//     "source_type": "교사용부록",
//     "isview": true
//   },
//   "instruction": null,
//   "achievement": [
//     {
//       "id": 1,
//       "title": "다항식의 사칙연산을 할 수 있다.",
//       "no": "01",
//       "code": "[10수학01-01]"
//     }
//   ],
//   "curriculum": "2015",
//   "subject": "수학",
//   "keyword": "|다항식|나눗셈|곱셈|뺄셈|다항식의 나눗셈|다항식의 나눗셈에서 몫과 나머지 알아보기|",
//   "behavior_domain": "이해",
//   "inquiry": "다음은 다항식 $3 x^2-2 x^2-4 x-7$ 을 $x-2$ 로 나누는 과정을 나타낸 것이다. 이때 상수 $a, b, c, d$ 에 대하여 $a+b+c+d$ 의 값을 구하시오.\n<img src=\"https://donga-cms-files.s3.ap-northeast-2.amazonaws.com/images/741501_Q.png\" alt=\"이미지 설명\">",
//   "choice1": "",
//   "choice2": "",
//   "choice3": "",
//   "choice4": "",
//   "choice5": "",
//   "choice_answer": "",
//   "short_answer_count": 1,
//   "short_answer1": "$16$",
//   "short_answer2": "",
//   "short_answer3": "",
//   "short_answer4": "",
//   "short_answer5": "",
//   "short_answer6": "",
//   "short_answer7": "",
//   "short_answer8": "",
//   "short_answer9": "",
//   "short_answer10": "",
//   "short_answer11": "",
//   "short_answer12": "",
//   "short_answer13": "",
//   "short_answer14": "",
//   "short_answer15": "",
//   "short_answer16": "",
//   "short_answer17": "",
//   "short_answer18": "",
//   "short_answer19": "",
//   "short_answer20": "",
//   "solution": "<img src=\"https://donga-cms-files.s3.ap-northeast-2.amazonaws.com/images/741501_A.png\" alt=\"이미지 설명\">\n따라서 $a=4, b=4, c=7, d=1$이므로<br> $a+b+c+d=4+4+7+1=16$",
//   "evaluation_criteria1": "",
//   "evaluation_criteria1_percent": "nan",
//   "evaluation_criteria2": "",
//   "evaluation_criteria2_percent": "nan",
//   "evaluation_criteria3": "",
//   "evaluation_criteria3_percent": "nan",
//   "evaluation_criteria4": "",
//   "evaluation_criteria4_percent": "nan",
//   "evaluation_criteria5": "",
//   "evaluation_criteria5_percent": "",
//   "difficulty": 3,
//   "question_type": "주관식-단답형",
//   "choice_type": null,
//   "choice_count": null,
//   "is_set": false,
//   "representation_question_id": null,
//   "individual_questioning": false,
//   "source_page_no": 27,
//   "source_question_no": "",
//   "is_reviewed": false,
//   "kc1_title": "다항식의 나눗셈에서 몫과 나머지 알아보기",
//   "kc2_title": "다항식의 나눗셈"
// };

export default mockMathQuestion;

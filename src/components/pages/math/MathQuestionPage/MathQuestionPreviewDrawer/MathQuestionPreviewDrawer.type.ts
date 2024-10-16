// type
import { 
  cmsClassTypeOptions,
  cmsDifficultyTemplate,
  cmsGradeTemplate,
  cmsTermTemplate,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathQuestionTypeMapper, 
  TMathQuestionModel,
} from '@/apis/models/mathModel.type';

export const mathQuestionPreviewDrawerContentTemplates = [
  {
    label: '문항 ID',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.internal_id;
    },
  },
  {
    label: '학교급',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      const classtype = mathQuestion.source?.classtype;

      const valueForDisplay = classtype
        ? cmsClassTypeOptions.find(option => option.value === classtype)?.text
        : '';

      return valueForDisplay ?? '';
    },
  },
  {
    label: '학년',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      const grade = mathQuestion.source.grade;

      return cmsGradeTemplate[grade];
    },
  },
  {
    label: '학기',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      const term = mathQuestion?.source?.term;

      return cmsTermTemplate[term];
    },
  },

  {
    label: 'KC1',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.kc2.kc1?.title ?? '';
    },
  },
  {
    label: 'KC2',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.kc2.title;
    },
  },

  {
    label: '난이도',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      const difficulty = mathQuestion.difficulty;
      return cmsDifficultyTemplate[difficulty];
    },
  },
  {
    label: '지문',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.instruction;
    },
  },
  {
    label: '발문',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.inquiry;
    },
  },

  //
  // `문제유형` (렌더링 분기점)
  //
  {
    label: '문제유형',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.question_type;
    },
  },

  //
  // `객관식-단답형` 
  // `객관식-다답형`
  //
  ...Array.from(
    { length: 5 },
    (_, i) => {
      const choiceNumber = i + 1;

      return {
        label: `객관식 선지${choiceNumber}`,
        type: 'string',
        getIsShow: (mathQuestion: TMathQuestionModel) => {
          const questionType = mathQuestion.question_type;

          switch (questionType) {
            case mathQuestionTypeMapper['객관식-단답형']:
            case mathQuestionTypeMapper['객관식-다답형']: {
              return true;
            }

            default: {
              return false;
            }
          }
        },
        getValue: (mathQuestion: TMathQuestionModel) => {
          return mathQuestion[`choice${choiceNumber}`];
        },
      };
    }
  ),

  //
  // `주관식-단답형`
  // `주관식-선택형-기본`
  // `주관식-선택형-무순`
  // `주관식-선택형-유순`
  //
  {
    label: '주관식 정답 입력 개수',
    type: 'string',
    getIsShow: (mathQuestion: TMathQuestionModel) => {
      const questionType = mathQuestion.question_type;

      switch (questionType) {
        case '주관식-단답형':
        case '주관식-선택형-기본':
        case '주관식-선택형-유순':
        case '주관식-선택형-무순': {
          return true;
        }

        default: {
          return false;
        }
      }
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.short_answer_count;
    },
  },
  {
    label: '선택지 유형',
    type: 'string',
    getIsShow: (mathQuestion: TMathQuestionModel) => {
      const questionType = mathQuestion.question_type;

      switch (questionType) {
        case '주관식-선택형-기본':
        case '주관식-선택형-유순':
        case '주관식-선택형-무순': {
          return true;
        }

        default: {
          return false;
        }
      }
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.choice_type;
    },
  },
  {
    label: '선택지 개수',
    type: 'string',
    getIsShow: (mathQuestion: TMathQuestionModel) => {
      const questionType = mathQuestion.question_type;

      switch (questionType) {
        case '주관식-선택형-기본':
        case '주관식-선택형-유순':
        case '주관식-선택형-무순': {
          return true;
        }

        default: {
          return false;
        }
      }
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.choice_count;
    },
  },
  ...Array.from(
    { length: 20 },
    (_, i) => {
      const shortNumber = i + 1;

      return {
        label: `주관식 정답${shortNumber}`,
        type: 'string',
        getIsShow: (mathQuestion: TMathQuestionModel) => {
          const questionType = mathQuestion.question_type;
          const shortAnswerCount = mathQuestion.short_answer_count;

          switch (questionType) {
            case '주관식-단답형':
            case '주관식-선택형-기본':
            case '주관식-선택형-유순':
            case '주관식-선택형-무순': {
              return shortAnswerCount !== null && (
                i < shortAnswerCount
              );
            }

            default: {
              return false;
            }
          }
        },
        getValue: (mathQuestion: TMathQuestionModel) => {
          return mathQuestion[`short_answer${shortNumber}`] || '&nbsp;';
        },
      };
    }
  ),

  //
  // `주관식-서술형`
  // `주관식-그리기형`
  // `주관식-선긋기형`
  //
  {
    label: '주관식 정답',
    type: 'string',
    getIsShow: (mathQuestion: TMathQuestionModel) => {
      const questionType = mathQuestion.question_type;

      switch (questionType) {
        case '주관식-서술형':
        case '주관식-그리기형':
        case '주관식-선긋기형': {
          return true;
        }

        default: {
          return false;
        }
      }
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.short_answer1 || '&nbsp;';
    },
  },

  //
  // 풀이
  //
  {
    label: '풀이',
    type: 'string',
    getIsShow: () => {
      return true;
    },
    getValue: (mathQuestion: TMathQuestionModel) => {
      return mathQuestion.solution;
    },
  },

  //
  // `주관식-서술형`
  //
  ...Array.from(
    { length: 5 },
    (_, i) => {
      const criteriaNumber = i + 1;

      return {
        label: `서술형 평가 기준 ${criteriaNumber}`,
        type: 'string',
        getIsShow: (mathQuestion: TMathQuestionModel) => {
          const questionType = mathQuestion.question_type;

          return questionType === mathQuestionTypeMapper['주관식-서술형'];
        },
        getValue: (mathQuestion: TMathQuestionModel) => {
          return mathQuestion[`evaluation_criteria${criteriaNumber}`];
        },
      };
    },
  ),
];

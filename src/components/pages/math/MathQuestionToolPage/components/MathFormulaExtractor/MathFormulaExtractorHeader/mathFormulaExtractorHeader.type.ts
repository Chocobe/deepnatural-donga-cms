// type
import { 
  TResult,
} from '@/store/mathStores/mathQuestionToolPageStore/slices/uiSlice/uiSlice.types';

const VALIDATOR_ID_MAPPER = {
  INQUIRY: 'inquiry',
  INSTRUCTION: 'instruction',
} as const;

/** 작업자 필수 작업 항목 설정 */
export const validator = {
  /** 발문(inquiry) 유효성 검사 */
  [VALIDATOR_ID_MAPPER.INQUIRY](resultState: TResult) {
    const ID = VALIDATOR_ID_MAPPER.INQUIRY;
    const INVALID_MESSAGE = '발문이 누락되었습니다.';

    const isValid = resultState.questionSets.every(item => {
      const value = item[ID];

      return !!value;
    });

    return {
      isValid,
      invalidMessage: isValid
                ? null
                : INVALID_MESSAGE,
    };
  },

  /** 지문(instruction) 유효성 검사 */
  [VALIDATOR_ID_MAPPER.INSTRUCTION](resultState: TResult) {
    const ID = VALIDATOR_ID_MAPPER.INSTRUCTION;
    const INVALID_MESSAGE = '지문이 누락되었습니다.';

    const isValid = resultState.questionSets.every(item => {
      const hasInstructionProperty = Object
        .keys(item)
        .includes(ID);

      if (!hasInstructionProperty) {
        return true;
      }

      return !!item[ID];
    });

    return {
      isValid,
      invalidMessage: isValid
                ? null
                : INVALID_MESSAGE,
    };
  },
} as const;

/** 주관식 답변 작성에 대한 최소 항목 개수 설정 */
// const SHORT_ANSWER_LABEL_PREFIX = '주관식 정답';
// export const SHORT_ANSWER_MIN_COUNT_CONFIG = {
//     KEY: 'choice_answer_count',
//     INVALID_MESSAGE(itemNumber: string | number) {
//         return `${SHORT_ANSWER_LABEL_PREFIX}${itemNumber}이(가) 누락되었습니다.`;
//     },
// };

/** 주관식 답변에 해당하는 key prefix */
// export const SHORT_ANSWER_KEY_PREFIX = 'short_answer';

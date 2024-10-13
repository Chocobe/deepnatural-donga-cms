// type
import { 
  TRetrieveMathQuestionApiResponse,
  TRetrieveMathQuestionsApiRequestParams,
  TRetrieveMathQuestionsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathQuestionModel,
} from '@/apis/models/mathModel.type';

export type TMathQuestionPageStoreState = {
  searchParamsForRetrieveMathQuestionsApi: TRetrieveMathQuestionsApiRequestParams['searchParams'];

  mathQuestionsData?: TRetrieveMathQuestionsApiResponse;

  detailTargetMathQuestion?: TRetrieveMathQuestionApiResponse;

  // TODO: detailFormState 초기화 추가하기
  // TODO: detailFormStateReference 초기화 추가하기

  // FIXME: Question 데이터에 `Textbook`, `Chapter`, `KC` 정보 없는 상태
  // FIXME: => 기존 작업도구에서는 `metadata` 속성으로 제출했음.

  selectedMathQuestions?: TMathQuestionModel[];
  previewMathQuestion?: TMathQuestionModel;
};

export const initialMathQuestionPageStoreState: TMathQuestionPageStoreState = {
  searchParamsForRetrieveMathQuestionsApi: {
    curriculum: undefined,
    source_classtype: undefined,
    source_grade: undefined,
    source_term: undefined,
    internal_id: undefined,
    instruction_inquiry: undefined,
    page: undefined,
    content: undefined,
    inquiry: undefined,
    instruction: undefined,
  },

  mathQuestionsData: undefined,

  detailTargetMathQuestion: undefined,

  selectedMathQuestions: undefined,
  previewMathQuestion: undefined,
} as const;

export type TMathQuestionPageStoreAction = {
  clearMathQuestionPageStoreState: () => void;

  clearSearchParamsForRetrieveMathQuestionsApi: () => void;
  updateSearchParamsForRetrieveMathQuestionsApi: (
    callback: (
      searchParamsForRetrieveMathQuestionsApi: TMathQuestionPageStoreState['searchParamsForRetrieveMathQuestionsApi']
    ) => TMathQuestionPageStoreState['searchParamsForRetrieveMathQuestionsApi']
  ) => void;

  clearMathQuestionsData: () => void;
  setMathQuestionsData: (mathQuestionsData: TRetrieveMathQuestionsApiResponse) => void;

  clearDetailTargetMathQuestion: () => void;
  setDetailTargetMathQuestion: (mathQuestion: TRetrieveMathQuestionApiResponse) => void;

  clearSelectedMathQuestions: () => void;
  setSelectedMathQuestions: (selectedMathQuestions: TMathQuestionModel[]) => void;

  clearPreviewMathQuestion: () => void;
  setPreviewMathQuestion: (previewMathQuestion: TMathQuestionModel) => void;
};

export type TMathQuestionPageStore =
  & TMathQuestionPageStoreState
  & TMathQuestionPageStoreAction;

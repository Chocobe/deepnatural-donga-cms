// type
import { 
  TRetrieveMathQuestionsApiRequestParams,
  TRetrieveMathQuestionsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathQuestionModel,
} from '@/apis/models/mathModel.type';

export type TMathQuestionPageStoreState = {
  searchParamsForRetrieveMathQuestionsApi: TRetrieveMathQuestionsApiRequestParams['searchParams'];

  mathQuestionsData?: TRetrieveMathQuestionsApiResponse;

  selectedMathQuestions?: TMathQuestionModel[];
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

  selectedMathQuestions: undefined,
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

  clearSelectedMathQuestions: () => void;
  setSelectedMathQuestions: (selectedMathQuestions: TMathQuestionModel[]) => void;
};

export type TMathQuestionPageStore =
  & TMathQuestionPageStoreState
  & TMathQuestionPageStoreAction;

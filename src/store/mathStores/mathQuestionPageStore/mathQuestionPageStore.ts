// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathQuestionPageStoreState,
  TMathQuestionPageStore,
} from './mathQuestionPageStore.type';

const useMathQuestionPageStore = create(devtools<TMathQuestionPageStore>((set, _get) => ({
  ...initialMathQuestionPageStoreState,

  clearMathQuestionPageStoreState: () => {
    set(initialMathQuestionPageStoreState, false, 'clearMathQuestionPageStoreState');
  },

  clearSearchParamsForRetrieveMathQuestionsApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathQuestionsApi: {
        ...initialMathQuestionPageStoreState.searchParamsForRetrieveMathQuestionsApi,
      },
    }), false, 'clearSearchParamsForRetrieveMathQuestionsApi');
  },
  updateSearchParamsForRetrieveMathQuestionsApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathQuestionsApi: {
        ...old.searchParamsForRetrieveMathQuestionsApi,
        ...callback(old.searchParamsForRetrieveMathQuestionsApi),
      },
    }), false, 'updateSearchParamsForRetrieveMathQuestionsApi');
  },

  clearMathQuestionsData: () => {
    set(old => ({
      ...old,
      mathQuestionsData: initialMathQuestionPageStoreState.mathQuestionsData,
    }), false, 'clearMathQuestionsData');
  },
  setMathQuestionsData: mathQuestionsData => {
    set(old => ({
      ...old,
      mathQuestionsData,
    }), false, 'setMathQuestionsData');
  },

  clearSelectedMathQuestions: () => {
    set(old => ({
      ...old,
      selectedMathQuestions: initialMathQuestionPageStoreState.selectedMathQuestions,
    }), false, 'clearSelectedMathQuestions');
  },
  setSelectedMathQuestions: selectedMathQuestions => {
    set(old => ({
      ...old,
      selectedMathQuestions,
    }), false, 'setSelectedMathQuestions');
  },
}), {
  name: 'MathQuestionPageStore',
}));

export default useMathQuestionPageStore;

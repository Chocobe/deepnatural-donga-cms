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
      searchParamsForRetrieveMathQuestionsApi: callback(old.searchParamsForRetrieveMathQuestionsApi),
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

  clearDetailTargetMathQuestion: () => {
    set(old => ({
      ...old,
      detailTargetMathQuestion: initialMathQuestionPageStoreState.detailTargetMathQuestion,
      detailFormState: initialMathQuestionPageStoreState.detailFormState,
    }), false, 'clearDetailTargetMathQuestion');
  },
  setDetailTargetMathQuestion: mathQuestion => {
    set(old => ({
      ...old,
      detailTargetMathQuestion: mathQuestion,
      detailFormState: {
        ...mathQuestion,
      },
    }), false, 'setDetailTargetMathQuestion');
  },
  updateDetailFormState: callback => {
    set(old => ({
      ...old,
      detailFormState: {
        ...old.detailFormState,
        ...callback(old.detailFormState),
      },
    }), false, 'updateDetailFormState');
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

  clearPreviewMathQuestion: () => {
    set(old => ({
      ...old,
      previewMathQuestion: initialMathQuestionPageStoreState.previewMathQuestion,
    }), false, 'clearPreviewMathQuestion');
  },
  setPreviewMathQuestion: previewMathQuestion => {
    set(old => ({
      ...old,
      previewMathQuestion,
    }), false, 'setPreviewMathQuestion');
  },
}), {
  name: 'MathQuestionPageStore',
}));

export default useMathQuestionPageStore;

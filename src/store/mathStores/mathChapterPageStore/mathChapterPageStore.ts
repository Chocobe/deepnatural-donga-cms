// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathChapterPageStoreState,
  TMathChapterPageStore,
} from './mathChapterPageStore.type';

const useMathChapterPageStore = create(devtools<TMathChapterPageStore>((set, _get) => ({
  ...initialMathChapterPageStoreState,

  clearMathChapterPageStoreState: () => {
    set(initialMathChapterPageStoreState, false, 'clearMathChapterPageStoreState');
  },

  clearSearchParamsForRetrieveMathChaptersApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathChaptersApi: {
        ...initialMathChapterPageStoreState.searchParamsForRetrieveMathChaptersApi,
      },
    }), false, 'clearSearchParamsForRetrieveMathChaptersApi');
  },
  updateSearchParamsForRetrieveMathChaptersApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathChaptersApi: {
        ...old.searchParamsForRetrieveMathChaptersApi,
        ...callback(old.searchParamsForRetrieveMathChaptersApi),
      },
    }), false, 'updateSearchParamsForRetrieveMathChaptersApi');
  },

  clearMathChaptersData: () => {
    set(old => ({
      ...old,
      mathChaptersData: initialMathChapterPageStoreState.mathChaptersData,
    }), false, 'clearMathChaptersData');
  },
  setMathChaptersData: mathChaptersData => {
    set(old => ({
      ...old,
      mathChaptersData,
    }), false, 'setMathChaptersData');
  },

  clearDetailTargetMathChapter: () => {
    set(old => ({
      ...old,
      detailTargetMathChapter: initialMathChapterPageStoreState.detailTargetMathChapter,
      detailFormState: initialMathChapterPageStoreState.detailFormState,
      detailFormStateReference: initialMathChapterPageStoreState.detailFormStateReference,
    }), false, 'clearDetailTargetMathChapter');
  },
  setDetailTargetMathChapter: detailTargetMathChapter => {
    set(old => ({
      ...old,
      detailTargetMathChapter,
      detailFormState: detailTargetMathChapter,
      detailFormStateReference: initialMathChapterPageStoreState.detailFormStateReference,
    }), false, 'setDetailTargetMathChapter');
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
  updateDetailFormStateReference: callback => {
    set(old => ({
      ...old,
      detailFormStateReference: {
        ...old.detailFormStateReference,
        ...callback(old.detailFormStateReference),
      },
    }), false, 'updateDetailFormStateReference');
  },

  clearSelectedMathChapters: () => {
    set(old => ({
      ...old,
      selectedMathChapters: initialMathChapterPageStoreState.selectedMathChapters,
    }), false, 'clearSelectedMathChapters');
  },
  setSelectedMathChapters: selectedMathChapters => {
    set(old => ({
      ...old,
      selectedMathChapters,
    }), false, 'setSelectedMathChapters');
  },
}), {
  name: 'MathChapterPageStore',
}));

export default useMathChapterPageStore;

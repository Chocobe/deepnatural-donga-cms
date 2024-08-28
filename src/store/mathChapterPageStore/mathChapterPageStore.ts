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
      searchParamsForRetrieveMathChaptersApi: callback(old.searchParamsForRetrieveMathChaptersApi),
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

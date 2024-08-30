// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathTextbookPageStoreState,
  TMathTextbookPageStore,
} from './mathTextbookPageStore.type';

const useMathTextbookPageStore = create(devtools<TMathTextbookPageStore>((set, _get) => ({
  ...initialMathTextbookPageStoreState,

  clearMathTextbookPageStore: () => {
    set(initialMathTextbookPageStoreState, false, 'clearMathTextbookPageStore');
  },

  clearSearchParamsForRetrieveMathTextbooksApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathTextbooksApi: initialMathTextbookPageStoreState.searchParamsForRetrieveMathTextbooksApi,
    }), false, 'clearSearchParamsForRetrieveMathTextbooksApi');
  },
  updateSearchParamsForRetrieveMathTextbooksApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathTextbooksApi: callback(old.searchParamsForRetrieveMathTextbooksApi),
    }), false, 'updateSearchParamsForRetrieveMathTextbooksApi');
  },

  clearMathTextbooksData: () => {
    set(old => ({
      ...old,
      mathTextbooksData: initialMathTextbookPageStoreState.mathTextbooksData,
    }), false, 'clearMathTextbooksData');
  },
  setMathTextbooksData: mathTextbooksData => {
    set(old => ({
      ...old,
      mathTextbooksData,
    }), false, 'setMathTextbooksData');
  },

  clearDetailTargetMathTextbook: () => {
    set({
      detailTargetMathTextbook: undefined,
      detailFormState: {
        ...initialMathTextbookPageStoreState.detailFormState,
      },
    }, false, 'clearSelectedMathTextbook');
  },
  setDetailTargetMathTextbook: mathTextbook => {
    set({
      detailTargetMathTextbook: mathTextbook,
      detailFormState: {
        ...mathTextbook,
      },
    }, false, 'setSelectedMathTextbook');
  },
  updateDetailTargetMathTextbook: callback => {
    set(old => ({
      ...old,
      detailTargetMathTextbook: callback(old.detailTargetMathTextbook),
    }), false, 'updateDetailTargetMathTextbook');
  },

  clearDetailFormState: () => {
    set(old => ({
      ...old,
      detailFormState: {
        ...initialMathTextbookPageStoreState.detailFormState,
      },
    }), false, 'clearFormState');
  },
  setDetailFormState: formState => {
    set(old => ({
      ...old,
      detailFormState: {
        ...old.detailFormState,
        ...formState,
      },
    }), false, 'setFormState');
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

  clearSelectedMathTextbooks: () => {
    set(old => ({
      ...old,
      selectedMathTextbooks: undefined,
    }), false, 'clearSelectedMathTextbooks');
  },
  setSelectedMathTextbooks: selectedMathTextbooks => {
    set(old => ({
      ...old,
      selectedMathTextbooks,
    }), false, 'setSelectedMathTextbooks');
  },
}), {
  name: 'MathTextbookPageStore',
}));

export default useMathTextbookPageStore;

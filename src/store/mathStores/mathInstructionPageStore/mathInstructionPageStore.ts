// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathInstructionPageStoreState,
  TMathInstructionPageStore,
} from './mathInstructionPageStore.type';

const useMathInstructionPageStore = create(devtools<TMathInstructionPageStore>((set, _get) => ({
  ...initialMathInstructionPageStoreState,

  clearMathInstructionPageStoreState: () => {
    set(initialMathInstructionPageStoreState, false, 'clearMathInstructionPageStore');
  },

  clearSearchParamsForRetrieveMathInstructionsApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathInstructionsApi: {
        ...initialMathInstructionPageStoreState.searchParamsForRetrieveMathInstructionsApi,
      },
    }), false, 'clearSearchParamsForRetrieveMathInstructionsApi');
  },
  updateSearchParamsForRetrieveMathInstructionsApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathInstructionsApi: {
        ...old.searchParamsForRetrieveMathInstructionsApi,
        ...callback(old.searchParamsForRetrieveMathInstructionsApi),
      },
    }), false, 'updateSearchParamsForRetrieveMathInstructionsApi');
  },

  clearMathInstructionsData: () => {
    set(old => ({
      ...old,
      mathInstructionsData: initialMathInstructionPageStoreState.mathInstructionsData,
    }), false, 'clearMathInstructionsData');
  },
  setMathInstructionsData: mathInstructionsData => {
    set(old => ({
      ...old,
      mathInstructionsData,
    }), false, 'setMathInstructionsData');
  },

  clearSelectedMathInstructions: () => {
    set(old => ({
      ...old,
      selectedMathInstructions: initialMathInstructionPageStoreState.selectedMathInstructions,
    }), false, 'clearSelectedMathInstructions');
  },
  setSelectedMathInstructions: selectedMathInstructions => {
    set(old => ({
      ...old,
      selectedMathInstructions,
    }), false, 'setSelectedMathInstructions');
  },
}), {
  name: 'MathInstructionPageStore',
}));

export default useMathInstructionPageStore;

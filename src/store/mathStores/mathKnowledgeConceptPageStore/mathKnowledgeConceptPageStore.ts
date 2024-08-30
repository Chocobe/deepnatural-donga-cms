// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathKnowledgeConceptPageStoreState,
  TMathKnowledgeConceptPageStore,
} from './mathKnowledgeConceptPageStore.type';

const useMathKnowledgeConceptPageStore = create(devtools<TMathKnowledgeConceptPageStore>((set, _get) => ({
  ...initialMathKnowledgeConceptPageStoreState,

  clearMathKnowledgeConceptPageStoreState: () => {
    set(initialMathKnowledgeConceptPageStoreState, false, 'clearMathKnowledgeConceptPageStoreState');
  },

  clearSearchParamsForRetrieveMathKnowledgeConceptsApi: () => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathKnowledgeConceptsApi: initialMathKnowledgeConceptPageStoreState.searchParamsForRetrieveMathKnowledgeConceptsApi,
    }), false, 'clearSearchParamsForRetrieveMathKnowledgeConceptsApi');
  },
  updateSearchParamsForRetrieveMathKnowledgeConceptsApi: callback => {
    set(old => ({
      ...old,
      searchParamsForRetrieveMathKnowledgeConceptsApi: {
        ...old.searchParamsForRetrieveMathKnowledgeConceptsApi,
        ...callback(old.searchParamsForRetrieveMathKnowledgeConceptsApi),
      },
    }), false, 'updateSearchParamsForRetrieveMathKnowledgeConceptsApi');
  },

  clearMathKnowledgeConceptsData: () => {
    set(old => ({
      ...old,
      mathKnowledgeConceptsData: initialMathKnowledgeConceptPageStoreState.mathKnowledgeConceptsData,
    }), false, 'clearMathKnowledgeConceptsData');
  },
  setMathKnowledgeConceptsData: mathKnowledgeConceptsData => {
    set(old => ({
      ...old,
      mathKnowledgeConceptsData,
    }), false, 'setMathKnowledgeConceptsData');
  },

  clearSelectedMathKnowledgeConcepts: () => {
    set(old => ({
      ...old,
      selectedMathKnowledgeConcepts: initialMathKnowledgeConceptPageStoreState.selectedMathKnowledgeConcepts,
    }), false, 'clearSelectedMathKnowledgeConcepts');
  },
  setSelectedMathKnowledgeConcepts: selectedMathKnowledgeConcepts => {
    set(old => ({
      ...old,
      selectedMathKnowledgeConcepts,
    }), false, 'setSelectedMathKnowledgeConcepts');
  },
}), {
  name: 'MathKnowledgeConceptPageStore',
}));

export default useMathKnowledgeConceptPageStore;

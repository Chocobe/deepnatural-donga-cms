// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMathKnowledgeConceptPageStoreDetailKC2,
  initialMathKnowledgeConceptPageStoreState,
  TMathKnowledgeConceptPageStore,
  TMathKnowledgeConceptPageStoreDetailKC1,
} from './mathKnowledgeConceptPageStore.type';
import { 
  TRetrieveMathKnowledgeConceptApiResponse,
} from '@/apis/math/mathApi.type';

function parseKC1ToDetailFormState(
  kc1: TRetrieveMathKnowledgeConceptApiResponse
): TMathKnowledgeConceptPageStoreDetailKC1 {
  const {
    kc2_set,
    ...kc1Data
  } = kc1;

  return {
    ...kc1Data,
    kc2_set: kc2_set?.length
      ? kc2_set
      : [
        initialMathKnowledgeConceptPageStoreDetailKC2
      ],
  };
}

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
      searchParamsForRetrieveMathKnowledgeConceptsApi: callback(old.searchParamsForRetrieveMathKnowledgeConceptsApi),
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

  clearDetailTargetMathKnowledgeConcept: () => {
    set(old => ({
      ...old,
      detailTargetMathKnowledgeConcept: initialMathKnowledgeConceptPageStoreState.detailTargetMathKnowledgeConcept,
      detailFormState: initialMathKnowledgeConceptPageStoreState.detailFormState,
      detailFormStateReference: initialMathKnowledgeConceptPageStoreState.detailFormStateReference,
    }), false, 'clearDetailTargetMathKnowledgeConcept');
  },
  setDetailTargetMathKnowledgeConcept: detailTargetMathKnowledgeConcept => {
    set(old => ({
      ...old,
      detailTargetMathKnowledgeConcept,
      detailFormState: parseKC1ToDetailFormState(detailTargetMathKnowledgeConcept),
      detailFormStateReference: {
        achievement: {
          achievement1: undefined,
          achievement2: undefined,
          achievement3: {
            id: detailTargetMathKnowledgeConcept.achievement3_id,
            title: detailTargetMathKnowledgeConcept.achievement3.title,
          },
        },
      },
    }), false, 'setDetailTargetMathKnowledgeConcept');
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
      detailFormStateReference: callback(old.detailFormStateReference),
    }));
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

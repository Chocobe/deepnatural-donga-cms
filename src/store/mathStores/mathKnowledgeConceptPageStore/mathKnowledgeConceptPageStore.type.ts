// type
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
  TRetrieveMathKnowledgeConceptsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathKnowledgeConceptFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathKnowledgeConceptPageStoreState = {
  searchParamsForRetrieveMathKnowledgeConceptsApi: TRetrieveMathKnowledgeConceptsApiRequestParams['searchParams'];

  mathKnowledgeConceptsData?: TRetrieveMathKnowledgeConceptsApiResponse;

  selectedMathKnowledgeConcepts?: TMathKnowledgeConceptFlattenModel[];
};

export const initialMathKnowledgeConceptPageStoreState: TMathKnowledgeConceptPageStoreState = {
  searchParamsForRetrieveMathKnowledgeConceptsApi: {
    page: undefined,
    search: undefined,
  },

  mathKnowledgeConceptsData: undefined,

  selectedMathKnowledgeConcepts: undefined,
} as const;

export type TMathKnowledgeConceptPageStoreAction = {
  clearMathKnowledgeConceptPageStoreState: () => void;

  clearSearchParamsForRetrieveMathKnowledgeConceptsApi: () => void;
  updateSearchParamsForRetrieveMathKnowledgeConceptsApi: (
    callback: (
      searchParamsForRetrieveMathKnowledgeConceptsApi: TMathKnowledgeConceptPageStoreState['searchParamsForRetrieveMathKnowledgeConceptsApi']
    ) => TMathKnowledgeConceptPageStoreState['searchParamsForRetrieveMathKnowledgeConceptsApi']
  ) => void;

  clearMathKnowledgeConceptsData: () => void;
  setMathKnowledgeConceptsData: (mathKnowledgeConceptsData: TRetrieveMathKnowledgeConceptsApiResponse) => void;

  clearSelectedMathKnowledgeConcepts: () => void;
  setSelectedMathKnowledgeConcepts: (selectedMathKnowledgeConcepts: TMathKnowledgeConceptFlattenModel[]) => void;
};

export type TMathKnowledgeConceptPageStore =
  & TMathKnowledgeConceptPageStoreState
  & TMathKnowledgeConceptPageStoreAction;

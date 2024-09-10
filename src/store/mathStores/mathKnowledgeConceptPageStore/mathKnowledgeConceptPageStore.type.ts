// type
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
  TRetrieveMathKnowledgeConceptsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathKnowledgeConcept1Model,
  TMathKnowledgeConcept2Model,
  TMathKnowledgeConceptFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathKnowledgeConceptPageStoreDetailKC2 =
  & Omit<TMathKnowledgeConcept2Model, 'id' | 'achievement3'>
  & Partial<Pick<TMathKnowledgeConcept2Model, 'id' | 'achievement3'>>;

export type TMathKnowledgeConceptPageStoreDetailKC1 =
  & Omit<TMathKnowledgeConcept1Model, 'id' | 'kc2_set'>
  & Partial<Pick<TMathKnowledgeConcept1Model, 'id'>>
  & {
    kc2_set: TMathKnowledgeConceptPageStoreDetailKC2[];
  };

export type TMathKnowledgeConceptPageStoreState = {
  searchParamsForRetrieveMathKnowledgeConceptsApi: TRetrieveMathKnowledgeConceptsApiRequestParams['searchParams'];

  mathKnowledgeConceptsData?: TRetrieveMathKnowledgeConceptsApiResponse;

  detailTargetMathKnowledgeConcept?: TMathKnowledgeConcept1Model;
  detailFormState: TMathKnowledgeConceptPageStoreDetailKC1;

  selectedMathKnowledgeConcepts?: TMathKnowledgeConceptFlattenModel[];
};

export const initialMathKnowledgeConceptPageStoreDetailKC2: TMathKnowledgeConceptPageStoreDetailKC2 = {
  id: undefined,
  title: '',
  comment: '',
  achievement3: undefined,
};

export const initialMathKnowledgeConceptPageStoreDetailKC1: TMathKnowledgeConceptPageStoreDetailKC1 = {
  id: undefined,
  title: '',
  comment: '',
  kc2_set: [],
};

export const initialMathKnowledgeConceptPageStoreState: TMathKnowledgeConceptPageStoreState = {
  searchParamsForRetrieveMathKnowledgeConceptsApi: {
    page: undefined,
    search: undefined,
  },

  mathKnowledgeConceptsData: undefined,

  detailTargetMathKnowledgeConcept: undefined,
  detailFormState: {
    id: undefined,
    title: '',
    comment: '',
    kc2_set: [
      {
        id: undefined,
        title: '',
        comment: '',
        achievement3: undefined,
      },
    ],
  },

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

  clearDetailTargetMathKnowledgeConcept: () => void;
  setDetailTargetMathKnowledgeConcept: (detailTargetMathKnowledgeConcept: TMathKnowledgeConcept1Model) => void
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathKnowledgeConceptPageStoreState['detailFormState']>
    ) => Partial<TMathKnowledgeConceptPageStoreState['detailFormState']>
  ) => void;

  clearSelectedMathKnowledgeConcepts: () => void;
  setSelectedMathKnowledgeConcepts: (selectedMathKnowledgeConcepts: TMathKnowledgeConceptFlattenModel[]) => void;
};

export type TMathKnowledgeConceptPageStore =
  & TMathKnowledgeConceptPageStoreState
  & TMathKnowledgeConceptPageStoreAction;

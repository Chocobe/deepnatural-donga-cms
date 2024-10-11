// type
import { 
  TRetrieveMathKnowledgeConceptApiResponse,
  TRetrieveMathKnowledgeConceptsApiRequestParams,
  TRetrieveMathKnowledgeConceptsApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  TMathAchievementFlattenModel,
  TMathKnowledgeConcept1Model,
  TMathKnowledgeConcept2Model,
  TMathKnowledgeConceptFlattenModel,
} from '@/apis/models/mathModel.type';

export type TMathKnowledgeConceptPageStoreDetailKC2 =
  & Pick<TMathKnowledgeConcept2Model, 'title' | 'comment'>
  & Partial<Pick<TMathKnowledgeConcept2Model, 'id'>>;

export type TMathKnowledgeConceptPageStoreDetailKC1 =
  & Pick<TMathKnowledgeConcept1Model, 'title' | 'comment'>
  & Partial<Pick<TMathKnowledgeConcept1Model, 'id'>>
  & {
    achievement3_id?: number;
    kc2_set: TMathKnowledgeConceptPageStoreDetailKC2[];
  };

export type TMathKnowledgeConceptPageStoreState = {
  searchParamsForRetrieveMathKnowledgeConceptsApi: TRetrieveMathKnowledgeConceptsApiRequestParams['searchParams'];

  mathKnowledgeConceptsData?: TRetrieveMathKnowledgeConceptsApiResponse;

  detailTargetMathKnowledgeConcept?: TRetrieveMathKnowledgeConceptApiResponse;
  detailFormState: TMathKnowledgeConceptPageStoreDetailKC1;
  detailFormStateReference: {
    achievement?: TMathAchievementFlattenModel;
  };

  selectedMathKnowledgeConcepts?: TMathKnowledgeConceptFlattenModel[];
};

export const initialMathKnowledgeConceptPageStoreDetailKC2: TMathKnowledgeConceptPageStoreDetailKC2 = {
  id: undefined,
  title: '',
  comment: '',
};

export const initialMathKnowledgeConceptPageStoreDetailKC1: TMathKnowledgeConceptPageStoreDetailKC1 = {
  id: undefined,
  title: '',
  comment: '',
  achievement3_id: undefined,
  kc2_set: [],
};

export const initialMathKnowledgeConceptPageStoreState: TMathKnowledgeConceptPageStoreState = {
  searchParamsForRetrieveMathKnowledgeConceptsApi: {
    achievement1_classtype: undefined,
    achievement1_curriculum: undefined,
    achievement1_grade_cluster: undefined,
    chapter_title: undefined,
    kc1_title: undefined,
    kc2_title: undefined,
    kc_search: undefined,
    page: undefined,
  },

  mathKnowledgeConceptsData: undefined,

  detailTargetMathKnowledgeConcept: undefined,
  detailFormState: {
    id: undefined,
    title: '',
    comment: '',
    achievement3_id: undefined,
    kc2_set: [
      {
        id: undefined,
        title: '',
        comment: '',
      },
    ],
  },
  detailFormStateReference: {
    achievement: undefined,
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
  setDetailTargetMathKnowledgeConcept: (detailTargetMathKnowledgeConcept: TRetrieveMathKnowledgeConceptApiResponse) => void
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathKnowledgeConceptPageStoreState['detailFormState']>
    ) => Partial<TMathKnowledgeConceptPageStoreState['detailFormState']>
  ) => void;
  updateDetailFormStateReference: (
    callback: (
      reference: TMathKnowledgeConceptPageStoreState['detailFormStateReference']
    ) => TMathKnowledgeConceptPageStoreState['detailFormStateReference']
  ) => void;

  clearSelectedMathKnowledgeConcepts: () => void;
  setSelectedMathKnowledgeConcepts: (selectedMathKnowledgeConcepts: TMathKnowledgeConceptFlattenModel[]) => void;
};

export type TMathKnowledgeConceptPageStore =
  & TMathKnowledgeConceptPageStoreState
  & TMathKnowledgeConceptPageStoreAction;

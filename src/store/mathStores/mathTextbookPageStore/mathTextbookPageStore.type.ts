// type
import { 
  TRetrieveMathTextbooksApiRequestParams,
  TRetrieveMathTextbooksApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  // cmsCommonModelSubjectMapper,
  cmsClassTypeMapper,
  cmsElementaryGradeMapper,
  cmsTermMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathCurriculumMapper,
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';

export type TMathTextbookPageStoreState = {
  searchParamsForRetrieveMathTextbooksApi: TRetrieveMathTextbooksApiRequestParams['searchParams'];

  mathTextbooksData?: TRetrieveMathTextbooksApiResponse;

  detailTargetMathTextbook?: TMathTextbookModel;
  detailFormState: 
    & Omit<TMathTextbookModel, 'id'> 
    & Partial<Pick<TMathTextbookModel, 'id'>>;

  selectedMathTextbooks?: TMathTextbookModel[];
};

export const initialMathTextbookPageStoreState: TMathTextbookPageStoreState = {
  searchParamsForRetrieveMathTextbooksApi: {
    classtype: undefined,
    curriculum: undefined,
    grade: undefined,
    term: undefined,
    author: undefined,
    title: undefined,
    page: undefined,
  },

  mathTextbooksData: undefined,

  detailTargetMathTextbook: undefined,
  detailFormState: {
    id: undefined,
    curriculum: mathCurriculumMapper[2015],
    title: '',
    author: '',
    classtype: cmsClassTypeMapper.ELEMENTARY,
    grade: cmsElementaryGradeMapper.COMMON,
    term: cmsTermMapper.COMMON,
  },

  selectedMathTextbooks: undefined,
} as const;

export type TMathTextbookPageStoreAction = {
  clearMathTextbookPageStore: () => void;

  clearSearchParamsForRetrieveMathTextbooksApi: () => void;
  updateSearchParamsForRetrieveMathTextbooksApi: (
    callback: (
      searchParamsFormRetrieveMathTextbooksApi: TMathTextbookPageStoreState['searchParamsForRetrieveMathTextbooksApi']
    ) => TMathTextbookPageStoreState['searchParamsForRetrieveMathTextbooksApi']
  ) => void;

  clearMathTextbooksData: () => void;
  setMathTextbooksData: (mathTextbooksData: TRetrieveMathTextbooksApiResponse) => void;

  clearDetailTargetMathTextbook: () => void;
  setDetailTargetMathTextbook: (mathTextbook: TMathTextbookModel) => void;
  updateDetailTargetMathTextbook: (
    callback: (detailTargetMathTextbook?: TMathTextbookModel) => TMathTextbookModel
  ) => void;

  clearDetailFormState: () => void;
  setDetailFormState: (
    detailFormState: Partial<TMathTextbookPageStoreState['detailFormState']>
  ) => void;
  updateDetailFormState: (
    callback: (
      detailFormState: Partial<TMathTextbookPageStoreState['detailFormState']>
    ) => Partial<TMathTextbookPageStoreState['detailFormState']>
  ) => void;

  clearSelectedMathTextbooks: () => void;
  setSelectedMathTextbooks: (selectedMathTextbooks: TMathTextbookModel[]) => void;
};

export type TMathTextbookPageStore = 
  & TMathTextbookPageStoreState 
  & TMathTextbookPageStoreAction;

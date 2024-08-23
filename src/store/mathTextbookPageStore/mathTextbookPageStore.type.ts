// type
import { 
  TRetrieveMathTextbooksApiResponse,
} from '@/apis/math/mathApi.type';
import { 
  cmsCommonModelSubjectMapper,
  cmsCommonModelClassTypeMapper,
  cmsCommonModelElementaryGradeMapper,
  cmsCommonModelTermMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  mathTextbookModelCurriculumMapper,
  TMathTextbookModel,
} from '@/apis/models/mathModel.type';

export type TMathTextbookPageStoreState = {
  mathTextbooksData?: TRetrieveMathTextbooksApiResponse;

  detailTargetMathTextbook?: TMathTextbookModel;
  detailFormState: 
    & Omit<TMathTextbookModel, 'id'> 
    & Partial<Pick<TMathTextbookModel, 'id'>>;

  selectedMathTextbooks?: TMathTextbookModel[];
};

export const initialMathTextbookPageStoreState: TMathTextbookPageStoreState = {
  mathTextbooksData: undefined,

  detailTargetMathTextbook: undefined,
  detailFormState: {
    id: undefined,
    subject: cmsCommonModelSubjectMapper.MATH,
    curriculum: mathTextbookModelCurriculumMapper[2015],
    title: '',
    author: '',
    classtype: cmsCommonModelClassTypeMapper.ELEMENTARY,
    grade: cmsCommonModelElementaryGradeMapper[1],
    term: cmsCommonModelTermMapper.COMMON,
  },

  selectedMathTextbooks: undefined,
} as const;

export type TMathTextbookPageStoreAction = {
  clearMathTextbookPageStore: () => void;

  clearMathTextbooksData: () => void;
  setMathTextbooksData: (mathTextbooksData: TRetrieveMathTextbooksApiResponse) => void;

  clearDetailTargetMathTextbook: () => void;
  setDetailTargetMathTextbook: (mathTextbook: TMathTextbookModel) => void;

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

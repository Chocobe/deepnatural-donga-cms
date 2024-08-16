// type
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

export type TMathTextbookDetailStoreState = {
  selectedMathTextbook?: TMathTextbookModel;
  formState: 
    & Omit<TMathTextbookModel, 'id'> 
    & Partial<Pick<TMathTextbookModel, 'id'>>;
};

export const initialMathTextbookDetailStoreState: TMathTextbookDetailStoreState = {
  selectedMathTextbook: undefined,
  formState: {
    id: undefined,
    subject: cmsCommonModelSubjectMapper.MATH,
    curriculum: mathTextbookModelCurriculumMapper[2015],
    title: '',
    author: '',
    classType: cmsCommonModelClassTypeMapper.ELEMENTARY,
    grade: cmsCommonModelElementaryGradeMapper[1],
    term: cmsCommonModelTermMapper.COMMON,
  },
} as const;

export type TMathTextbookDetailStoreAction = {
  clearMathTextbookDetailStore: () => void;

  setSelectedMathTextbook: (mathTextbook: TMathTextbookModel) => void;
  clearSelectedMathTextbook: () => void;

  setFormState: (
    formState: Partial<TMathTextbookDetailStoreState['formState']>
  ) => void;
  clearFormState: () => void;
};

export type TMathTextbookDetailStore = 
  & TMathTextbookDetailStoreState 
  & TMathTextbookDetailStoreAction;

// --- --- --- --- --- --- --- --- --- ---
//
// 수학 CMS type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

// type
import { 
  cmsCommonModelClassTypeMapper,
  cmsCommonModelSubjectMapper,
  TCMSCommonModelClassType,
  TCMSCommonModelElementaryGrade,
  TCMSCommonModelMiddleHighGrade,
  TCMSCommonModelTerm,
} from './cmsCommonModel.type';

//
// Math Textbook (수학 교과서)
//
// 커리큘럼
export const mathTextbookModelCurriculumMapper = {
  '2015': '2015',
  '2022': '2022',
} as const;
export type TMathTextbookModelCurriculum = typeof mathTextbookModelCurriculumMapper[keyof typeof mathTextbookModelCurriculumMapper];

type TMathTextbookGenericModel<T extends TCMSCommonModelClassType> = {
  id: string;
  // 과목
  subject: typeof cmsCommonModelSubjectMapper.MATH;
  // 교육과정
  curriculum: TMathTextbookModelCurriculum;
  // 교과서명
  title: string;
  // 저자
  author: string;
  // 학교급
  classType: T;
  // 학년
  grade: number;
  // 학기
  term: TCMSCommonModelTerm;
};

type TMathTextbookElementaryModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.ELEMENTARY
> & {
  grade: TCMSCommonModelElementaryGrade;
};

type TMathTextbookMiddleModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.MIDDLE
> & {
  grade: TCMSCommonModelMiddleHighGrade;
};

type TMathTextbookHighModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.HIGH
> & {
  grade: TCMSCommonModelMiddleHighGrade;
};

export type TMathTextbookModel =
  | TMathTextbookElementaryModel
  | TMathTextbookMiddleModel
  | TMathTextbookHighModel;

// --- --- --- --- --- --- --- --- --- ---
//
// 수학 CMS model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

// type
import { 
  cmsCommonModelClassTypeMapper,
  // cmsCommonModelSubjectMapper,
  TCMSCommonModelClassType,
  TCMSCommonModelElementaryGrade,
  TCMSCommonModelMiddleHighGrade,
  TCMSCommonModelTerm,
} from './cmsCommonModel.type';

/**
 * Math Textbook (수학 교과서)
 */
/** Math Textbook (수학 교과서) - 커리큘럼 */
export const mathTextbookModelCurriculumMapper = {
  '2015': '2015',
  '2022': '2022',
} as const;
export type TMathTextbookModelCurriculum = typeof mathTextbookModelCurriculumMapper[keyof typeof mathTextbookModelCurriculumMapper];

type TMathTextbookGenericModel<T extends TCMSCommonModelClassType> = {
  id: string;
  // TODO: 아직 API 미지원 속성
  /** 과목 */
  // subject: typeof cmsCommonModelSubjectMapper.MATH;

  /** 교육과정 */
  curriculum: TMathTextbookModelCurriculum;
  /** 교과서명 */
  title: string;
  /** 저자 */
  author: string;
  /** 학교급 */
  classtype: T;
  /** 학년 */
  grade: number;
  /** 학기 */
  term: TCMSCommonModelTerm;
};

/** Math Textbook (수학 교과서) - 초등 수학 교과서 */
type TMathTextbookElementaryModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.ELEMENTARY
> & {
  grade: TCMSCommonModelElementaryGrade;
};

/** Math Textbook (수학 교과서) - 중등 수학 교과서 */
type TMathTextbookMiddleModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.MIDDLE
> & {
  grade: TCMSCommonModelMiddleHighGrade;
};

/** Math Textbook (수학 교과서) - 고등 수학 교과서 */
type TMathTextbookHighModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.HIGH
> & {
  grade: TCMSCommonModelMiddleHighGrade;
};

/** 수학 교과서 */
export type TMathTextbookModel =
  | TMathTextbookElementaryModel
  | TMathTextbookMiddleModel
  | TMathTextbookHighModel;



/**
 * Math Chapter (수학 교과서 대/중/소 단원)
 */
/** 수학 교과서 단원 공통 속성 */
export type TMathChapterCommonModel = {
  id: number;
  /** 단원명 */
  title: string;
  /** 순서 */
  no: string;
};

/** 수학 교과서 소단원 */
export type TMathChapter3Model = TMathChapterCommonModel;

/** 수학 교과서 중단원 */
export type TMathChapter2Model = TMathChapterCommonModel & {
  /** 소단원 목록 */
  chapter3_set: TMathChapter3Model[];
};

/** 수학 교과서 대단원 */
export type TMathChapter1Model = TMathChapterCommonModel & {
  /** 교과서명 */
  textbook_title: string;
  /** 중단원 목록 */
  chapter2_set: TMathChapter2Model[];
};

/** 수학 교과서 평탄화 모델 */
export type TMathChapterFlattenModel = {
  /** 대단원 정보 */
  chapter1: TMathChapter1Model;
  /** 중단원 정보 */
  chapter2: TMathChapter2Model;
  /** 소단원 정보 */
  chapter3?: TMathChapter3Model;
};

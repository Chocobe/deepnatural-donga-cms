// --- --- --- --- --- --- --- --- --- ---
//
// CMS 공통 model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

/**
 * 과목
 */
export const cmsCommonModelSubjectMapper = {
  MATH: '수학',
  ENGLISH: '영어',
} as const;
export type TCMSCommonModelSubject = typeof cmsCommonModelSubjectMapper[keyof typeof cmsCommonModelSubjectMapper];

/**
 * 학교급
 */
export const cmsCommonModelClassTypeMapper = {
  ELEMENTARY: '초등',
  MIDDLE: '중등',
  HIGH: '고등',
} as const;
export type TCMSCommonModelClassType = typeof cmsCommonModelClassTypeMapper[keyof typeof cmsCommonModelClassTypeMapper];

/** 
 * 학년 - 초등 
 */
export const cmsCommonModelElementaryGradeMapper = {
  COMMON: 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
} as const;
export type TCMSCommonModelElementaryGrade = typeof cmsCommonModelElementaryGradeMapper[keyof typeof cmsCommonModelElementaryGradeMapper];

/** 
 * 학년 - 중고등 
 */
export const cmsCommonModelMiddleHighGradeMapper = {
  COMMON: 0,
  '1': 1,
  '2': 2,
  '3': 3,
} as const;
export type TCMSCommonModelMiddleHighGrade = typeof cmsCommonModelMiddleHighGradeMapper[keyof typeof cmsCommonModelMiddleHighGradeMapper];

/**
 * 학기
 */
export const cmsCommonModelTermMapper = {
  COMMON: 0,
  FIRST_TERM: 1,
  SECOND_TERM: 2,
} as const;
export type TCMSCommonModelTerm = typeof cmsCommonModelTermMapper[keyof typeof cmsCommonModelTermMapper];

/**
 * 페이지네이션
 */
export type TPaginationModel<TListItemModel> = {
  /** 현재 페이지 번호 */
  current_page: number;
  /** 마지막 페이지 번호 */
  last_page: number;
  /** 페이지당 데이터 개수 */
  page_size: number;
  /** (페이지네이션 미적용) 전체 데이터 개수 */
  count: number;
  /** 이전 페이지네이션 api path */
  previous: string | null;
  /** 다음 페이지네이션 api path */
  next: string | null;
  /** 데이터 목록 */
  results: TListItemModel[];
};

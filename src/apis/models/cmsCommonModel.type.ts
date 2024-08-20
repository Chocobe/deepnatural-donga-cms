// --- --- --- --- --- --- --- --- --- ---
//
// CMS 공통 model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

//
// 과목
//
export const cmsCommonModelSubjectMapper = {
  MATH: '수학',
  ENGLISH: '영어',
} as const;
export type TCMSCommonModelSubject = typeof cmsCommonModelSubjectMapper[keyof typeof cmsCommonModelSubjectMapper];

//
// 학교급
//
export const cmsCommonModelClassTypeMapper = {
  ELEMENTARY: '초등',
  MIDDLE: '중등',
  HIGH: '고등',
} as const;
export type TCMSCommonModelClassType = typeof cmsCommonModelClassTypeMapper[keyof typeof cmsCommonModelClassTypeMapper];

//
// 학교급 - 초등
//
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

//
// 학교급 - 중고등
//
export const cmsCommonModelMiddleHighGradeMapper = {
  COMMON: 0,
  '1': 1,
  '2': 2,
  '3': 3,
} as const;
export type TCMSCommonModelMiddleHighGrade = typeof cmsCommonModelMiddleHighGradeMapper[keyof typeof cmsCommonModelMiddleHighGradeMapper];

//
// 학기
//
export const cmsCommonModelTermMapper = {
  COMMON: 0,
  FIRST_TERM: 1,
  SECOND_TERM: 2,
} as const;
export type TCMSCommonModelTerm = typeof cmsCommonModelTermMapper[keyof typeof cmsCommonModelTermMapper];

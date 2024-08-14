export const cmsCommonModelSubjectMapper = {
  MATH: '수학',
  ENGLISH: '영어',
} as const;
export type TCMSCommonModelSubject = typeof cmsCommonModelSubjectMapper[keyof typeof cmsCommonModelSubjectMapper];

export const cmsCommonModelClassTypeMapper = {
  ELEMENTARY: '초등',
  MIDDLE: '중등',
  HIGH: '고등',
} as const;
export type TCMSCommonModelClassType = typeof cmsCommonModelClassTypeMapper[keyof typeof cmsCommonModelClassTypeMapper];

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

export const cmsCommonModelMiddleHighGradeMapper = {
  COMMON: 0,
  '1': 1,
  '2': 2,
  '3': 3,
} as const;
export type TCMSCommonModelMiddleHighGrade = typeof cmsCommonModelMiddleHighGradeMapper[keyof typeof cmsCommonModelMiddleHighGradeMapper];

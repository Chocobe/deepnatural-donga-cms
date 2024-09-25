// --- --- --- --- --- --- --- --- --- ---
//
// CMS 공통 model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const SELECT_OPTION_ITEM_ALL: TCommonSelectOptionItem = {
  text: 'All',
  value: ' ',
} as const;

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

/**
 * 과목
 */
export const cmsSubjectMapper = {
  MATH: '수학',
  ENGLISH: '영어',
} as const;
export type TCMSSubject = typeof cmsSubjectMapper[keyof typeof cmsSubjectMapper];

/**
 * 학교급
 */
export const cmsClassTypeMapper = {
  ELEMENTARY: '초등',
  MIDDLE: '중등',
  HIGH: '고등',
} as const;
export type TCMSClassType = typeof cmsClassTypeMapper[keyof typeof cmsClassTypeMapper];

export const cmsClassTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: '초등학교',
    value: cmsClassTypeMapper.ELEMENTARY,
  },
  {
    text: '중학교',
    value: cmsClassTypeMapper.MIDDLE,
  },
  {
    text: '고등학교',
    value: cmsClassTypeMapper.HIGH,
  },
] as const;

export const cmsClassTypeFilterOptions: TCommonSelectOptionItem[] = [
  {
    ...SELECT_OPTION_ITEM_ALL,
  },
  ...cmsClassTypeOptions,
] as const;

/** 
 * 학년 - 초등 
 */
export const cmsElementaryGradeMapper = {
  COMMON: 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
} as const;
export type TCMSElementaryGrade = typeof cmsElementaryGradeMapper[keyof typeof cmsElementaryGradeMapper];

/** 
 * 학년 - 중고등 
 */
export const cmsMiddleHighGradeMapper = {
  COMMON: 0,
  '1': 1,
  '2': 2,
  '3': 3,
} as const;
export type TCMSMiddleHighGrade = typeof cmsMiddleHighGradeMapper[keyof typeof cmsMiddleHighGradeMapper];

/**
 * 학년 - 템플릿
 */
export const cmsGradeTemplate = Object
  .values(cmsElementaryGradeMapper)
  .reduce((template, grade) => {
    return {
      ...template,
      [grade]: grade === 0
        ? '공통'
        : `${grade}학년`,
    };
  }, {} as {
    [grade: string]: string;
  });

export const cmsGradeOptions: {
  [cmsClassTypeMapper.ELEMENTARY]: TCommonSelectOptionItem[];
  [cmsClassTypeMapper.MIDDLE]: TCommonSelectOptionItem[];
  [cmsClassTypeMapper.HIGH]: TCommonSelectOptionItem[];
} = {
  [cmsClassTypeMapper.ELEMENTARY]: Object
    .values(cmsElementaryGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsElementaryGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
  [cmsClassTypeMapper.MIDDLE]: Object
    .values(cmsMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsMiddleHighGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
  [cmsClassTypeMapper.HIGH]: Object
    .values(cmsMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsMiddleHighGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
} as const;

export const cmsGradeFilterOptions: typeof cmsGradeOptions & {
  [' ']: TCommonSelectOptionItem[];
} = {
  [' ']: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsClassTypeMapper.ELEMENTARY],
  ],
  [cmsClassTypeMapper.ELEMENTARY]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsClassTypeMapper.ELEMENTARY],
  ],
  [cmsClassTypeMapper.MIDDLE]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsClassTypeMapper.MIDDLE],
  ],
  [cmsClassTypeMapper.HIGH]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsClassTypeMapper.HIGH],
  ],
} as const;

/**
 * 학년(군)
 */
export const cmsGradeClusterMapper = {
  ELECTIVE_SUBJECT: '선택과목',
  COMMON_SUBJECT: '공통과목',
  ELEMENTARY_3_4: '초3~4',
  ELEMENTARY_5_6: '초5~6',
  MIDDLE: '중1~3',
} as const;
export type TCMSGradeCluster = typeof cmsGradeClusterMapper[keyof typeof cmsGradeClusterMapper];

export const cmsGradeClusterOptions: {
  [cmsClassTypeMapper.ELEMENTARY]: TCommonSelectOptionItem[];
  [cmsClassTypeMapper.MIDDLE]: TCommonSelectOptionItem[];
  [cmsClassTypeMapper.HIGH]: TCommonSelectOptionItem[];
} = (() => {
  return {
    [cmsClassTypeMapper.ELEMENTARY]: [
      {
        text: cmsGradeClusterMapper.ELEMENTARY_3_4,
        value: cmsGradeClusterMapper.ELEMENTARY_3_4,
      },
      {
        text: cmsGradeClusterMapper.ELEMENTARY_5_6,
        value: cmsGradeClusterMapper.ELEMENTARY_5_6,
      },
    ],
    [cmsClassTypeMapper.MIDDLE]: [
      {
        text: cmsGradeClusterMapper.MIDDLE,
        value: cmsGradeClusterMapper.MIDDLE,
      },
    ],
    [cmsClassTypeMapper.HIGH]: [
      {
        text: cmsGradeClusterMapper.ELECTIVE_SUBJECT,
        value: cmsGradeClusterMapper.ELECTIVE_SUBJECT,
      },
      {
        text: cmsGradeClusterMapper.COMMON_SUBJECT,
        value: cmsGradeClusterMapper.COMMON_SUBJECT,
      },
    ],
  } as const;
})();

export const cmsGradeClusterFilterOptions: typeof cmsGradeClusterOptions & {
  [' ']: TCommonSelectOptionItem[];
} = {
  [' ']: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeClusterOptions[cmsClassTypeMapper.ELEMENTARY],
    ...cmsGradeClusterOptions[cmsClassTypeMapper.MIDDLE],
    ...cmsGradeClusterOptions[cmsClassTypeMapper.HIGH],
  ],
  [cmsClassTypeMapper.ELEMENTARY]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeClusterOptions[cmsClassTypeMapper.ELEMENTARY],
  ],
  [cmsClassTypeMapper.MIDDLE]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeClusterOptions[cmsClassTypeMapper.MIDDLE],
  ],
  [cmsClassTypeMapper.HIGH]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeClusterOptions[cmsClassTypeMapper.HIGH],
  ],
} as const;

/**
 * 학기
 */
export const cmsTermMapper = {
  COMMON: 0,
  FIRST_TERM: 1,
  SECOND_TERM: 2,
} as const;
export type TCMSTerm = typeof cmsTermMapper[keyof typeof cmsTermMapper];

/**
 * 학기 - 템플릿
 */
export const cmsTermTemplate = Object
  .values(cmsTermMapper)
  .reduce((template, term) => {
    return {
      ...template,
      [term]: term === 0
        ? '공통'
        : `${term}학기`,
    };
  }, {} as {
    [term: string]: string;
  });

export const cmsTermOptions: TCommonSelectOptionItem[] = Object
  .values(cmsTermMapper)
  .sort((a, b) => a - b > 0 ? 1 : -1)
  .map(term => ({
    text: term === cmsTermMapper.COMMON
      ? '공통'
      : `${term}학기`,
    value: String(term),
  }));

export const cmsTermFilterOptions: TCommonSelectOptionItem[] = [
  {
    ...SELECT_OPTION_ITEM_ALL,
  },
  ...cmsTermOptions,
] as const;

/**
 * 출처 분류
 */
export const cmsSourceTypeMapper = {
  '교사용부록':  '교사용부록',
  '본책':  '본책',
  '유형북':  '유형북',
  '실전북':  '실전북',
  '개념북':  '개념북',
  '워크북':  '워크북',
  '학생용부록':  '학생용부록',
  '진도북':  '진도북',
  '매칭북':  '매칭북',
  '서술형':  '서술형',
  '단원평가':  '단원평가',
  '기말고사':  '기말고사',
  '기타':  '기타',

  // FIXME: scheme에 없음 => 응답에 있음
  // FIXME: `string`이 아닌 `Enum` 으로 정의해도 될지 확인 필요
  '교사용 지도자료': '교사용 지도자료',
  '자습서': '자습서',
  '평가문제집': '평가문제집',
  '응용강화북': '응용강화북',
  '경시대비북': '경시대비북',
  '중간고사': '중간고사',
  '평가북': '평가북',
  '서술형평가': '서술형평가',
} as const;
export type TCmsSourceType = typeof cmsSourceTypeMapper[keyof typeof cmsSourceTypeMapper];

export const cmsSourceTypeOptions: TCommonSelectOptionItem[] = Object
  .entries(cmsSourceTypeMapper)
  .map((([text, value]) => ({
    text,
    value,
  })));

/**
 * 난이도
 */
export const cmsDifficultyMapper = {
  /** 최하 */
  '1': 1,
  /** 하 */
  '2': 2,
  /** 중 */
  '3': 3,
  /** 상 */
  '4': 4,
  /** 최상 */
  '5': 5,
} as const;
export type TCMSDifficulty = typeof cmsDifficultyMapper[keyof typeof cmsDifficultyMapper];

export const cmsDifficultyTemplate = {
  [cmsDifficultyMapper[1]]: '최하',
  [cmsDifficultyMapper[2]]: '하',
  [cmsDifficultyMapper[3]]: '중',
  [cmsDifficultyMapper[4]]: '상',
  [cmsDifficultyMapper[5]]: '최상',
} as const;

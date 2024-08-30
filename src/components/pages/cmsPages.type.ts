// type
import { 
  cmsClassTypeMapper,
  cmsElementaryGradeMapper,
  cmsMiddleHighGradeMapper, 
  cmsTermMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TCommonSelectOptionItem,
} from '../shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const SELECT_OPTION_ITEM_ALL: TCommonSelectOptionItem = {
  text: 'All',
  value: ' ',
} as const;

//
// 학교급 선택지
//
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

//
// 학년 선택지
//
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
  ],
  [cmsClassTypeMapper.ELEMENTARY]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsClassTypeMapper.ELEMENTARY]
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

//
// 학기 선택지
//
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

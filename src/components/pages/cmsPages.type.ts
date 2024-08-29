// type
import { 
  cmsCommonModelClassTypeMapper,
  cmsCommonModelElementaryGradeMapper,
  cmsCommonModelMiddleHighGradeMapper, 
  cmsCommonModelTermMapper,
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
    value: cmsCommonModelClassTypeMapper.ELEMENTARY,
  },
  {
    text: '중학교',
    value: cmsCommonModelClassTypeMapper.MIDDLE,
  },
  {
    text: '고등학교',
    value: cmsCommonModelClassTypeMapper.HIGH,
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
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: TCommonSelectOptionItem[];
  [cmsCommonModelClassTypeMapper.MIDDLE]: TCommonSelectOptionItem[];
  [cmsCommonModelClassTypeMapper.HIGH]: TCommonSelectOptionItem[];
} = {
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: Object
    .values(cmsCommonModelElementaryGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsCommonModelElementaryGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
  [cmsCommonModelClassTypeMapper.MIDDLE]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsCommonModelMiddleHighGradeMapper.COMMON
        ? '공통'
        : `${grade}학년`,
      value: String(grade),
    })),
  [cmsCommonModelClassTypeMapper.HIGH]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .map(grade => ({
      text: grade === cmsCommonModelMiddleHighGradeMapper.COMMON
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
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsCommonModelClassTypeMapper.ELEMENTARY]
  ],
  [cmsCommonModelClassTypeMapper.MIDDLE]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsCommonModelClassTypeMapper.MIDDLE],
  ],
  [cmsCommonModelClassTypeMapper.HIGH]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...cmsGradeOptions[cmsCommonModelClassTypeMapper.HIGH],
  ],
} as const;

//
// 학기 선택지
//
export const cmsTermOptions: TCommonSelectOptionItem[] = Object
  .values(cmsCommonModelTermMapper)
  .sort((a, b) => a - b > 0 ? 1 : -1)
  .map(term => ({
    text: term === cmsCommonModelTermMapper.COMMON
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

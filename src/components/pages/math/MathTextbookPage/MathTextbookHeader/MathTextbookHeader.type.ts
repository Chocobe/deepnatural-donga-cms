// type
import { 
  cmsCommonModelClassTypeMapper,
  cmsCommonModelElementaryGradeMapper,
  cmsCommonModelMiddleHighGradeMapper,
  cmsCommonModelTermMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TFormSelectOptionItem,
} from '@/components/shadcn-ui-custom/FormSelect/FormSelect.type';

// 교과서
export const textbookClassTypeTemplateMapper = {
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: '초등학교',
  [cmsCommonModelClassTypeMapper.MIDDLE]: '중학교',
  [cmsCommonModelClassTypeMapper.HIGH]: '고등학교',
} as const;

export const textbookClassTypeFilterOptions = [
  {
    text: 'All',
    value: ' ',
  },
  {
    text: textbookClassTypeTemplateMapper[cmsCommonModelClassTypeMapper.ELEMENTARY],
    value: cmsCommonModelClassTypeMapper.ELEMENTARY,
  },
  {
    text: textbookClassTypeTemplateMapper[cmsCommonModelClassTypeMapper.MIDDLE],
    value: cmsCommonModelClassTypeMapper.MIDDLE,
  },
  {
    text: textbookClassTypeTemplateMapper[cmsCommonModelClassTypeMapper.HIGH],
    value: cmsCommonModelClassTypeMapper.HIGH,
  },
] as const;

// 학년
export const textbookGradeFilterOptions = {
  [' ']: [
    {
      text: 'All',
      value: ' ',
    },
  ],

  [cmsCommonModelClassTypeMapper.ELEMENTARY]: Object
    .values(cmsCommonModelElementaryGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .reduce((options, grade) => {
      return [
        ...options,
        {
          text: grade === 0 ? '공통' : `${grade}학년`,
          value: String(grade),
        },
      ];
    }, [{
      text: 'All',
      value: ' ',
    }] as TFormSelectOptionItem[]),

  [cmsCommonModelClassTypeMapper.MIDDLE]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .reduce((options, grade) => {
      return [
        ...options,
        {
          text: grade === 0 ? '공통' : `${grade}학년`,
          value: String(grade),
        },
      ];
    }, [{
      text: 'All',
      value: ' ',
    }] as TFormSelectOptionItem[]),

  [cmsCommonModelClassTypeMapper.HIGH]: Object
    .values(cmsCommonModelMiddleHighGradeMapper)
    .sort((a, b) => a - b > 0 ? 1 : -1)
    .reduce((options, grade) => [
      ...options,
      {
        text: grade === 0 ? '공통' : `${grade}학년`,
        value: String(grade),
      },
    ], [{
      text: 'All',
      value: ' ',
    }] as TFormSelectOptionItem[]),
} as const;

// 학기
export const textbookTermFilterOptions = Object
  .values(cmsCommonModelTermMapper)
  .sort((a, b) => a - b > 0 ? 1 : -1)
  .reduce((options, term) => [
    ...options,
    {
      text: term === 0 ? '공통' : `${term}학기`,
      value: String(term),
    },
  ], [{
    text: 'All',
    value: ' ',
  }] as TFormSelectOptionItem[]);

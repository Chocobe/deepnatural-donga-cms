// type
import { 
  cmsCommonModelClassTypeMapper,
} from '@/apis/models/cmsCommonModel.type';
import { 
  textbookGradeOptions, 
  textbookTermOptions,
} from '@/components/pages/cmsPages.type';

const ALL_OPTION_ITEM = {
  text: 'All',
  value: ' ',
} as const;

// 교과서
export const textbookClassTypeTemplateMapper = {
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: '초등학교',
  [cmsCommonModelClassTypeMapper.MIDDLE]: '중학교',
  [cmsCommonModelClassTypeMapper.HIGH]: '고등학교',
} as const;

export const textbookClassTypeFilterOptions = [
  {
    ...ALL_OPTION_ITEM,
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
      ...ALL_OPTION_ITEM,
    },
  ],

  [cmsCommonModelClassTypeMapper.ELEMENTARY]: [
    {
      ...ALL_OPTION_ITEM,
    },
    ...textbookGradeOptions[cmsCommonModelClassTypeMapper.ELEMENTARY],
  ],

  [cmsCommonModelClassTypeMapper.MIDDLE]: [
    {
      ...ALL_OPTION_ITEM,
    },
    ...textbookGradeOptions[cmsCommonModelClassTypeMapper.MIDDLE],
  ],

  [cmsCommonModelClassTypeMapper.HIGH]: [
    {
      ...ALL_OPTION_ITEM,
    },
    ...textbookGradeOptions[cmsCommonModelClassTypeMapper.HIGH],
  ],
} as const;

// 학기
export const textbookTermFilterOptions = [
  {
    ...ALL_OPTION_ITEM,
  },
  ...textbookTermOptions,
] as const;

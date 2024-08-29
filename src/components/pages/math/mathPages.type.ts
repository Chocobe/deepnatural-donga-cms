// type
import { 
  mathTextbookModelCurriculumMapper,
} from '@/apis/models/mathModel.type';
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';
import { 
  SELECT_OPTION_ITEM_ALL,
} from '../cmsPages.type';
import { 
  cmsCommonModelClassTypeMapper,
} from '@/apis/models/cmsCommonModel.type';

//
// 수학 커리큘럼 선택지
//
export const mathCurriculumOptions: TCommonSelectOptionItem[] = [
  {
    text: mathTextbookModelCurriculumMapper[2015],
    value: mathTextbookModelCurriculumMapper[2015],
  },
  {
    text: mathTextbookModelCurriculumMapper[2022],
    value: mathTextbookModelCurriculumMapper[2022],
  },
] as const;

export const mathCurriculumFilterOptions: TCommonSelectOptionItem[] = [
  {
    ...SELECT_OPTION_ITEM_ALL,
  },
  ...mathCurriculumOptions,
] as const;

//
// 수학 성취기준 학년군 선택지
//
export const mathGradeClusterOptions: {
  [cmsCommonModelClassTypeMapper.ELEMENTARY]: TCommonSelectOptionItem[];
  [cmsCommonModelClassTypeMapper.MIDDLE]: TCommonSelectOptionItem[];
  [cmsCommonModelClassTypeMapper.HIGH]: TCommonSelectOptionItem[];
} = (() => {
  const commonOptions: TCommonSelectOptionItem[] = [
    {
      text: '공통과목',
      value: '공통과목',
    },
    {
      text: '선택과목',
      value: '선택과목',
    },
  ] as const;

  return {
    [cmsCommonModelClassTypeMapper.ELEMENTARY]: [
      ...commonOptions,
      {
        text: '초3~4',
        value: '초3~4',
      },
    ],
    [cmsCommonModelClassTypeMapper.MIDDLE]: [
      ...commonOptions,
      {
        text: '중1~3',
        value: '중1~3',
      },
    ],
    [cmsCommonModelClassTypeMapper.HIGH]: [
      ...commonOptions,
    ],
  } as const;
})();

export const mathGradeClusterFilterOptions: typeof mathGradeClusterOptions & {
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
    ...mathGradeClusterOptions[cmsCommonModelClassTypeMapper.ELEMENTARY],
  ],
  [cmsCommonModelClassTypeMapper.MIDDLE]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...mathGradeClusterOptions[cmsCommonModelClassTypeMapper.MIDDLE],
  ],
  [cmsCommonModelClassTypeMapper.HIGH]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...mathGradeClusterOptions[cmsCommonModelClassTypeMapper.HIGH],
  ],
} as const;

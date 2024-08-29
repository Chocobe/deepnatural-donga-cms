// type
import { 
  mathAchievementGradeClusterMapper,
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
      text: mathAchievementGradeClusterMapper.ELECTIVE_SUBJECT,
      value: mathAchievementGradeClusterMapper.ELECTIVE_SUBJECT,
    },
    {
      text: mathAchievementGradeClusterMapper.COMMON_SUBJECT,
      value: mathAchievementGradeClusterMapper.COMMON_SUBJECT,
    },
  ] as const;

  return {
    [cmsCommonModelClassTypeMapper.ELEMENTARY]: [
      ...commonOptions,
      {
        text: mathAchievementGradeClusterMapper.ELEMENTARY_3_4,
        value: mathAchievementGradeClusterMapper.ELEMENTARY_3_4,
      },
      {
        text: mathAchievementGradeClusterMapper.ELEMENTARY_5_6,
        value: mathAchievementGradeClusterMapper.ELEMENTARY_5_6,
      },
    ],
    [cmsCommonModelClassTypeMapper.MIDDLE]: [
      ...commonOptions,
      {
        text: mathAchievementGradeClusterMapper.MIDDLE,
        value: mathAchievementGradeClusterMapper.MIDDLE,
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

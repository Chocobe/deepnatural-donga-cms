// type
import { 
  mathAchievementGradeClusterMapper,
  mathCurriculumMapper,
} from '@/apis/models/mathModel.type';
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';
import { 
  SELECT_OPTION_ITEM_ALL,
} from '../cmsPages.type';
import { 
  cmsClassTypeMapper,
} from '@/apis/models/cmsCommonModel.type';

//
// 수학 커리큘럼 선택지
//
export const mathCurriculumOptions: TCommonSelectOptionItem[] = [
  {
    text: mathCurriculumMapper[2015],
    value: mathCurriculumMapper[2015],
  },
  {
    text: mathCurriculumMapper[2022],
    value: mathCurriculumMapper[2022],
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
  [cmsClassTypeMapper.ELEMENTARY]: TCommonSelectOptionItem[];
  [cmsClassTypeMapper.MIDDLE]: TCommonSelectOptionItem[];
  [cmsClassTypeMapper.HIGH]: TCommonSelectOptionItem[];
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
    [cmsClassTypeMapper.ELEMENTARY]: [
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
    [cmsClassTypeMapper.MIDDLE]: [
      ...commonOptions,
      {
        text: mathAchievementGradeClusterMapper.MIDDLE,
        value: mathAchievementGradeClusterMapper.MIDDLE,
      },
    ],
    [cmsClassTypeMapper.HIGH]: [
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
  [cmsClassTypeMapper.ELEMENTARY]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...mathGradeClusterOptions[cmsClassTypeMapper.ELEMENTARY],
  ],
  [cmsClassTypeMapper.MIDDLE]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...mathGradeClusterOptions[cmsClassTypeMapper.MIDDLE],
  ],
  [cmsClassTypeMapper.HIGH]: [
    {
      ...SELECT_OPTION_ITEM_ALL,
    },
    ...mathGradeClusterOptions[cmsClassTypeMapper.HIGH],
  ],
} as const;

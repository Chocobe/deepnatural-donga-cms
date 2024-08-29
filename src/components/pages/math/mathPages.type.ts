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
export const mathGradeClusterOptions: TCommonSelectOptionItem[] = [
  {
    text: '초3~4',
    value: '초3-4',
  },
  {
    text: '초5~6',
    value: '초5-6',
  },
  {
    text: '중1~3',
    value: '중1-3',
  },
] as const;

export const mathGradeClusterFilterOptions: TCommonSelectOptionItem[] = [
  {
    ...SELECT_OPTION_ITEM_ALL,
  },
  ...mathGradeClusterOptions,
] as const;

// type
import { 
  mathCurriculumMapper,
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

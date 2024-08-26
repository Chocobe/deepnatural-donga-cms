// type
import { 
  mathTextbookModelCurriculumMapper,
} from '@/apis/models/mathModel.type';
import { 
  TFormSelectOptionItem,
} from '@/components/shadcn-ui-custom/FormSelect/FormSelect.type';

//
// 수학 커리큘럼 선택지
//
export const mathTextbookCurriculumOptions: TFormSelectOptionItem[] = [
  {
    text: mathTextbookModelCurriculumMapper[2015],
    value: mathTextbookModelCurriculumMapper[2015],
  },
  {
    text: mathTextbookModelCurriculumMapper[2022],
    value: mathTextbookModelCurriculumMapper[2022],
  },
] as const;

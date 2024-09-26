// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathQuestionSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: 'All',
    value: 'content',
  },
  {
    text: '문항 ID',
    value: 'internal_id',
  },
  {
    text: '지문/발문',
    value: 'instruction_inquiry',
  },
] as const;

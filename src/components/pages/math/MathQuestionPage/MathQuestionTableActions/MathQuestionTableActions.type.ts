// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathQuestionSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: '지문',
    value: 'instruction',
  },
  {
    text: '발문',
    value: 'inquery',
  },
] as const;

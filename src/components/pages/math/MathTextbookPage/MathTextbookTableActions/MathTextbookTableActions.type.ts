// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathTextbookSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: '저자',
    value: 'author',
  },
  {
    text: '교과서명',
    value: 'title',
  },
] as const;

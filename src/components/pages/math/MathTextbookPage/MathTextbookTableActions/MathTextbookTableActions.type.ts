// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathTextbookSearchTypeOptions: TCommonSelectOptionItem[] = [
  // {
  //   text: 'All',
  //   value: ' ',
  // },
  // {
  //   text: '교육과정',
  //   value: 'curriculum',
  // },
  {
    text: '교과서명',
    value: 'textbook',
  },
  // {
  //   text: '저자',
  //   value: 'author',
  // },
] as const;

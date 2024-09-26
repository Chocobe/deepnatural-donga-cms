// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathChapterSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: 'All',
    value: 'chapter_title',
  },
  {
    text: '대단원명',
    value: 'chapter1_title',
  },
  {
    text: '중단원명',
    value: 'chapter2_title',
  },
  {
    text: '소단원명',
    value: 'chapter3_title',
  },
] as const;

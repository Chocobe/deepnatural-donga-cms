// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathAchievementSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: 'All',
    value: 'achievement_title',
  },
  {
    text: '성취기준(대)',
    value: 'achievement1_title',
  },
  {
    text: '성취기준(중)',
    value: 'achievement2_title',
  },
  {
    text: '성취기준',
    value: 'achievement3_title',
  },
  {
    text: '표준코드',
    value: 'achievement_code',
  },
] as const;

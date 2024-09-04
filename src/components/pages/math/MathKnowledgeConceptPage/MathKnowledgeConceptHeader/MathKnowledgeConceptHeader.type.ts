// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathKnowledgeConceptHeaderAchievementSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: '검색',
    value: 'search',
  },
  {
    text: '성취기준(중)',
    value: 'achievement2',
  },
  {
    text: '성취기준(소)',
    value: 'achievement3',
  },
] as const;

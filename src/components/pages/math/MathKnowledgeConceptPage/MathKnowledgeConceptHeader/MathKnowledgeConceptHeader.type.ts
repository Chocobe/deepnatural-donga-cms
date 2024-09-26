// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

// FIXME: Header 에 `검색 Modal` 제거 시, 아래 정의도 제거하기
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
    text: '성취기준',
    value: 'achievement3',
  },
] as const;

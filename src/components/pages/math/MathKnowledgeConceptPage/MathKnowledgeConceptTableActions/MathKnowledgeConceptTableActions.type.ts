// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathKnowledgeConceptSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: 'All',
    value: 'kc_search',
  },
  {
    text: 'Kc1',
    value: 'kc1_title',
  },
  {
    text: 'Kc2',
    value: 'kc2_title',
  },
] as const;

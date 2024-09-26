// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathSeriesSourceSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: 'All',
    value: 'series_source',
  },
  {
    text: '시리즈',
    value: 'series_title',
  },
  {
    text: '제품명',
    value: 'source_name',
  },
] as const;

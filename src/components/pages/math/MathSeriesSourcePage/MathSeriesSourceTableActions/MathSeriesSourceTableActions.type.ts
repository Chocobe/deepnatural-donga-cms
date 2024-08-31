// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

export const mathSeriesSourceSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: '시리즈 제목',
    value: 'title',
  },
  {
    text: '판형',
    value: 'serviceyear',
  },
] as const;

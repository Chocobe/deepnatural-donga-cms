// type
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

/**
 * 수학 출처-시리즈 검색 모달 - 검색 타입 선택지
 */
export const mathQuestionHeaderSeriesSearchTypeOptions: TCommonSelectOptionItem[] = [
  // 
];

/**
 * 수학 교과서 검색 모달 - 검색 타입 선택지
 */
export const mathQuestionHeaderTextbookSearchTypeOptions: TCommonSelectOptionItem[] = [
  {
    text: '교과서명',
    value: 'search',
  },
  // {
  //   text: '학교급',
  //   value: 'classtype',
  // },
] as const;

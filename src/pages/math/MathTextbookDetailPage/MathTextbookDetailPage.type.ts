// 교과서 상세 페이지 모드
export const mathTextbookDetailPageModeMapper = {
  ADD: 'add',
  DETAIL: 'detail',
} as const;
export type TMathTextbookDetailPageMode = typeof mathTextbookDetailPageModeMapper[keyof typeof mathTextbookDetailPageModeMapper];

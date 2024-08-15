export const simpleNoticeModalVariantMapper = {
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
export type TSimpleNoticeModalVariant = typeof simpleNoticeModalVariantMapper[keyof typeof simpleNoticeModalVariantMapper];

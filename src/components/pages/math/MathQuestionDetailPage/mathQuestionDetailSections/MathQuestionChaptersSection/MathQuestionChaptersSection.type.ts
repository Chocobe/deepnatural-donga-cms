export const mathQuestionChaptersSectionChapterKeyMapper = {
  CHAPTER_1: 'chapter1',
  CHAPTER_2: 'chapter2',
  CHAPTER_3: 'chapter3',
  NONE: '',
} as const;
export type TMathQuestionChaptersSectionChapterKey = typeof mathQuestionChaptersSectionChapterKeyMapper[keyof typeof mathQuestionChaptersSectionChapterKeyMapper];

export const mathQuestionChaptersSectionChapterNameMapper = {
  [mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_1]: '대단원',
  [mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_2]: '중단원',
  [mathQuestionChaptersSectionChapterKeyMapper.CHAPTER_3]: '소단원',
  [mathQuestionChaptersSectionChapterKeyMapper.NONE]: '',
} as const;

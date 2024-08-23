// 교과서
export const textbookClassTypeTemplateMapper = {
  '초등학교': '초등학교',
  '중학교': '중학교',
  '고등학교': '고등학교',
} as const;

export const textbookClassTypeFilterOptions = [
  {
    text: 'All',
    value: ' ',
  },
  {
    text: textbookClassTypeTemplateMapper['초등학교'],
    value: textbookClassTypeTemplateMapper['초등학교'],
  },
  {
    text: textbookClassTypeTemplateMapper['중학교'],
    value: textbookClassTypeTemplateMapper['중학교'],
  },
  {
    text: textbookClassTypeTemplateMapper['고등학교'],
    value: textbookClassTypeTemplateMapper['고등학교'],
  },
] as const;

// 학년
export const textbookGradeFilterOptions = {
  [' ']: [
    {
      text: 'All',
      value: ' ',
    },
  ],

  [textbookClassTypeTemplateMapper['초등학교']]: [
    {
      text: 'All',
      value: ' ',
    },
    {
      text: '1학년',
      value: '1학년',
    },
    {
      text: '2학년',
      value: '2학년',
    },
    {
      text: '3학년',
      value: '3학년',
    },
    {
      text: '4학년',
      value: '4학년',
    },
    {
      text: '5학년',
      value: '5학년',
    },
    {
      text: '6학년',
      value: '6학년',
    },
  ],

  [textbookClassTypeTemplateMapper['중학교']]: [
    {
      text: 'All',
      value: ' ',
    },
    {
      text: '1학년',
      value: '1학년',
    },
    {
      text: '2학년',
      value: '2학년',
    },
    {
      text: '3학년',
      value: '3학년',
    },
  ],

  [textbookClassTypeTemplateMapper['고등학교']]: [
    {
      text: 'All',
      value: ' ',
    },
    {
      text: '1학년',
      value: '1학년',
    },
    {
      text: '2학년',
      value: '2학년',
    },
    {
      text: '3학년',
      value: '3학년',
    },
  ],
} as const;

// 학기
export const textbookTermFilterOptions = [
  {
    text: 'All',
    value: ' ',
  },
  {
    text: '1학기',
    value: '1학기',
  },
  {
    text: '2학기',
    value: '2학기',
  },
] as const;

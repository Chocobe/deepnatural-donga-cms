// type
import { 
  mathQuestionTypeOptions,
} from '@/apis/models/mathModel.type';

/**
 * 출처, 지식개념, 교과서 (총 3개)
 */
export const NUM_OF_METADATA_ITEMS = 3;

//
// 참고서 상세정보 템플릿 타입
// => '출처', '성취기준', '지식개념', '교과서 단원정보'
//
export type TMetadataTemplate = {
  id: string;
  header: {
    label: string;
    placeholder: string;
  };
  search: {
    label: string;
    placeholder: string;
  };
  summaryKeys: Readonly<Array<string>>;
  details: Readonly<Array<{
    key: string;
    label: string;
  }>>;
};

export type TTextbookSubMetadataTemplate = {
  id: string;
  search: {
    label: string;
    placeholder: string;
  };
  summaryKeys: Readonly<Array<string>>;
  details: Readonly<Array<{
    key: string;
    label: string;
  }>>;
  searchModalItemDetails: Readonly<Array<{
    key: string;
    label: string;
  }>>;
};

export type TSummarizedMetadata<T = any> = {
  id: string;
  summary: string;
  metadata: T;
};

//
// 항목 템플릿 타입
//
export type TQuestionSetItemTemplate = {
  id: string;
  label: string;
  type: 'latex' | 'text' | 'number' | 'boolean' | 'enum/string' | 'enum/number' | 'kc2';
  options?: Array<{
    text: string;
    value: string | number;
  }>;

  readonly?: boolean;
  required: boolean;
  value: string | number | boolean;
  placeholder?: string;
  onlyFirstIndex?: boolean;
};

export type TQuestionSetTemplate = TQuestionSetItemTemplate[];

//
// Impl - TMetadataTemplate
//
export const sourceMetadataTemplate = {
  id: 'source_id',
  header: {
    label: '출처',
    placeholder: '출처를 선택해주세요.',
  },
  search: {
    label: '출처 검색',
    placeholder: '문항의 출처를 검색하여 선택해주세요.',
  },
  summaryKeys: [
    // 제품명
    'productName', 
    // 시리즈 이름
    'series',
    // 교육 과정
    'curriculum'
  ],
  details: [
    {
      key: 'id',
      label: '출처 ID',
    },
    {
      key: 'curriculum',
      label: '교육 과정',
    },
    {
      key: 'schoolLevel',
      label: '학교급',
    },
    {
      key: 'productName',
      label: '제품명',
    },
    {
      key: 'subject',
      label: '과목',
    },
    {
      key: 'grade',
      label: '학년',
    },
    {
      key: 'semester',
      label: '학기',
    },
    {
      key: 'series',
      label: '시리즈 이름',
    },
  ]
} as const;

export const knowledgeConceptMetadataTemplate = {
  id: 'kc2_id',
  header: {
    label: '지식개념',
    placeholder: '지식개념을 선택해주세요.',
  },
  search: {
    label: '지식개념 검색',
    placeholder: '문항의 지식개념을 검색하여 선택해주세요.',
  },
  summaryKeys: [
    'title',
    'kc1',
    'achievement3',
    'achievement2',
    'achievement1',
  ],
  details: [
    {
      key: 'title',
      label: '지식개념 lv2(KC2)',
    },
    {
      key: 'kc1',
      label: '지식개념 lv1(KC1)',
    },
    {
      key: 'achievement3',
      label: '성취기준명',
    },
    {
      key: 'achievement2',
      label: '성취기준(중)',
    },
    {
      key: 'achievement1',
      label: '성취기준(대)',
    },
  ],
} as const;

export const textbookMetadataTemplate = {
  id: 'textbook_id',
  search: {
    label: '교과서',
    placeholder: '교과서명을 검색하여 선택해주세요.',
  },
  summaryKeys: [
    'title',
  ],
  details: [
    {
      key: 'title',
      label: '교과서',
    },
  ],
  searchModalItemDetails: [
    {
      key: 'title',
      label: '교과서',
    },
    {
      label: '학교급',
      key: 'schoolLevel',
    },
    {
      label: '학년',
      key: 'grade',
    },
    {
      label: '학기',
      key: 'semester',
    },
    {
      key: 'author',
      label: '저자',
    },
  ],
} as const;

export const chapter1MetadataTemplate = {
  id: 'chapter1_id',
  search: {
    label: '대단원',
    placeholder:'대단원명을 검색하여 선택해주세요.',
  },
  summaryKeys: [
    'title',
  ],
  details: [
    {
      key: 'title',
      label: '대단원',
    },
  ],
  searchModalItemDetails: [
    {
      key: 'title',
      label: '대단원',
    },
    {
      key: 'no',
      label: '대단원 번호',
    },
    {
      key: 'textbook',
      label: '교과서',
    },
  ],
} as const;

export const chapter2MetadataTemplate = {
  id: 'chapter2_id',
  search: {
    label: '중단원',
    placeholder: '중단원명을 검색하여 선택해주세요.',
  },
  summaryKeys: [
    'title',
  ],
  details: [
    {
      key: 'title',
      label: '교과서 중단원',
    },
  ],
  searchModalItemDetails: [
    {
      key: 'title',
      label: '중단원',
    },
    {
      key: 'no',
      label: '중단원 번호',
    },
    {
      key: 'textbook',
      label: '교과서',
    },
    {
      key: 'chapter1',
      label: '대단원',
    },
  ],
} as const;

export const chapter3MetadataTemplate = {
  id: 'chapter3_id',
  search: {
    label: '소단원',
    placeholder: '소단원명을 검색하여 선택해주세요.',
  },
  summaryKeys: [
    'title',
  ],
  details: [
    {
      key: 'title',
      label: '교과서 소단원',
    },
  ],
  searchModalItemDetails: [
    {
      key: 'title',
      label: '소단원',
    },
    {
      key: 'no',
      label: '소단원 번호',
    },
    {
      key: 'textbook',
      label: '교과서',
    },
    {
      key: 'chapter1',
      label: '대단원'
    },
    {
      key: 'chapter2',
      label: '중단원',
    },
  ],
} as const;

//
// 과목 (<option />) 
//
export const subjectOptions = [
  {
    label: '수학',
    value: '수학',
  },
];

//
// 행동영역 (<option />) 
//
const behaviorDomainOptions = [
  {
    text: '계산',
    value: '계산',
  },
  {
    text: '이해',
    value: '이해',
  },
  {
    text: '추론',
    value: '추론',
  },
  {
    text: '내적문제해결',
    value: '내적문제해결',
  },
  {
    text: '외적문제해결',
    value: '외적문제해결',
  },
];

//
// 난이도 (<options />)
//
const difficultyOptions = [
  {
    text: '1',
    value: 1,
  },
  {
    text: '2',
    value: 2,
  },
  {
    text: '3',
    value: 3,
  },
  {
    text: '4',
    value: 4,
  },
  {
    text: '5',
    value: 5,
  },
];

//
// 문제 유형 (<option />) 
//
export const questionTypeOptionsMapper = {
  '객관식-단답형': '객관식-단답형',
  '객관식-다답형': '객관식-다답형',
  '주관식-단답형': '주관식-단답형',
  '주관식-선택형-기본': '주관식-선택형-기본',
  '주관식-선택형-무순': '주관식-선택형-무순',
  '주관식-선택형-유순': '주관식-선택형-유순',
  '주관식-서술형': '주관식-서술형',
  '주관식-그리기형': '주관식-그리기형',
  '주관식-선긋기형': '주관식-선긋기형',
} as const;
export type TMathQuestionType = typeof questionTypeOptionsMapper[keyof typeof questionTypeOptionsMapper];

//
// 선택지 유형 (<options />)
//
const choiceTypeOptions = [
  {
    text: 'ㄱㄴㄷ',
    value: 'ㄱㄴㄷ',
  },
  {
    text: '가나다',
    value: '가나다',
  },
  {
    text: '123',
    value: '123',
  },
  {
    text: 'abc',
    value: 'abc',
  },
  {
    text: '기타',
    value: '기타',
  },
];

//
// Impl - TQuestionSetTemplate
//
export const questionSetCommonTemplate: TQuestionSetTemplate = [
  { 
    id: 'source_page_no',
    label: '출처 페이지', 
    type: 'number', 
    placeholder: '출처 페이지를 입력해주세요',
    required: true,
    value: '',
  },
  { 
    id: 'behavior_domain',
    label: '행동역역',
    type: 'enum/string', 
    options: behaviorDomainOptions,
    placeholder: '행동영역을 선택해주세요',
    required: true,
    value: '',
  },
  {
    id: 'difficulty',
    label: '난이도',
    type: 'enum/number',
    options: difficultyOptions,
    placeholder: '난이도를 입력해주세요',
    required: true,
    value: '',
  },
  { 
    id: 'keyword',
    label: '키워드',
    type: 'text', 
    placeholder: '키워드를 입력해주세요',
    required: true,
    value: '',
  },
  { 
    id: 'kc2_id',
    label: '지식개념',
    type: 'kc2', 
    placeholder: '키워드를 입력해주세요',
    required: true,
    value: '',
  },
  { 
    id: 'instruction',
    label: '지문',
    type: 'latex', 
    placeholder: 'LaTeX + HTML을 입력해주세요',
    onlyFirstIndex: true,
    required: true,
    value: '',
  },
  { 
    id: 'inquiry',
    label: '발문',
    type: 'latex', 
    placeholder: 'LaTeX + HTML을 입력해주세요',
    required: true,
    value: '',
  },
  {
    id: 'question_type',
    label: '문제 유형', 
    type: 'enum/string', 
    options: mathQuestionTypeOptions,
    placeholder: '문제 유형을 선택해주세요',
    required: true,
    value: '',
  },
];

//
// question_type (문제유형) 별 template
//
// 객관식(단답형/다답형)
const questionSetChoiceTemplateFactory = (): TQuestionSetTemplate => {
  return [
    ...(Array.from(
      { length: 5 },
      (_, i) => ({
        id: `choice${i + 1}`,
        label: `객관식 선지${i + 1}`,
        type: 'latex',
        placeholder: 'LaTeX + HTML을 입력해주세요',
        required: true,
        value: '',
      })
    ) as TQuestionSetTemplate),
    { 
      id: 'choice_answer',
      label: '객관식 답', 
      type: 'text', 
      placeholder: '객관식 답을 입력해주세요',
      required: true,
      value: '',
    },
    {
      id: 'solution',
      label: '풀이',
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: false,
      value: '',
    },
    { 
      id: 'individual_questioning',
      label: '개별 출제', 
      type: 'boolean', 
      placeholder: '개별 출제 문항입니다.',
      required: false,
      value: false,
    },
  ];
};

// 주관식(단답형)
const questionSetShortAnswerTemplateFactory = (
  shortAnswerCount = 0
): TQuestionSetTemplate => {
  return [
    { 
      id: 'short_answer_count',
      label: '주관식 정답 입력 개수',
      type: 'number', 
      placeholder: '주관식 정답 입력 개수를 입력해주세요',
      required: true,
      value: '',
    },
    ...(Array.from(
      { length: shortAnswerCount },
      (_, i) => ({
        id: `short_answer${i + 1}`,
        label: `주관식 정답${i + 1}`,
        type: 'latex',
        placeholder: 'LaTeX + HTML을 입력해주세요',
        required: true,
        value: '',
      })
    ) as TQuestionSetTemplate),
    {
      id: 'solution',
      label: '풀이',
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: false,
      value: '',
    },
    { 
      id: 'individual_questioning',
      label: '개별 출제', 
      type: 'boolean', 
      placeholder: '개별 출제 문항입니다.',
      required: false,
      value: false,
    },
  ];
};

// 주관식(선택형)
const questionSetShortChoiceTemplateFactory = (
  shortAnswerCount = 0
): TQuestionSetTemplate => {
  return [
    { 
      id: 'short_answer_count',
      label: '주관식 정답 입력 개수',
      type: 'number', 
      placeholder: '주관식 정답 입력 개수를 입력해주세요',
      required: true,
      value: '',
    },
    { 
      id: 'choice_type',
      label: '선택지 유형', 
      type: 'enum/string', 
      options: choiceTypeOptions,
      placeholder: '선택지 유형을 입력해주세요',
      required: true,
      value: '',
    },
    { 
      id: 'choice_count',
      label: '선택지 개수', 
      type: 'number', 
      placeholder: '선택지 개수를 입력해주세요',
      required: true,
      value: '',
    },
    ...(Array.from(
      { length: shortAnswerCount },
      (_, i) => ({
        id: `short_answer${i + 1}`,
        label: `주관식 정답${i + 1}`,
        type: 'latex',
        placeholder: 'LaTeX + HTML을 입력해주세요',
        required: true,
        value: '',
      })
    ) as TQuestionSetTemplate),
    {
      id: 'solution',
      label: '풀이',
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: false,
      value: '',
    },
    { 
      id: 'individual_questioning',
      label: '개별 출제', 
      type: 'boolean', 
      placeholder: '개별 출제 문항입니다.',
      required: false,
      value: false,
    },
  ];
};

// 주관식(서술형)
const questionSetLongAnswerTemplateFactory = (): TQuestionSetTemplate => {
  return [
    {
      id: `short_answer1`,
      label: `주관식 정답`,
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: true,
      value: '',
    },
    {
      id: 'solution',
      label: '풀이',
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: false,
      value: '',
    },
    ...(Array.from(
      { length: 5 },
      (_, i) => {
        return [
          {
            id: `evaluation_criteria${i + 1}`,
            label: `평가기준${i + 1}`,
            type: 'latex',
            placeholder: 'LaTeX + HTML을 입력해주세요',
            required: false,
            value: '',
          },
          {
            id: `evaluation_criteria${i + 1}_percent`,
            label: `평가기준${i + 1} (%)`,
            type: 'number',
            placeholder: '평가기준 %를 입력해주세요',
            required: false,
            value: 0,
          },
        ] as TQuestionSetTemplate;
      }
    ).reduce((list, subList) => [
      ...list,
      ...subList,
    ], [] as TQuestionSetTemplate)),
    { 
      id: 'individual_questioning',
      label: '개별 출제', 
      type: 'boolean', 
      placeholder: '개별 출제 문항입니다.',
      required: false,
      value: false,
    },
  ];
};

// 주관식(그리기/선긋기)
const questionSetDrawingAnswerTemplateFactory = (): TQuestionSetTemplate => {
  return [
    {
      id: `short_answer1`,
      label: `주관식 정답`,
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: true,
      value: '',
    },
    {
      id: 'solution',
      label: '풀이',
      type: 'latex',
      placeholder: 'LaTeX + HTML을 입력해주세요',
      required: false,
      value: '',
    },
    { 
      id: 'individual_questioning',
      label: '개별 출제', 
      type: 'boolean', 
      placeholder: '개별 출제 문항입니다.',
      required: false,
      value: false,
    },
  ];
};

export const questionTypeTemplateMapper = {
  [questionTypeOptionsMapper['객관식-단답형']]: questionSetChoiceTemplateFactory,
  [questionTypeOptionsMapper['객관식-다답형']]: questionSetChoiceTemplateFactory,

  [questionTypeOptionsMapper['주관식-단답형']]: questionSetShortAnswerTemplateFactory,
  [questionTypeOptionsMapper['주관식-선택형-기본']]: questionSetShortChoiceTemplateFactory,
  [questionTypeOptionsMapper['주관식-선택형-무순']]: questionSetShortChoiceTemplateFactory,
  [questionTypeOptionsMapper['주관식-선택형-유순']]: questionSetShortChoiceTemplateFactory,
  [questionTypeOptionsMapper['주관식-서술형']]: questionSetLongAnswerTemplateFactory,

  [questionTypeOptionsMapper['주관식-그리기']]: questionSetDrawingAnswerTemplateFactory,
  [questionTypeOptionsMapper['주관식-선긋기']]: questionSetDrawingAnswerTemplateFactory,
} as const;

// --- --- --- --- --- --- --- --- --- ---
//
// 수학 CMS model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

// type
import { 
  SELECT_OPTION_ITEM_ALL,
  cmsClassTypeMapper,
  // cmsSubjectMapper,
  TCMSClassType,
  TCMSDifficulty,
  TCMSElementaryGrade,
  TCMSGradeCluster,
  TCMSMiddleHighGrade,
  TCmsSourceType,
  TCMSSubject,
  TCMSTerm,
} from './cmsCommonModel.type';
import { 
  TCommonSelectOptionItem,
} from '@/components/shadcn-ui-custom/CommonSelect/CommonSelect.type';

/** 수학 커리큘럼 */
export const mathCurriculumMapper = {
  '2015': '2015',
  '2022': '2022',
} as const;
export type TMathCurriculum = typeof mathCurriculumMapper[keyof typeof mathCurriculumMapper];

export const mathCurriculumOptions: TCommonSelectOptionItem[] = [
  {
    text: mathCurriculumMapper[2015],
    value: mathCurriculumMapper[2015],
  },
  {
    text: mathCurriculumMapper[2022],
    value: mathCurriculumMapper[2022],
  },
] as const;

export const mathCurriculumFilterOptions: TCommonSelectOptionItem[] = [
  {
    ...SELECT_OPTION_ITEM_ALL,
  },
  ...mathCurriculumOptions,
] as const;

/**
 * Math Textbook (수학 교과서)
 */
type TMathTextbookGenericModel<TClassType extends TCMSClassType> = {
  id: number;
  /** 교육과정 */
  curriculum: TMathCurriculum;
  /** 교과서명 */
  title: string;
  /** 저자 */
  author: string;
  /** 학교급 */
  classtype: TClassType;
  /** 학년 */
  grade: number;
  /** 학기 */
  term: TCMSTerm;
};

/** Math Textbook (수학 교과서) - 초등 수학 교과서 */
type TMathTextbookElementaryModel = TMathTextbookGenericModel<
  typeof cmsClassTypeMapper.ELEMENTARY
> & {
  grade: TCMSElementaryGrade;
};

/** Math Textbook (수학 교과서) - 중등 수학 교과서 */
type TMathTextbookMiddleModel = TMathTextbookGenericModel<
  typeof cmsClassTypeMapper.MIDDLE
> & {
  grade: TCMSMiddleHighGrade;
};

/** Math Textbook (수학 교과서) - 고등 수학 교과서 */
type TMathTextbookHighModel = TMathTextbookGenericModel<
  typeof cmsClassTypeMapper.HIGH
> & {
  grade: TCMSMiddleHighGrade;
};

/** 수학 교과서 */
export type TMathTextbookModel =
  | TMathTextbookElementaryModel
  | TMathTextbookMiddleModel
  | TMathTextbookHighModel;

// --- --- --- --- --- --- --- --- --- ---

/**
 * Math Chapter (수학 교과서 대/중/소 단원)
 */
/** 수학 교과서 단원 공통 속성 */
export type TMathChapterCommonModel = {
  id: number;
  /** 단원명 */
  title: string;
  /** 순서 */
  no: string;
  /** 교과서 ID */
  textbook_id: number;
};

/** 수학 교과서 소단원 */
export type TMathChapter3Model = TMathChapterCommonModel;

/** 수학 교과서 중단원 */
export type TMathChapter2Model = TMathChapterCommonModel & {
  /** 소단원 목록 */
  chapter3_set: TMathChapter3Model[];
};

/** 수학 교과서 대단원 */
export type TMathChapter1Model = TMathChapterCommonModel & {
  /** 교과서명 */
  textbook_title?: string;
  /** (교과서) 교육과정 */
  textbook_curriculum?: TMathCurriculum,
  /** (교과서) 학교급 */
  textbook_classtype?: TCMSClassType,
  /** (교과서) 학년 */
  textbook_grade?: TCMSElementaryGrade,
  /** (교과서) 학기 */
  textbook_term?: TCMSTerm
  /** 중단원 목록 */
  chapter2_set: TMathChapter2Model[];
};

/** 수학 교과서 평탄화 모델 */
export type TMathChapterFlattenModel = {
  /** 대단원 정보 */
  chapter1: TMathChapter1Model;
  /** 중단원 정보 */
  chapter2: TMathChapter2Model;
  /** 소단원 정보 */
  chapter3?: TMathChapter3Model;
};

// --- --- --- --- --- --- --- --- --- ---

/**
 * Math Achievement (수학 성취기준)
 */
/** 수학 성취기준 공통 속성 */
export type TMathAchievementCommonModel = {
  id: number;
  title: string;
  no: string;
};

/** 수학 성취기준 소 */
export type TMathAchievement3Model = TMathAchievementCommonModel & {
  code: string;
};

/** 수학 성취기준 중 */
export type TMathAchievement2Model = TMathAchievementCommonModel & {
  achievement3_set: TMathAchievement3Model[];
};

/** 수학 성취기준 대 */
export type TMathAchievement1Model = TMathAchievementCommonModel & {
  curriculum: TMathCurriculum;
  classtype: TCMSClassType;
  grade_cluster: TCMSGradeCluster;
  achievement2_set: TMathAchievement2Model[];
};

/** 수학 성취기준 */
export type TMathAchievementFlattenModel = {
  achievement1: TMathAchievement1Model;
  achievement2: TMathAchievement2Model;
  achievement3: TMathAchievement3Model;
};

// --- --- --- --- --- --- --- --- --- ---

/**
 * Math KnowledgeConcept (수학 지식개념)
 */
/** 수학 지식개념 공통 속성 */
export type TMathKnowledgeConceptCommonModel = {
  id: number;
  title: string;
  comment: string | null;
}
/** 수학 지식개념 2 */
export type TMathKnowledgeConcept2Model = TMathKnowledgeConceptCommonModel & {
  kc1: string;
  achievement1: string;
  achievement2: string;
  achievement3: string;
};

/** 수학 지식개념 1 */
export type TMathKnowledgeConcept1Model = TMathKnowledgeConceptCommonModel & {
  kc2_set: TMathKnowledgeConcept2Model[];

  achievement3_id: number;
  achievement3: {
    id: number;
    title: string;
    achievement2: {
      id: number;
      title: string;
      achievement1: {
        id: number;
        title: string;
        curriculum: TMathCurriculum;
        classtype: TCMSClassType;
        grade_cluster: TCMSGradeCluster;
      };
    };
  };
};

/** 수학 지식개념 평탄화 모델 */
export type TMathKnowledgeConceptFlattenModel = {
  kc1: TMathKnowledgeConcept1Model;
  kc2: TMathKnowledgeConcept2Model;
};

// --- --- --- --- --- --- --- --- --- ---

/**
 * Math SeriesSource (수학 시리즈-출처)
 */
/** 수학 출처 */
export type TMathSourceModel = {
  id: number;
  /** 제품명 */
  name: string;
  /** 교육과정 */
  curriculum: TMathCurriculum;
  /** 학교급 */
  classtype: TCMSClassType;
  /** 학년 */
  grade: TCMSElementaryGrade | TCMSMiddleHighGrade;
  /** 학기 */
  term: TCMSTerm;
  /** 판형 */
  serviceyear: string;
  /** 발행처 */
  publisher: string;
  /** 사용기간 */
  expiration_date: string;
  /** 출처 유형 (제품 분류) */
  source_type: TCmsSourceType;
  /** 사용여부 */
  isview: boolean;
};

/** 수학 시리즈 */
export type TMathSeriesModel = {
  id: number;
  /** 시리즈 제목 */
  title: string;
  /** 출처 */
  source_set: TMathSourceModel[];
};

/** 수학 시리즈 평탄화 모델 */
export type TMathSeriesSourceFlattenModel = {
  series: TMathSeriesModel;
  source: TMathSourceModel;
};

/**
 * Math Instruction (수학 지문)
 */
/** 수학 지문 */
export type TMathInstructionModel = {
  id: number;
  /** 지문 내용 */
  content: string;
  /** 대표 문항 ID */
  representation_question_id: string;
  /** 출처 */
  source: TMathSourceModel;
};

// --- --- --- --- --- --- --- --- --- ---

/**
 * Math Question (수학 문항)
 */
/** 수학 행동 영역 */
export const mathBehaviorDomainMapper = {
  '계산': '계산',
  '이해': '이해',
  '추론': '추론',
  '내적문제해결': '내적문제해결',
  '외적문제해결': '외적문제해결',
} as const;
export type TMathBehaviorDomain = typeof mathBehaviorDomainMapper[keyof typeof mathBehaviorDomainMapper];

/** 문제 유형 */
export const mathQuestionTypeMapper = {
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
export type TMathQuestionType = typeof mathQuestionTypeMapper[keyof typeof mathQuestionTypeMapper];

export const mathQuestionTypeOptions: TCommonSelectOptionItem[] = Object
  .values(mathQuestionTypeMapper)
  .map(mathQuestionType => ({
    text: mathQuestionType,
    value: mathQuestionType,
  }));

/** 선택지 유형 */
export const mathChoiceType = {
  'NONE': null,
  'ㄱㄴㄷ': 'ㄱㄴㄷ',
  '가나다': '가나다',
  '123': '123',
  'abc': 'abc',
  '기타': '기타',
} as const;
export type TMathChoiceType = typeof mathChoiceType[keyof typeof mathChoiceType];

/** 수학 문항 */
export type TMathQuestionModel = {
  id: number;
  internal_id: string;

  /** 출처 */
  source: TMathSourceModel;
  /** 지문 */
  instruction: TMathInstructionModel | null;

  /** 성취기준 */
  achievement: TMathAchievement3Model[];
  /** 교육과정 */
  curriculum: TMathCurriculum;
  /** 과목 */
  subject: TCMSSubject;

  /** 지식개념1 */
  kc1_title: string;
  /** 지식개념2 */
  kc2_title: string;

  /** 키워드 */
  keyword: string;
  /** 행동 영역 */
  behavior_domain: TMathBehaviorDomain;
  /** 발문 */
  inquiry: string;

  /** 객관식 선지1 */
  choice1: string;
  /** 객관식 선지2 */
  choice2: string;
  /** 객관식 선지3 */
  choice3: string;
  /** 객관식 선지4 */
  choice4: string;
  /** 객관식 선지5 */
  choice5: string;
  /** 객관식 정답 */
  choice_answer: string;

  /** 주관식 정답 입력 개수 */
  short_answer_count: number | null;
  /** 주관식 정답1 */
  short_answer1: string;
  /** 주관식 정답2 */
  short_answer2: string;
  /** 주관식 정답3 */
  short_answer3: string;
  /** 주관식 정답4 */
  short_answer4: string;
  /** 주관식 정답5 */
  short_answer5: string;
  /** 주관식 정답6 */
  short_answer6: string;
  /** 주관식 정답7 */
  short_answer7: string;
  /** 주관식 정답8 */
  short_answer8: string;
  /** 주관식 정답9 */
  short_answer9: string;
  /** 주관식 정답10 */
  short_answer10: string;
  /** 주관식 정답11 */
  short_answer11: string;
  /** 주관식 정답12 */
  short_answer12: string;
  /** 주관식 정답13 */
  short_answer13: string;
  /** 주관식 정답14 */
  short_answer14: string;
  /** 주관식 정답15 */
  short_answer15: string;
  /** 주관식 정답16 */
  short_answer16: string;
  /** 주관식 정답17 */
  short_answer17: string;
  /** 주관식 정답18 */
  short_answer18: string;
  /** 주관식 정답19 */
  short_answer19: string;
  /** 주관식 정답20 */
  short_answer20: string;

  /** 풀이 */
  solution: string;
  /** 평가기준1 */
  evaluation_criteria1: string;
  /** 평가기준1(%) */
  evaluation_criteria1_percent: string;
  /** 평가기준2 */
  evaluation_criteria2: string;
  /** 평가기준2(%) */
  evaluation_criteria2_percent: string;
  /** 평가기준3 */
  evaluation_criteria3: string;
  /** 평가기준3(%) */
  evaluation_criteria3_percent: string;
  /** 평가기준4 */
  evaluation_criteria4: string;
  /** 평가기준4(%) */
  evaluation_criteria4_percent: string;
  /** 평가기준5 */
  evaluation_criteria5: string;
  /** 평가기준5(%) */
  evaluation_criteria5_percent: string;

  /** 난이도 */
  difficulty: TCMSDifficulty;
  /** 문제 유형 */
  question_type: TMathQuestionType;

  /** 선택지 유형 */
  choice_type: TMathChoiceType | null;
  /** 선택지 개수 */
  choice_count: number | null;

  /** 세트 문제 여부 */
  is_set: boolean;

  /** 대표 문항 ID */
  representation_question_id: string | null;
  /** 개별 출제 */
  individual_questioning: boolean;
  /** 출처 페이지 */
  source_page_no: number;
  /** 출처 문항 번호 */
  source_question_no: string;

  /** 검수 여부 */
  is_reviewed: boolean;
};

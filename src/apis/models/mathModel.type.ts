// --- --- --- --- --- --- --- --- --- ---
//
// 수학 CMS model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

// type
import { 
  cmsClassTypeMapper,
  // cmsSubjectMapper,
  TCMSClassType,
  TCMSElementaryGrade,
  TCMSMiddleHighGrade,
  TCmsSourceType,
  TCMSTerm,
} from './cmsCommonModel.type';

/**
 * Math Textbook (수학 교과서)
 */
/** Math Textbook (수학 교과서) - 커리큘럼 */
export const mathCurriculumMapper = {
  '2015': '2015',
  '2022': '2022',
} as const;
export type TMathCurriculum = typeof mathCurriculumMapper[keyof typeof mathCurriculumMapper];

type TMathTextbookGenericModel<TClassType extends TCMSClassType> = {
  id: string;
  // TODO: 아직 API 미지원 속성
  /** 과목 */
  // subject: typeof cmsCommonModelSubjectMapper.MATH;

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
  textbook_title: string;
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
/** 수학 성취기준 학년(군) 값 */
export const mathAchievementGradeClusterMapper = {
  ELECTIVE_SUBJECT: '선택과목',
  COMMON_SUBJECT: '공통과목',
  ELEMENTARY_3_4: '초3~4',
  ELEMENTARY_5_6: '초5~6',
  MIDDLE: '중1~3',
} as const;
export type TMathAchievementGradeCluster = typeof mathAchievementGradeClusterMapper[keyof typeof mathAchievementGradeClusterMapper];

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
  grade_cluster: TMathAchievementGradeCluster;
  achievement2_set: TMathAchievement2Model[];
};

/** 수학 성취기준 */
export type TMathAchievementFlattenModel = {
  achievement1: TMathAchievement1Model;
  achievement2: TMathAchievement2Model;
  achievement3?: TMathAchievement3Model;
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
        grade_cluster: TMathAchievementGradeCluster;
      };
    };
  };
};

/** 수학 지식개념 1 */
export type TMathKnowledgeConcept1Model = TMathKnowledgeConceptCommonModel & {
  kc2_set: TMathKnowledgeConcept2Model[];
};

/** 수학 지식개념 평탄화 모델 */
export type TMathKnowledgeConceptFlattenModel = {
  kc1: TMathKnowledgeConcept1Model;
  kc2: TMathKnowledgeConcept2Model;
};

// --- --- --- --- --- --- --- --- --- ---

/**
 * Math SeriesSource (수학 출처-시리즈)
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
  /** 출처 유형 (사용범위) */
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
export type TMathSeriesFlattenModel = {
  series: TMathSeriesModel;
  source: TMathSourceModel;
};

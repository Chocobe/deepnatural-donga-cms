// --- --- --- --- --- --- --- --- --- ---
//
// 수학 CMS model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

// type
import { 
  cmsCommonModelClassTypeMapper,
  // cmsCommonModelSubjectMapper,
  TCMSCommonModelClassType,
  TCMSCommonModelElementaryGrade,
  TCMSCommonModelMiddleHighGrade,
  TCMSCommonModelTerm,
} from './cmsCommonModel.type';

/**
 * Math Textbook (수학 교과서)
 */
/** Math Textbook (수학 교과서) - 커리큘럼 */
export const mathTextbookModelCurriculumMapper = {
  '2015': '2015',
  '2022': '2022',
} as const;
export type TMathTextbookModelCurriculum = typeof mathTextbookModelCurriculumMapper[keyof typeof mathTextbookModelCurriculumMapper];

type TMathTextbookGenericModel<TClassType extends TCMSCommonModelClassType> = {
  id: string;
  // TODO: 아직 API 미지원 속성
  /** 과목 */
  // subject: typeof cmsCommonModelSubjectMapper.MATH;

  /** 교육과정 */
  curriculum: TMathTextbookModelCurriculum;
  /** 교과서명 */
  title: string;
  /** 저자 */
  author: string;
  /** 학교급 */
  classtype: TClassType;
  /** 학년 */
  grade: number;
  /** 학기 */
  term: TCMSCommonModelTerm;
};

/** Math Textbook (수학 교과서) - 초등 수학 교과서 */
type TMathTextbookElementaryModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.ELEMENTARY
> & {
  grade: TCMSCommonModelElementaryGrade;
};

/** Math Textbook (수학 교과서) - 중등 수학 교과서 */
type TMathTextbookMiddleModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.MIDDLE
> & {
  grade: TCMSCommonModelMiddleHighGrade;
};

/** Math Textbook (수학 교과서) - 고등 수학 교과서 */
type TMathTextbookHighModel = TMathTextbookGenericModel<
  typeof cmsCommonModelClassTypeMapper.HIGH
> & {
  grade: TCMSCommonModelMiddleHighGrade;
};

/** 수학 교과서 */
export type TMathTextbookModel =
  | TMathTextbookElementaryModel
  | TMathTextbookMiddleModel
  | TMathTextbookHighModel;



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
  curriculum: TMathTextbookModelCurriculum;
  classtype: TCMSCommonModelClassType;
  grade_cluster: TMathAchievementGradeCluster;
  achievement2_set: TMathAchievement2Model[];
};

/** 수학 성취기준 */
export type TMathAchievementFlattenModel = {
  achievement1: TMathAchievement1Model;
  achievement2: TMathAchievement2Model;
  achievement3?: TMathAchievement3Model;
};

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
        curriculum: TMathTextbookModelCurriculum;
        classtype: TCMSCommonModelClassType;
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

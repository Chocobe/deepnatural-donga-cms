// type
import { 
  TApiRequestBodyParams,
  TApiRequestNonBodyParams,
} from '../api.type';
import { 
  TCMSClassType,
  TCMSElementaryGrade,
  TCMSGradeCluster,
  TCMSTerm,
  TPaginationModel,
} from '../models/cmsCommonModel.type';
import { 
  TMathAchievement1Model,
  TMathChapter1Model,
  TMathKnowledgeConcept1Model,
  TMathTextbookModel,
  TMathCurriculum,
  TMathSeriesModel,
  TMathInstructionModel,
  TMathQuestionModel,
  TMathChapter2Model,
  TMathChapter3Model,
  TMathAchievement2Model,
  TMathAchievement3Model,
  TMathKnowledgeConcept2Model,
  TMathSourceModel,
  TMathQuestionHistoryModel,
} from '../models/mathModel.type';
import { 
  TExportModalSetFileFormat,
} from '@/components/shadcn-ui-custom/modals/ExportModalSet/ExportModalSet.type';

/**
 * 수학 교과서 API
 */
/** (GET) 수학 교과서 목록 조회 RequestParams */
export type TRetrieveMathTextbooksApiRequestParams = TApiRequestNonBodyParams<void, {
  // 필터 속성
  classtype?: TCMSClassType;
  grade?: TCMSElementaryGrade;
  term?: TCMSTerm;
  curriculum?: TMathCurriculum;
  // 검색 속성
  author?: string;
  title?: string;
  // 페이지 속성
  page?: number;
}>;
/** (GET) 수학 교과서 목록 조회 Response */
export type TRetrieveMathTextbooksApiResponse = TPaginationModel<TMathTextbookModel>;

/** (GET) 수학 교과서 조회 RequestParams */
export type TRetrieveMathTextbookApiRequestParams = TApiRequestNonBodyParams<{
  textbookId: string | number;
}, void>;
/** (GET) 수학 교과서 조회 Response */
export type TRetrieveMathTextbookApiResponse = TMathTextbookModel;

/** (PATCH) 수학 교과서 수정 RequestParams */
export type TPatchMathTextbookApiRequestParams = TApiRequestBodyParams<{
  textbookId: string | number;
}, void, Omit<TMathTextbookModel, 'id'>>;
/** (PATCH) 수학 교과서 수정 Response */
export type TPatchMathTextbookApiResponse = TMathTextbookModel;

/** (POST) 수학 교과서 생성 RequestParams */
export type TProduceMathTextbookApiRequestParams = TApiRequestBodyParams<void, void, Omit<TMathTextbookModel, 'id'>>;
/** (POST) 수학 교과서 생성 Response */
export type TProduceMathTextbookApiResponse = TMathTextbookModel;

/** (DELETE) 수학 교과서 삭제 RequestParams */
export type TDeleteMathTextbookApiRequestParams = TApiRequestNonBodyParams<{
  textbookId: string | number;
}, void>;
/** (DELETE) 수학 교과서 삭제 Response */
export type TDeleteMathTextbookApiResponse = void;

/** (POST) 수학 문항 업로드 RequestParams */
export type TProduceMathTextbookImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 문항 업로드 Response */
export type TProduceMathTextbookImportApiResponse = any;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 단원 API
 */
/** (GET) 수학 단원 목록 조회 RequestParams */
export type TRetrieveMathChaptersApiRequestParams = TApiRequestNonBodyParams<void, {
  // 필터 속성
  textbook_classtype?: TCMSClassType;
  textbook_grade?: TCMSElementaryGrade;
  textbook_term?: TCMSTerm;
  textbook_curriculum?: TMathCurriculum;
  // 검색 속성
  chapter_title?: string;
  chapter1_title?: string;
  chapter2_title?: string;
  chapter3_title?: string;
  // 페이지 속성
  page?: number;
}>;
/** (GET) 수학 단원 목록 조회 Response */
export type TRetrieveMathChaptersApiResponse = TPaginationModel<TMathChapter1Model>;

/** (GET) 수학 단원 조회 RequestParams */
export type TRetrieveMathChapterApiRequestParams = TApiRequestNonBodyParams<{
  chapterId: string | number;
}, void>;
/** (GET) 수학 단원 조회 Response */
export type TRetrieveMathChapterApiResponse = TMathChapter1Model;

/** (PUT) 수학 단원 수정 RequestParams */
export type TPutMathChapterApiRequestParams = TApiRequestBodyParams<{
  chapterId: string | number;
}, void, Omit<TMathChapter1Model, 'id' | 'chapter2_set'> & {
  chapter2_set: Array<Omit<TMathChapter2Model, 'id' | 'chapter3_set'> & {
    chapter3_set: Array<Omit<TMathChapter3Model, 'id'>>;
  }>;
}>;
/** (PUT) 수학 단원 수정 Response */
export type TPutMathChapterApiResponse = TMathChapter1Model;

/** (POST) 수학 단원 생성 RequestParams */
export type TProduceMathChapterApiRequestParams = TApiRequestBodyParams<
  void, 
  void, 
  Omit<TMathChapter1Model, 'id' | 'textbook_title' | 'textbook_id' | 'chapter2_set'> & {
    textbook_id: number;
    chapter2_set: Array<Omit<TMathChapter2Model, 'id' | 'chapter3_set'> & {
      chapter3_set: Array<Omit<TMathChapter3Model, 'id'>>;
    }>;
  }
>;
/** (POST) 수학 단원 생성 Response */
export type TProduceMathChapterApiResponse = TMathChapter1Model;

/** (POST) 수학 대단원 업로드 RequestParams */
export type TProduceMathChapter1ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 대단원 업로드 Response */
export type TProduceMathChapter1ImportApiResponse = any;

/** (POST) 수학 중단원 업로드 RequestParams */
export type TProduceMathChapter2ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 중단원 업로드 Response */
export type TProduceMathChapter2ImportApiResponse = any;

/** (POST) 수학 소단원 업로드 RequestParams */
export type TProduceMathChapter3ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 소단원 업로드 Response */
export type TProduceMathChapter3ImportApiResponse = any;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 성취기준 API
 */
/** (GET) 수학 성취기준 목록 조회 RequestParams */
export type TRetrieveMathAchievementsApiRequestParams = TApiRequestNonBodyParams<void, {
  // 필터 속성
  classtype?: TCMSClassType;
  curriculum?: TMathCurriculum;
  grade_cluster?: TCMSGradeCluster;
  // 검색 속성
  achievement_title?: string;
  achievement1_title?: string;
  achievement2_title?: string;
  achievement3_title?: string;
  achievement_code?: string;
  // 페이지 속성
  page?: number;
  // 페이지네이션 사용 여부 (false: 페이지네이션 없이 전체 조회)
  pagination?: boolean;
  // 미사용 속성
  search?: string;
}>;
/** (GET) 수학 성취기준 목록 조회 Response */
export type TRetrieveMathAchievementsApiResponse = TPaginationModel<TMathAchievement1Model>;

/** (GET) 수학 성취기준 조회 RequestParams */
export type TRetrieveMathAchievementApiRequestParams = TApiRequestNonBodyParams<{
  achievementId: string | number;
}, void>;
export type TRetrieveMathAchievementApiResponse = TMathAchievement1Model;

/** (PUT) 수학 성취기준 수정 RequestParams */
export type TPutMathAchievementApiRequestParams = TApiRequestBodyParams<{
  achievementId: string | number;
}, void, Omit<TMathAchievement1Model, 'achievement2_set'> & {
  achievement2_set: Array<Omit<TMathAchievement2Model, 'id' | 'achievement3_set'> & {
    id?: string | number;
    achievement3_set: Array<Omit<TMathAchievement3Model, 'id'>> & {
      id?: string | number;
    };
  }>;
}>;
/** (PUT) 수학 성취기준 수정 Response */
export type TPutMathAchievementApiResponse = TMathAchievement1Model;

/** (POST) 수학 성취기준 생성 RequestParams */
export type TProduceMathAchievementApiRequestParams = TApiRequestBodyParams<
  void,
  void,
  Omit<TMathAchievement1Model, 'id' | 'achievement2_set'> & {
    achievement2_set: Array<Omit<TMathAchievement2Model, 'id' | 'achievement3_set'> & {
      achievement3_set: Array<Omit<TMathAchievement3Model, 'id'>>;
    }>;
  }
>;
/** (POST) 수학 성취기준 생성 Response */
export type TProduceMathAchievementApiResponse = TPaginationModel<TMathAchievement1Model>;

/** (POST) 수학 성취기준1 업로드 RequestParams */
export type TProduceMathAchievement1ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 성취기준1 업로드 Response */
export type TProduceMathAchievement1ImportApiResponse = any;

/** (POST) 수학 성취기준2 업로드 RequestParams */
export type TProduceMathAchievement2ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 성취기준2 업로드 Response */
export type TProduceMathAchievement2ImportApiResponse = any;

/** (POST) 수학 성취기준3 업로드 RequestParams */
export type TProduceMathAchievement3ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 성취기준3 업로드 Response */
export type TProduceMathAchievement3ImportApiResponse = any;

// --- --- --- --- --- --- --- --- --- ---

/** 
 * 수학 지식개념 API
 */
/** (GET) 수학 지식개념 목록 조회 RequestParams */
export type TRetrieveMathKnowledgeConceptsApiRequestParams = TApiRequestNonBodyParams<void, {
  // 필터 속성
  achievement1_classtype?: TCMSClassType;
  achievement1_curriculum?: TMathCurriculum;
  achievement1_grade_cluster?: TCMSGradeCluster;
  // 검색 속성
  chapter_title?: string;
  kc1_title?: string;
  kc2_title?: string;
  kc_search?: string;
  // 성취기준3 ID
  achievement3_id?: number;
  pagination?: boolean;
  // 페이지 속성
  page?: number;
}>;
/** (GET) 수학 지식개념 목록 조회 Response */
export type TRetrieveMathKnowledgeConceptsApiResponse = TPaginationModel<TMathKnowledgeConcept1Model>;
/** (GET) 수학 지식개념 목록 조회 Response (페이지네이션 미적용 - 전체 조회) */
export type TRetrieveMathKnowledgeConceptsNonPaginationApiResponse = TMathKnowledgeConcept1Model[];

// FIXME: searchParams 정의 추가하기
/** (GET) 수학 지식개념 조회 RequestParams */
export type TRetrieveMathKnowledgeConceptApiRequestParams = TApiRequestNonBodyParams<{
  kc1Id: string | number;
}, void>;
/** (GET) 수학 지식개념 조회 Response */
export type TRetrieveMathKnowledgeConceptApiResponse = TMathKnowledgeConcept1Model;

/** (POST) 수학 지식개념 생성 RequestParams */
export type TProduceMathKnowledgeConceptApiRequestParams = TApiRequestBodyParams<
  void,
  void,
  Pick<TMathKnowledgeConcept1Model, 'title' | 'comment' | 'achievement3_id'> & {
    kc2_set: Array<Pick<TMathKnowledgeConcept2Model, 'title' | 'comment' | 'achievement3'>>;
  }
>;
/** (POST) 수학 지식개념 생성 Response */
export type TProduceMathKnowledgeConceptApiResponse = TMathKnowledgeConcept1Model;

/** (PUT) 수학 지식개념 수정 RequestParams */
export type TPutMathKnowledgeConceptApiRequestParams = TApiRequestBodyParams<{
  kc1Id: string | number;
}, void, Pick<TMathKnowledgeConcept1Model, 'title' | 'comment' | 'achievement3_id'> & {
  kc2_set: Array<
    Pick<TMathKnowledgeConcept2Model, 'title' | 'comment' | 'kc1' | 'achievement3'>
  >;
}>;
/** (PUT) 수학 지식개념 수정 Response */
export type TPutMathKnowledgeConceptApiResponse = any;

/** (POST) 수학 지식개념1 업로드 RequestParams */
export type TProduceMathKnowledgeConcept1ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 지식개념1 업로드 Response */
export type TProduceMathKnowledgeConcept1ImportApiResponse = any;

/** (POST) 수학 지식개념2 업로드 RequestParams */
export type TProduceMathKnowledgeConcept2ImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
/** (POST) 수학 지식개념2 업로드 Response */
export type TProduceMathKnowledgeConcept2ImportApiResponse = any;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 시리즈-출처 목록 조회 RequestParams
 */
/** (GET) 수학 시리즈-출처 목록 조회 RequestParrams */
export type TRetrieveMathSeriesSourcesApiRequestParams = TApiRequestNonBodyParams<void, {
  // 필터 속성
  source_classtype?: TCMSClassType;
  source_curriculum?: TMathCurriculum;
  source_grade?: TCMSElementaryGrade;
  source_term?: TCMSTerm;
  // 검색 속성
  series_source?: string;
  series_title?: string;
  source_name?: string;
  // 페이지 속성
  page?: number;
}>;
/** (GET) 수학 시리즈-출처 목록 조회 Response */
export type TRetrieveMathSeriesSourcesApiResponse = TPaginationModel<TMathSeriesModel>;

/** (GET) 수학 시리즈-출처 조회 RequestParams */
export type TRetrieveMathSeriesSourceApiRequestParams = TApiRequestNonBodyParams<{
  seriesId: string | number;
}, void>;
/** (GET) 수학 시리즈-출처 조회 Response */
export type TRetrieveMathSeriesSourceApiResponse = TMathSeriesModel;

/** (PUT) 수학 시리즈-출처 수정 RequestParams */
export type TPutMathSeriesSourceApiRequestParams = TApiRequestBodyParams<{
  seriesId: string | number;
}, void, Omit<TMathSeriesModel, 'id' | 'source_set'> & {
  source_set: Array<Omit<TMathSourceModel, 'id'>>;
}>;
/** (PUT) 수학 시리즈-출처 수정 Response */
export type TPutMathSeriesSourceApiResponse = TMathSeriesModel;

/** (POST) 시리즈-출처 생성 RequestParams */
export type TProduceMathSeriesSourceApiRequestParams = TApiRequestBodyParams<
  void,
  void,
  Omit<TMathSeriesModel, 'id' | 'source_set'> & {
    source_set: Array<Omit<TMathSourceModel, 'id'>>
  }
>;
// FIXME: 실제 응답 확인하기
export type TProduceMathSeriesSourceApiResponse = any;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 지문 API
 */
/** (GET) 수학 지문 목록 조회 RequestParams */
export type TRetrieveMathInstructionsApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
}>;
/** (GET) 수학 지문 목록 조회 Response */
export type TRetrieveMathInstructionsApiResponse = TPaginationModel<TMathInstructionModel>;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 문항 API
 */
/** (GET) 수학 문항 목록 조회 RequestParams */
export type TRetrieveMathQuestionsApiRequestParams = TApiRequestNonBodyParams<void, {
  // 필터 속성
  curriculum?: TMathCurriculum;
  source_classtype?: TCMSClassType;
  source_grade?: TCMSElementaryGrade;
  source_term?: TCMSTerm;
  kc2?: string[];
  // 검색 속성
  content?: string;
  internal_id?: string;
  instruction_inquiry?: string;
  // 페이지 속성
  page?: number;
  // 페이지네이션 사용 여부 (false: 페이지네이션 없이 전체 조회)
  pagination?: boolean;
  // 미사용 속성
  inquiry?: string;
  instruction?: string;
}>;
/** (GET) 수학 문항 목록 조회 Response */
export type TRetrieveMathQuestionsApiResponse = TPaginationModel<TMathQuestionModel>;

/** (GET) 수학 문항 조회 RequestParams */
export type TRetrieveMathQuestionApiRequestParams = TApiRequestNonBodyParams<{
  questionId: string | number;
}, void>;
/** (GET) 수학 문항 조회 Response */
export type TRetrieveMathQuestionApiResponse = TMathQuestionModel;

/** (PUT) 수학 문항 수정 RequestParams */
export type TPutMathQuestionApiRequestParams = TApiRequestBodyParams<{
  questionId: string | number,
}, void, Omit<TMathQuestionModel, 'textbook' | 'source' | 'instruction' | 'instruction_id' | 'achievement' | 'kc2' | 'chapter1' | 'chapter2' | 'chapter3' | 'chapters_info'> & {
  source_id?: number;
  instruction?: {
    /** 지문 ID */
    id: string | number;
    /** 지문 내용 */
    content: string;
  };
  /** 
   * 성취기준(소) ID 목록 
   * 
   * * 배열이지만 1개만 가능
   */
  achievement_ids?: string[];
  /** 지식개념2 ID */
  kc2_id?: number;
  /** 대단원 ID 목록 */
  chapter1_ids?: string[];
  /** 중단원 ID 목록 */
  chapter2_ids?: string[];
  /** 소단원 ID 목록 */
  chapter3_ids?: string[];
}>;
/** (PUT) 수학 문항 수정 Response */
export type TPutMathQuestionApiResponse = TMathQuestionModel;

/** (GET) 수학 문항 히스토리 목록 RequestParams */
export type TRetrieveMathQuestionHistoriesApiRequestParams = TApiRequestNonBodyParams<{
  questionId: string | number;
}, void>;
/** (GET) 수학 문항 히스토리 목록 Response */
export type TRetrieveMathQuestionHistoriesApiResponse = TPaginationModel<TMathQuestionHistoryModel>;

/** (POST) 수학 문항 다운로드 RequestParams */
export type TProduceMathQuestionsExportApiRequestParams = TApiRequestBodyParams<void, void, {
  file_format: TExportModalSetFileFormat;
  export_ids: number[];
}>;
// FIXME: 실제 응답 확인하기
/** (POST) 수학 문항 다운로드 Response */
export type TProduceMathQuestionsExportApiResponse = Blob;

/** (POST) 수학 문항 업로드 RequestParams */
export type TProduceMathQuestionImportApiRequestParams = TApiRequestBodyParams<void, void, {
  file: File;
}>;
// FIXME: 실제 응답 확인하기
/** (POST) 수학 문항 업로드 Response */
export type TProduceMathQuestionImportApiResponse = any;

// type
import { 
  TApiRequestBodyParams,
  TApiRequestNonBodyParams,
} from '../api.type';
import { 
  TCMSClassType,
  TCMSElementaryGrade,
  TCMSTerm,
  TPaginationModel,
} from '../models/cmsCommonModel.type';
import { 
  TMathAchievement1Model,
  TMathAchievementGradeCluster,
  TMathChapter1Model,
  TMathKnowledgeConcept1Model,
  TMathTextbookModel,
  TMathCurriculum,
  TMathSeriesModel,
  TMathInstructionModel,
  TMathQuestionModel,
  TMathChapter2Model,
  TMathChapter3Model,
} from '../models/mathModel.type';

/**
 * 수학 교과서 API
 */
/** (GET) 수학 교과서 목록 조회 RequestParams */
export type TRetrieveMathTextbooksApiRequestParams = TApiRequestNonBodyParams<void, {
  classtype?: TCMSClassType;
  grade?: TCMSElementaryGrade | TCMSElementaryGrade;
  page?: number;
  search?: string;
  term?: TCMSTerm;
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

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 단원 API
 */
/** (GET) 수학 단원 목록 조회 RequestParams */
export type TRetrieveMathChaptersApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
  textbook?: string;
  search?: string;
}>;
/** (GET) 수학 단원 목록 조회 Response */
export type TRetrieveMathChaptersApiResponse = TPaginationModel<TMathChapter1Model>;

/** (POST) 수학 단원 생성 RequestParams */
export type TProduceMathChapterApiRequestParams = TApiRequestBodyParams<
  void, 
  void, 
  Omit<TMathChapter1Model, 'id' | 'textbook_title' | 'chapter2_set'> & {
    textbook_id: number;
    chapter2_set: Array<Omit<TMathChapter2Model, 'id' | 'chapter3_set'> & {
      chapter3_set: Array<Omit<TMathChapter3Model, 'id'>>;
    }>;
  }
>;
// TODO: 실제 응답 확인하기
export type TProduceMathChapterApiResponse = TMathChapter1Model;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 성취기준 API
 */
/** (GET) 수학 성취기준 목록 조회 RequestParams */
export type TRetrieveMathAchievementsApiRequestParams = TApiRequestNonBodyParams<void, {
  achievement2?: string;
  achievement3?: string;
  classtype?: TCMSClassType;
  curriculum?: TMathCurriculum;
  grade_cluster?: TMathAchievementGradeCluster;
  page?: number;
  search?: string;
  title?: string;
}>;

/** (GET) 수학 성취기준 목록 조회 Response */
export type TRetrieveMathAchievementsApiResponse = TPaginationModel<TMathAchievement1Model>;

// --- --- --- --- --- --- --- --- --- ---

/** 
 * 수학 지식개념 API
 */
/** (GET) 수학 지식개념 목록 조회 RequestParams */
export type TRetrieveMathKnowledgeConceptsApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
  search?: string;
}>;

/** (GET) 수학 지식개념 목록 조회 Response */
export type TRetrieveMathKnowledgeConceptsApiResponse = TPaginationModel<TMathKnowledgeConcept1Model>;

// --- --- --- --- --- --- --- --- --- ---

/**
 * 수학 시리즈-출처 API
 */
/** (GET) 수학 시리즈-출처 목록 조회 RequestParrams */
export type TRetrieveMathSeriesSourcesApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
}>;

/** (GET) 수학 시리즈-출처 목록 조회 Response */
export type TRetrieveMathSeriesSourcesApiResponse = TPaginationModel<TMathSeriesModel>;

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
  page?: number;
}>;

/** (GET) 수학 문항 목록 조회 Response */
export type TRetrieveMathQuestionsApiResponse = TPaginationModel<TMathQuestionModel>;

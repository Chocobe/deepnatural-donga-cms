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
} from '../models/mathModel.type';

//
// (GET) 수학 교과서 목록
//
export type TRetrieveMathTextbooksApiRequestParams = TApiRequestNonBodyParams<void, {
  classtype?: TCMSClassType;
  grade?: TCMSElementaryGrade | TCMSElementaryGrade;
  page?: number;
  search?: string;
  term?: TCMSTerm;
}>;

export type TRetrieveMathTextbooksApiResponse = TPaginationModel<TMathTextbookModel>;

//
// (GET) 수학 교과서 조회
//
export type TRetrieveMathTextbookApiRequestParams = TApiRequestNonBodyParams<{
  textbookId: string;
}, void>;

export type TRetrieveMathTextbookApiResponse = TMathTextbookModel;

//
// (PATCH) 수학 교과서 수정
//
export type TPatchMathTextbookApiRequestParams = TApiRequestBodyParams<{
  textbookId: string;
}, void, Omit<TMathTextbookModel, 'id'>>;

export type TPatchMathTextbookApiResponse = TMathTextbookModel;

//
// (POST) 수학 교과서 생성
//
export type TProduceMathTextbookApiRequestParams = TApiRequestBodyParams<void, void, Omit<TMathTextbookModel, 'id'>>;

export type TProduceMathTextbookApiResponse = TMathTextbookModel;

//
// (DELETE) 수학 교과서 삭제
//
export type TDeleteMathTextbookApiRequestParams = TApiRequestNonBodyParams<{
  textbookId: string;
}, void>;

export type TDeleteMathTextbookApiResponse = void;

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 단원
//
export type TRetrieveMathChaptersApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
  textbook?: string;
  search?: string;
}>;

export type TRetrieveMathChaptersApiResponse = TPaginationModel<TMathChapter1Model>;

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 성취기준 목록
//
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

export type TRetrieveMathAchievementsApiResponse = TPaginationModel<TMathAchievement1Model>;

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 지식개념 목록
//
export type TRetrieveMathKnowledgeConceptsApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
  search?: string;
}>;

export type TRetrieveMathKnowledgeConceptsApiResponse = TPaginationModel<TMathKnowledgeConcept1Model>;

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 출처-시리즈 목록
//
export type TRetrieveSeriesApiRequestParams = TApiRequestNonBodyParams<void, {
  page?: number;
}>;

export type TRetrieveMathSeriesApiResponse = TPaginationModel<TMathSeriesModel>;

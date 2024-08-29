// type
import { 
  TApiRequestBodyParams,
  TApiRequestNonBodyParams,
} from '../api.type';
import { 
  TCMSCommonModelClassType,
  TCMSCommonModelElementaryGrade,
  TCMSCommonModelTerm,
  TPaginationModel,
} from '../models/cmsCommonModel.type';
import { 
  TMathAchievement1Model,
  TMathAchievementGradeCluster,
  TMathChapter1Model,
  TMathTextbookModel,
  TMathTextbookModelCurriculum,
} from '../models/mathModel.type';

//
// (GET) 수학 교과서 목록
//
export type TRetrieveMathTextbooksApiRequestParams = TApiRequestNonBodyParams<void, {
  classtype?: TCMSCommonModelClassType;
  grade?: TCMSCommonModelElementaryGrade | TCMSCommonModelElementaryGrade;
  page?: number;
  search?: string;
  term?: TCMSCommonModelTerm;
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
  classtype?: TCMSCommonModelClassType;
  curriculum?: TMathTextbookModelCurriculum;
  grade_cluster?: TMathAchievementGradeCluster;
  page?: number;
  search?: string;
  title?: string;
}>;

export type TRetrieveMathAchievementsApiResponse = TPaginationModel<TMathAchievement1Model>;

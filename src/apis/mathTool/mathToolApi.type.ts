// type
import { 
  TApiRequestBodyParams,
  TApiRequestNonBodyParams,
} from '../api.type';
import { 
  TPaginationModel,
} from '../models/cmsCommonModel.type';

export type TSearchApiPagination = Pick<TPaginationModel<any>, 'current_page' | 'last_page'>;

export type TSearchApiBaseGeneric = TPaginationModel<any>;

//
// 수학 작업도구 출처
//
/** 수학 작업도구 출처 Model */
export type TMathToolSourceModel = {
  id: string;
  series: string;
  classtype: string;
  grade: number;
  term: string;
  subject: string;
  name: string;
  serviceyear: string;
  author: string;
  publisher: string;
  curriculum: string;
};
/** (GET) MathToolSource 목록 RequestParams */
export type TRetrieveMathToolSourcesApiRequestParams = TApiRequestNonBodyParams<void, {
  name: string;
  page?: number;
}>;
/** (GET) MathToolSource 목록 Response */
export type TRetrieveMathToolSourcesApiResponse = TPaginationModel<TMathToolSourceModel>;

//
// 수학 작업도구 교과서
//
/** 수학 작업도구 교과서 Model */
export type TMathToolTextbookModel = {
  id: string;
  term: string;
  grade: string;
  classtype: string;
  title: string;
  author: string;
}
/** (GET) 수학 작업도구 교과서 목록 RequestParams */
export type TRetrieveMathToolTextbooksApiRequestParams = TApiRequestNonBodyParams<void, {
  title: string;
  page?: number;
}>;
/** (GET) 수학 작업도구 교과서 목록 Response */
export type TRetrieveMathToolTextbooksApiResponse = TPaginationModel<any>;

//
// 수학 작업도구 대단원
//
/** 수학 작업도구 대단원 Model */
export type TMathToolChapter1Model = {
  id: string;
  textbook: string;
  no: string | number;
  title: string;
};
/** (GET) 수학 작업도구 대단원 RequestParams */
export type TRetrieveMathToolChapter1ApiRequestParams = TApiRequestNonBodyParams<void, {
  title: string;
  textbook_title: string;
  page?: number;
}>;
/** (GET) 수학 작업도구 대단원 Response */
export type TRetrieveMathToolChapter1ApiResponse = TPaginationModel<TMathToolChapter1Model>;

//
// 수학 작업도구 중단원
//
/** 수학 작업도구 중단원 Model */
export type TMathToolChapter2Model = {
  id: string;
  textbook: string;
  chapter1: string;
  no: string | number;
  title: string;
};
/** (GET) 수학 작업도구 중단원 RequestParams */
export type TRetrieveMathToolChapter2ApiRequestParams = TApiRequestNonBodyParams<void, {
  title: string;
  textbook_title: string;
  chapter1_title: string;
  page?: number;
}>;
/** (GET) 수학 작업도구 중단원 Response */
export type TRetrieveMathToolChapter2ApiResponse = TPaginationModel<TMathToolChapter2Model>;

//
// 수학 작업도구 소단원
//
/** 수학 작업도구 소단원 Model */
export type TMathToolChapter3Model = {
  id: string;
  textbook: string;
  chapter1: string;
  chapter2: string;
  no: string | number;
  title: string;
};
/** (GET) 수학 작업도구 소단원 RequestParams */
export type TRetrieveMathToolChapter3ApiRequestParams = TApiRequestNonBodyParams<void, {
  title: string;
  textbook_title: string;
  chapter1_title: string;
  chapter2_title: string;
  page?: number;
}>;
/** (GET) 수학 작업도구 소단원 Response */
export type TRetrieveMathToolChapter3ApiResponse = TPaginationModel<TMathToolChapter3Model>;

//
// 수학 작업도구 지식개념
//
/** (GET) 수학 작업도구 지식개념 Model */
export type TMathToolKnowledgeConceptModel = {
  id: string;
  title: string;
  kc1: string;
  achievement3: string;
  achievement2: string;
  achievement1: string;

  comment: any;
};
/** (GET) 수학 작업도구 지식개념 RequestParams */
export type TRetrieveMathToolKnowledgeConceptsApiRequestParams = TApiRequestNonBodyParams<void, {
  title: string;
  page?: number;
}>;
/** (GET) 수학 작업도구 지식개념 Response */
export type TRetrieveMathToolKnowledgeConceptsApiResponse = TPaginationModel<TMathToolKnowledgeConceptModel>;

//
// 수학 작업도구 제출
//
/** 수학 작업도구 제출 속성 */
export type TMathToolSubmitAttributes = {
  [id: string]: string | number | boolean | null;
};
/** (POST) 수학 작업도구 제출 RequestParams */
export type TProduceMathToolSubmitApiRequestParams = TApiRequestBodyParams<void, void, {
  metadata: TMathToolSubmitAttributes;
  results: TMathToolSubmitAttributes[];
}>;
/** (POST) 수학 작업도구 제출 Response */
export type TProduceMathToolSubmitApiResponse = any;

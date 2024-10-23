// type
import { 
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

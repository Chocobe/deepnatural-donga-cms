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
  TMathTextbookModel,
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
// (GET) 수학 교과서
//
export type TRetrieveMathTextbookApiRequestParams = TApiRequestNonBodyParams<{
  textbookId: string;
}, void>;

export type TRetrieveMathTextbookApiResponse = TMathTextbookModel;

//
// (PATCH) 수학 교과서
//
export type TPatchMathTextbookApiRequestParams = TApiRequestBodyParams<{
  textbookId: string;
}, void, Omit<TMathTextbookModel, 'id'>>;

export type TPatchMathTextbookApiResponse = TMathTextbookModel;

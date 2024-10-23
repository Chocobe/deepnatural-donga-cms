// util
import createApiWithNoticeMessageGroup from '@/utils/createApiWithNoticeMessageGroup';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
// api
import api from '../api';
import mathToolApiUrlFactory from './mathToolApiUrlFactory';
// type
import { 
  TRetrieveMathToolSourcesApiRequestParams,
  TRetrieveMathToolSourcesApiResponse,

  TRetrieveMathToolTextbooksApiRequestParams,
  TRetrieveMathToolTextbooksApiResponse,
} from './mathToolApi.type';

//
// 수학 작업도구 출처 목록
//
export const retrieveMathToolSourcesApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathToolSourcesApiRequestParams) => {
    const {
      searchParams,
    } = params;

    return api.get<TRetrieveMathToolSourcesApiResponse>(
      mathToolApiUrlFactory.retrieveMathToolSourcesPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .retrieveMathToolSources,
});

//
// 수학 작업도구 교과서 목록
//
export const retrieveMathToolTextbooksApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathToolTextbooksApiRequestParams) => {
    const {
      searchParams,
    } = params;

    return api.get<TRetrieveMathToolTextbooksApiResponse>(
      mathToolApiUrlFactory.retrieveMathToolTextbooksPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .retrieveMathToolTextbooks,
});

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

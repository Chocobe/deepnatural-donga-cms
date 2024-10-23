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

  TRetrieveMathToolChapter1ApiRequestParams,
  TRetrieveMathToolChapter1ApiResponse,

  TRetrieveMathToolChapter2ApiRequestParams,
  TRetrieveMathToolChapter2ApiResponse,

  TRetrieveMathToolChapter3ApiRequestParams,
  TRetrieveMathToolChapter3ApiResponse,

  TRetrieveMathToolKnowledgeConceptsApiRequestParams,
  TRetrieveMathToolKnowledgeConceptsApiResponse,

  TProduceMathToolSubmitApiRequestParams,
  TProduceMathToolSubmitApiResponse,
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

//
// 수학 작업도구 대단원 목록
//
export const retrieveMathToolChapter1Api = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathToolChapter1ApiRequestParams) => {
    const {
      searchParams,
    } = params;

    return api.get<TRetrieveMathToolChapter1ApiResponse>(
      mathToolApiUrlFactory.retrieveMathToolChapter1Path(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .retrieveMathToolChapter1,
});

//
// 수학 작업도구 중단원 목록
//
export const retrieveMathToolChapter2Api = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathToolChapter2ApiRequestParams) => {
    const {
      searchParams,
    } = params;

    return api.get<TRetrieveMathToolChapter2ApiResponse>(
      mathToolApiUrlFactory.retrieveMathToolChapter2Path(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .retrieveMathToolChapter2,
});

//
// 수학 작업도구 소단원 목록
//
export const retrieveMathToolChapter3Api = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathToolChapter3ApiRequestParams) => {
    const {
      searchParams,
    } = params;

    return api.get<TRetrieveMathToolChapter3ApiResponse>(
      mathToolApiUrlFactory.retrieveMathToolChapter3Path(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .retrieveMathToolChapter3,
});

//
// 수학 작업도구 지식개념 목록
//
export const retrieveMathToolKnowledgeConceptsApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathToolKnowledgeConceptsApiRequestParams) => {
    const {
      searchParams,
    } = params;

    return api.get<TRetrieveMathToolKnowledgeConceptsApiResponse>(
      mathToolApiUrlFactory.retrieveMathToolKnowledgeConceptsPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .retrieveMathToolKnowledgeConcepts,
});

//
// 수학 작업도구 제출
//
export const produceMathToolSubmitApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathToolSubmitApiRequestParams) => {
    console.group('produceMathToolSubmitApi()');
    console.log('params: ', params);
    console.groupEnd();

    return api.post<TProduceMathToolSubmitApiResponse>(
      mathToolApiUrlFactory.produceMathToolSubmitPath(),
      params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .mathTool
    .produceMathToolSubmit
});

// api
import api from '../api';
import mathApiUrlFactory from './mathApiUrlFactory';
// util
import createApiWithNoticeMessageGroup from '../../utils/createApiWithNoticeMessageGroup';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
import excludeNullOrUndefinedProperties from '@/utils/excludeNullOrUndefinedProperties/excludeNullOrUndefinedProperties';
// type
import { 
  TRetrieveMathTextbooksApiRequestParams, 
  TRetrieveMathTextbooksApiResponse,

  TRetrieveMathTextbookApiRequestParams,
  TRetrieveMathTextbookApiResponse,

  TPatchMathTextbookApiRequestParams,
  TPatchMathTextbookApiResponse,

  TProduceMathTextbookApiRequestParams,
  TProduceMathTextbookApiResponse,

  TDeleteMathTextbookApiRequestParams,
  TDeleteMathTextbookApiResponse,
} from './mathApi.type';

// FIXME: mockup
import { 
  mockHistoryModalData, 
  THistoryModalData,
} from '@/components/shadcn-ui-custom/modals/HistoryModal/HistoryModal.type';

//
// (GET) 수학 교과서 목록
//
export const retrieveMathTextbooksApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathTextbooksApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathTextbooksApiResponse>(
      mathApiUrlFactory.retrieveMathTextbooks(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathTextbooks,
});

//
// (GET) 수학 교과서 조회
//
export const retrieveMathTextbookApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathTextbookApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathTextbookApiResponse>(
      mathApiUrlFactory.retrieveMathTextbook(_params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathTextbook,
});

//
// (PATCH) 수학 교과서 수정
//
export const patchMathTextbookApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPatchMathTextbookApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.patch<TPatchMathTextbookApiResponse>(
      mathApiUrlFactory.patchMathTextbook(_params),
      _params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .patchMathTextbook,
});

//
// (POST) 수학 교과서 생성
//
export const produceMathTextbook = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathTextbookApiRequestParams) => {
    const {
      payload,
    } = excludeNullOrUndefinedProperties(params);

    return api.post<TProduceMathTextbookApiResponse>(
      mathApiUrlFactory.produceMathTextbook(),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathTextbook,
});

//
// (DELETE) 수학 교과서 삭제
//
export const deleteMathTextbookApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TDeleteMathTextbookApiRequestParams) => {
    return api.delete<TDeleteMathTextbookApiResponse>(
      mathApiUrlFactory.deleteMathTextbook(params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .deleteMathTextbook,
});

//
// (GET) 수학 교과서 히스토리 목록
//
export const retrieveMathTextbookHistoriesApi = createApiWithNoticeMessageGroup({
  // FIXME: mockup
  apiFunction: (_textbookId: string) => {
    return new Promise<THistoryModalData[]>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5
          ? resolve(mockHistoryModalData)
          : reject('(mockup) 수학 교과서 히스토리 조회 실패');
      }, Math.random() * 1_000);
    });
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathTextbookHistories,
});

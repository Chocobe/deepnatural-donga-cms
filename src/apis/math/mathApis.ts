// api
import api from '../api';
import mathApiUrlFactory from './mathApiUrlFactory';
// util
import createApiWithNoticeMessageGroup from '../../utils/createApiWithNoticeMessageGroup';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
// type
import { 
  TRetrieveMathTextbooksApiRequestParams, 
  TRetrieveMathTextbooksApiResponse,
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
    } = params;

    return api.get<TRetrieveMathTextbooksApiResponse>(
      mathApiUrlFactory.retrieveMathTextbooks(),
      {
        params: searchParams,
      },
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathTextbooks,
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

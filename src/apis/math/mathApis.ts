// api
// import api from '../api';
// util
import createApiWithNoticeMessageGroup from '../../utils/createApiWithNoticeMessageGroup';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
// type
import { 
  TMathTextbookModel,
} from '../models/mathModel.type';
// FIXME: mockup
import { 
  mockMathTextbooks,
} from './mockMathTextbooks';
import { 
  mockHistoryModalData, 
  THistoryModalData,
} from '@/components/shadcn-ui-custom/modals/HistoryModal/HistoryModal.type';

// (GET) 수학 교과서 목록
export const retrieveMathTextbooksApi = createApiWithNoticeMessageGroup({
  // FIXME: mockup
  apiFunction: () => {
    return new Promise<TMathTextbookModel[]>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5
          ? resolve(mockMathTextbooks)
          : reject('(mockup) 수학 교과서 목록 조회 실패');
      }, Math.random() * 1_000);
    });
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathTextbooks,
});

// (GET) 수학 교과서 히스토리 목록
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

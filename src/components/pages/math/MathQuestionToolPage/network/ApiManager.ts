// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기

// network
// import RestClient from './RestClient';
import api from '@/apis/api';
import apiUrlFactory from './toolApiUrlFactory';
// type
import { 
  TSubmitApiPayload,
  TSubmitApiResponse,
} from './network.type/taskApi.type';
import {
  TRetrieveKnowledgeConceptListApiPayload,
  TRetrieveKnowledgeConceptListApiResponse,
} from './network.type/searchApi.type';
// utils
import { 
  getCookie,
} from '../utils/cookieUtils';

const ApiManager = {
  /**
   * 지식개념 목록을 조회합니다.
   */
  retrieveKnowledgeConceptList(payload: TRetrieveKnowledgeConceptListApiPayload) {
    const {
      pathParams: {
        title,
        page = '1',
      },
    } = payload;

    return api.get<TRetrieveKnowledgeConceptListApiResponse>(
      apiUrlFactory.retrieveKnowledgeConceptListUrl(title, page)
    );
  },

  /**
   * 작업을 제출합니다.
   */
  submit(payload: TSubmitApiPayload) {
    return api.post<TSubmitApiResponse>(
      apiUrlFactory.submitUrl(),
      payload,
      {
        headers: {
          'X-CSRFTOKEN': getCookie('csrftoken'),
        },
      }
    );
  },
} as const;

export default ApiManager;

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
// utils
import { 
  getCookie,
} from '../utils/cookieUtils';

const ApiManager = {
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

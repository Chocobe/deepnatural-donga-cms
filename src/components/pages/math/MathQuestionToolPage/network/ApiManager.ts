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

  TRetrieveChapter1ApiPayload,
  TRetrieveChapter1ApiResponse,

  TRetrieveChapter2ApiPayload,
  TRetrieveChapter2ApiResponse,

  TRetrieveChapter3ApiPayload,
  TRetrieveChapter3ApiResponse,
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
   * 대단원(chapter1) 목록을 조회합니다.
   */
  retrieveChapter1List(payload: TRetrieveChapter1ApiPayload) {
    const {
      pathParams: {
        title,
        textbookTitle,
        page = '1',
      },
    } = payload;

    return api.get<TRetrieveChapter1ApiResponse>(
      apiUrlFactory.retrieveChapter1ListUrl(title, textbookTitle, page)
    );
  },

  /**
   * 중단원(chapter2) 목록을 조회합니다.
   */
  retrieveChapter2List(payload: TRetrieveChapter2ApiPayload) {
    const {
      pathParams: {
        title,
        textbookTitle,
        chapter1Title,
        page = '1',
      },
    } = payload;

    return api.get<TRetrieveChapter2ApiResponse>(
      apiUrlFactory.retrieveChapter2ListUrl(title, textbookTitle, chapter1Title, page)
    );
  },

  /**
   * 소단원(chapter3) 목록을 조회합니다.
   */
  retrieveChapter3List(payload: TRetrieveChapter3ApiPayload) {
    const {
      pathParams: {
        title,
        textbookTitle,
        chapter1Title,
        chapter2Title,
        page = '1',
      },
    } = payload;

    return api.get<TRetrieveChapter3ApiResponse>(
      apiUrlFactory.retrieveChapter3ListUrl(title, textbookTitle, chapter1Title, chapter2Title, page)
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

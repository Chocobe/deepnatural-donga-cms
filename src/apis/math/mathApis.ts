// api
import api from '../api';
import mathApiUrlFactory from './mathApiUrlFactory';
// qs
import qs from 'qs';
// util
import createApiWithNoticeMessageGroup from '../../utils/createApiWithNoticeMessageGroup';
import noticeMessageGroupFactory from '@/utils/noticeMessageGroupFactory';
import excludeNullOrUndefinedProperties from '@/utils/excludeNullOrUndefinedProperties/excludeNullOrUndefinedProperties';
import trimRecursive from '@/utils/trimRecursive/trimRecursive';
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

  TProduceMathTextbookImportApiRequestParams,
  TProduceMathTextbookImportApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathChaptersApiRequestParams,
  TRetrieveMathChaptersApiResponse,

  TRetrieveMathChapterApiRequestParams,
  TRetrieveMathChapterApiResponse,

  TPutMathChapterApiRequestParams,
  TPutMathChapterApiResponse,

  TProduceMathChapterApiRequestParams,
  TProduceMathChapterApiResponse,

  TProduceMathChapter1ImportApiRequestParams,
  TProduceMathChapter1ImportApiResponse,

  TProduceMathChapter2ImportApiRequestParams,
  TProduceMathChapter2ImportApiResponse,

  TProduceMathChapter3ImportApiRequestParams,
  TProduceMathChapter3ImportApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathAchievementsApiRequestParams,
  TRetrieveMathAchievementsApiResponse,

  TRetrieveMathAchievementApiRequestParams,
  TRetrieveMathAchievementApiResponse,

  TPutMathAchievementApiRequestParams,
  TPutMathAchievementApiResponse,

  TProduceMathAchievementApiRequestParams,
  TProduceMathAchievementApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathKnowledgeConceptsApiRequestParams,
  TRetrieveMathKnowledgeConceptsApiResponse,
  TRetrieveMathKnowledgeConceptsNonPaginationApiResponse,

  TRetrieveMathKnowledgeConceptApiRequestParams,
  TRetrieveMathKnowledgeConceptApiResponse,

  TProduceMathKnowledgeConceptApiRequestParams,
  TProduceMathKnowledgeConceptApiResponse,

  TPutMathKnowledgeConceptApiRequestParams,
  TPutMathKnowledgeConceptApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathSeriesSourcesApiRequestParams,
  TRetrieveMathSeriesSourcesApiResponse,

  TRetrieveMathSeriesSourceApiRequestParams,
  TRetrieveMathSeriesSourceApiResponse,

  TPutMathSeriesSourceApiRequestParams,
  TPutMathSeriesSourceApiResponse,

  TProduceMathSeriesSourceApiRequestParams,
  TProduceMathSeriesSourceApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathInstructionsApiRequestParams,
  TRetrieveMathInstructionsApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathQuestionsApiRequestParams,
  TRetrieveMathQuestionsApiResponse,

  TRetrieveMathQuestionApiRequestParams,
  TRetrieveMathQuestionApiResponse,

  TPutMathQuestionApiRequestParams,
  TPutMathQuestionApiResponse,

  TRetrieveMathQuestionHistoriesApiRequestParams,
  TRetrieveMathQuestionHistoriesApiResponse,

  TProduceMathQuestionsExportApiRequestParams,
  TProduceMathQuestionsExportApiResponse,

  TProduceMathQuestionImportApiRequestParams,
  TProduceMathQuestionImportApiResponse,
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
// (POST) 수학 문항 업로드
//
export const produceMathTextbookImportApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathTextbookImportApiRequestParams) => {
    const {
      payload,
    } = params;

    const formData = new FormData();
    formData.append('file', payload.file);

    return api.post<TProduceMathTextbookImportApiResponse>(
      mathApiUrlFactory.produceMathTextbookImport(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathQuestionImport
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

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 단원 목록
//
export const retrieveMathChaptersApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathChaptersApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathChaptersApiResponse>(
      mathApiUrlFactory.retrieveMathChaptersPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathChapters,
});

//
// (GET) 수학 단원 조회
//
export const retrieveMathChapterApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathChapterApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathChapterApiResponse>(
      mathApiUrlFactory.retrieveMathChapterPath(_params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathChapter,
});

//
// (PUT) 수학 단원 수정
//
export const putMathChapterApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPutMathChapterApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.put<TPutMathChapterApiResponse>(
      mathApiUrlFactory.putMathChapterPath(_params),
      _params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .putMathChapter
});

//
// (POST) 수학 단원 생성
//
export const produceMathChapterApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathChapterApiRequestParams) => {
    const {
      payload,
    } = excludeNullOrUndefinedProperties(trimRecursive(params));

    return api.post<TProduceMathChapterApiResponse>(
      mathApiUrlFactory.produceMathChapterPath(),
      payload,
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathChapter,
});

//
// (POST) 수학 대단원 업로드
//
export const produceMathChapter1ImportApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathChapter1ImportApiRequestParams) => {
    const {
      payload,
    } = params;

    const formData = new FormData();
    formData.append('file', payload.file);

    return api.post<TProduceMathChapter1ImportApiResponse>(
      mathApiUrlFactory.produceMathChapter1Importpath(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathQuestionImport
});

//
// (POST) 수학 중단원 업로드
//
export const produceMathChapter2ImportApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathChapter2ImportApiRequestParams) => {
    const {
      payload,
    } = params;

    const formData = new FormData();
    formData.append('file', payload.file);

    return api.post<TProduceMathChapter2ImportApiResponse>(
      mathApiUrlFactory.produceMathChapter2Importpath(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathQuestionImport
});

//
// (POST) 수학 소단원 업로드
//
export const produceMathChapter3ImportApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathChapter3ImportApiRequestParams) => {
    const {
      payload,
    } = params;

    const formData = new FormData();
    formData.append('file', payload.file);

    return api.post<TProduceMathChapter3ImportApiResponse>(
      mathApiUrlFactory.produceMathChapter3Importpath(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathQuestionImport
});

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 성취기준 목록
//
export const retrieveMathAchievementsApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathAchievementsApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathAchievementsApiResponse>(
      mathApiUrlFactory.retrieveMathAchievementsPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathAchievements,
});

//
// (GET) 수학 성취기준 조회
//
export const retrieveMathAchievementApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathAchievementApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathAchievementApiResponse>(
      mathApiUrlFactory.retrieveMathAchievementPath(_params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathAchievements,
});

//
// (PUT) 수학 성취기준 수정
//
export const putMathAchievementApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPutMathAchievementApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.put<TPutMathAchievementApiResponse>(
      mathApiUrlFactory.putMathAchievementPath(_params),
      _params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .putMathAchievement,
});

//
// (POST) 수학 성취기준 생성
//
export const produceMathAchievementApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathAchievementApiRequestParams) => {
    const {
      payload,
    } = excludeNullOrUndefinedProperties(params);

    return api.post<TProduceMathAchievementApiResponse>(
      mathApiUrlFactory.produceMathAchievementPath(),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathAchievement,
});

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 지식개념 목록
//
export const retrieveMathKnowledgeConceptsApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathKnowledgeConceptsApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathKnowledgeConceptsApiResponse>(
      mathApiUrlFactory.retrieveMathKnowledgeConceptsPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathKnowledgeConcepts,
});
export const retrieveMathKnowledgeConceptsNonPaginationApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathKnowledgeConceptsApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathKnowledgeConceptsNonPaginationApiResponse>(
      mathApiUrlFactory.retrieveMathKnowledgeConceptsPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathKnowledgeConcepts,
});

//
// (GET) 수학 지식개념 조회
//
export const retrieveMathKnowledgeConceptApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathKnowledgeConceptApiRequestParams) => {
    return api.get<TRetrieveMathKnowledgeConceptApiResponse>(
      mathApiUrlFactory.retrieveMathKnowledgeConceptPath(params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathKnowledgeConcept,
});

//
// (POST) 수학 지식개념 생성
//
export const produceMathKnowledgeConceptApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathKnowledgeConceptApiRequestParams) => {
    const {
      payload,
    } = excludeNullOrUndefinedProperties(trimRecursive(params));

    return api.post<TProduceMathKnowledgeConceptApiResponse>(
      mathApiUrlFactory.produceMathKnowledgeConceptPath(),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathKnowledgeConcept
});

//
// (PUT) 수학 지식개념 수정
//
export const putMathKnowledgeConceptApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPutMathKnowledgeConceptApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.put<TPutMathKnowledgeConceptApiResponse>(
      mathApiUrlFactory.putMathKnowledgeConceptPath(_params),
      _params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .putMathKnowledgeConcept,
});

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 시리즈-출처 목록
//
export const retrieveMathSeriesSourcesApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathSeriesSourcesApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathSeriesSourcesApiResponse>(
      mathApiUrlFactory.retrieveMathSeriesSourcesPath(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathSeriesSources,
});

//
// (GET) 수학 시리즈-출처 조회
//
export const retrieveMathSeriesSourceApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathSeriesSourceApiRequestParams) => {
    return api.get<TRetrieveMathSeriesSourceApiResponse>(
      mathApiUrlFactory.retrieveMathSeriesSourcePath(params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathSeriesSource,
});

//
// (PUT) 수학 시리즈-출처 수정
//
export const putMathSeriesSourceApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPutMathSeriesSourceApiRequestParams) => {
    const _params = excludeNullOrUndefinedProperties(params);

    return api.put<TPutMathSeriesSourceApiResponse>(
      mathApiUrlFactory.putMathSeriesSourcePath(_params),
      _params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .putMathSeriesSource,
});

//
// (POST) 시리즈-출처 생성
//
export const produceMathSeriesSourceApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathSeriesSourceApiRequestParams) => {
    const {
      payload,
    } = params;

    return api.post<TProduceMathSeriesSourceApiResponse>(
      mathApiUrlFactory.produceMathSeriesSourcePath(),
      payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathSeriesSources,
});

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 지문 목록
//
export const retrieveMathInstructionsApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathInstructionsApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathInstructionsApiResponse>(
      mathApiUrlFactory.retrieveMathInstructions(),
      {
        params: searchParams,
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathInstructions,
});

// --- --- --- --- --- --- --- --- --- ---

//
// (GET) 수학 문항 목록
//
export const retrieveMathQuestionsApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathQuestionsApiRequestParams) => {
    const {
      searchParams,
    } = excludeNullOrUndefinedProperties(params);

    return api.get<TRetrieveMathQuestionsApiResponse>(
      mathApiUrlFactory.retrieveMathQuestions(),
      {
        params: searchParams,
        paramsSerializer: params => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathQuestions,
});

//
// (GET) 수학 문항 조회
//
export const retrieveMathQuestionApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathQuestionApiRequestParams) => {
    return api.get<TRetrieveMathQuestionApiResponse>(
      mathApiUrlFactory.retrieveMathQuestion(params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathQuestion,
});

//
// (PUT) 수학 문항 수정
//
export const putMathQuestionApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TPutMathQuestionApiRequestParams) => {
    return api.put<TPutMathQuestionApiResponse>(
      mathApiUrlFactory.putMathQuestion(params),
      params.payload
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .putMathQuestion,
});

//
// (GET) 수학 문항 히스토리 목록
//
export const retrieveMathQuestionHistoriesApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TRetrieveMathQuestionHistoriesApiRequestParams) => {
    return api.get<TRetrieveMathQuestionHistoriesApiResponse>(
      mathApiUrlFactory.retrieveMathQuestionHistories(params)
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathQuestionHistories
});

//
// (POST) 수학 문항 다운로드
//
export const produceMathQuestionsExportApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathQuestionsExportApiRequestParams) => {
    const {
      payload,
    } = params;

    return api.post<TProduceMathQuestionsExportApiResponse>(
      mathApiUrlFactory.produceMathQuestionsExport(),
      payload,
      {
        responseType: 'blob',
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathQuestionsExport,
});

//
// (POST) 수학 문항 업로드
//
export const produceMathQuestionImportApi = createApiWithNoticeMessageGroup({
  apiFunction: (params: TProduceMathQuestionImportApiRequestParams) => {
    const {
      payload,
    } = params;

    const formData = new FormData();
    formData.append('file', payload.file);

    return api.post<TProduceMathQuestionImportApiResponse>(
      mathApiUrlFactory.produceMathQuestionImport(),
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .produceMathQuestionImport
});

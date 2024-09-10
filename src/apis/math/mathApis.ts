// api
import api from '../api';
import mathApiUrlFactory from './mathApiUrlFactory';
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

  TRetrieveMathSeriesSourcesApiRequestParams,
  TRetrieveMathSeriesSourcesApiResponse,

  TRetrieveMathInstructionsApiRequestParams,
  TRetrieveMathInstructionsApiResponse,

  TRetrieveMathQuestionsApiRequestParams,
  TRetrieveMathQuestionsApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathChaptersApiRequestParams,
  TRetrieveMathChaptersApiResponse,

  TProduceMathChapterApiRequestParams,
  TProduceMathChapterApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathAchievementsApiRequestParams,
  TRetrieveMathAchievementsApiResponse,

  TProduceMathAchievementApiRequestParams,
  TProduceMathAchievementApiResponse,
} from './mathApi.type';
import {
  TRetrieveMathKnowledgeConceptsApiRequestParams,
  TRetrieveMathKnowledgeConceptsApiResponse,

  TProduceMathKnowledgeConceptApiRequestParams,
  TProduceMathKnowledgeConceptApiResponse,
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
      }
    );
  },
  noticeMessageGroup: noticeMessageGroupFactory
    .apis
    .math
    .retrieveMathQuestions,
});

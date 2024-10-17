// type
import { 
  TRetrieveMathTextbookApiRequestParams,
  TPatchMathTextbookApiRequestParams,
  TDeleteMathTextbookApiRequestParams,
  TRetrieveMathChapterApiRequestParams,
  TPutMathChapterApiRequestParams,
  TRetrieveMathKnowledgeConceptApiRequestParams,
  TPutMathKnowledgeConceptApiRequestParams,
  TRetrieveMathAchievementApiRequestParams,
  TPutMathAchievementApiRequestParams,
  TRetrieveMathSeriesSourceApiRequestParams,
  TPutMathSeriesSourceApiRequestParams,
  TRetrieveMathQuestionApiRequestParams,
  TRetrieveMathQuestionHistoriesApiRequestParams,
  TPutMathQuestionApiRequestParams,
} from './mathApi.type';

const mathApiUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  //
  // 수학 교과서
  //
  const mathTextbookPaths = {
    /** (GET) 수학 교과서 목록 */
    retrieveMathTextbooks() {
      return `${BASE_PATH}textbooks/`;
    },

    /** (GET) 수학 교과서 조회 */
    retrieveMathTextbook(params: TRetrieveMathTextbookApiRequestParams) {
      const {
        pathParams: {
          textbookId,
        },
      } = params;

      return `${this.retrieveMathTextbooks()}${textbookId}/`;
    },

    /** (PATCH) 수학 교과서 수정 */
    patchMathTextbook(params: TPatchMathTextbookApiRequestParams) {
      return this.retrieveMathTextbook(params);
    },

    /** (POST) 수학 교과서 생성 */
    produceMathTextbook() {
      return this.retrieveMathTextbooks();
    },

    /** (DELETE) 수학 교과서 삭제 */
    deleteMathTextbook(params: TDeleteMathTextbookApiRequestParams) {
      const {
        pathParams: {
          textbookId,
        },
      } = params;

      return `${this.retrieveMathTextbooks()}${textbookId}/`;
    },
  };

  //
  // 수학 단원
  //
  const mathChapterPaths = {
    /** (GET) 수학 단원 목록 */
    retrieveMathChaptersPath() {
      return `${BASE_PATH}chapters/`;
    },

    /** (GET) 수학 단원 조회 */
    retrieveMathChapterPath(params: TRetrieveMathChapterApiRequestParams) {
      const {
        pathParams: {
          chapterId,
        },
      } = params;

      return `${this.retrieveMathChaptersPath()}${chapterId}`;
    },

    /** (PUT) 수학 단원 수정 */
    putMathChapterPath(params: TPutMathChapterApiRequestParams) {
      return this.retrieveMathChapterPath(params);
    },

    /** (POST) 수학 단원 생성 */
    produceMathChapterPath() {
      return this.retrieveMathChaptersPath();
    },
  };

  //
  // 수학 성취기준
  //
  const mathAchievementPaths = {
    /** (GET) 수학 성취기준 목록 */
    retrieveMathAchievementsPath() {
      return `${BASE_PATH}achievements/`;
    },

    /** (GET) 수학 성취기준 조회 */
    retrieveMathAchievementPath(params: TRetrieveMathAchievementApiRequestParams) {
      const {
        pathParams: {
          achievementId,
        },
      } = params;

      return `${this.retrieveMathAchievementsPath()}${achievementId}/`;
    },

    /** (PUT) 수학 성취기준 수정 */
    putMathAchievementPath(params: TPutMathAchievementApiRequestParams) {
      return `${this.retrieveMathAchievementPath(params)}`;
    },

    /** (POST) 수학 성취기준 생성 */
    produceMathAchievementPath() {
      return this.retrieveMathAchievementsPath();
    },
  };

  //
  // 수학 지식개념
  //
  const mathKnowledgeConceptPaths = {
    /** (GET) 수학 지식개념 목록 */
    retrieveMathKnowledgeConceptsPath() {
      return `${BASE_PATH}kcs/`;
    },

    /** (GET) 수학 지식개념 조회 */
    retrieveMathKnowledgeConceptPath(params: TRetrieveMathKnowledgeConceptApiRequestParams) {
      const {
        pathParams: {
          kc1Id,
        }
      } = params;

      return `${this.retrieveMathKnowledgeConceptsPath()}${kc1Id}`;
    },

    /** (POST) 수학 지식개념 생성 */
    produceMathKnowledgeConceptPath() {
      return this.retrieveMathKnowledgeConceptsPath();
    },

    /** (PUT) 수학 지식개념 수정 */
    putMathKnowledgeConceptPath(params: TPutMathKnowledgeConceptApiRequestParams) {
      return this.retrieveMathKnowledgeConceptPath(params);
    },
  };

  //
  // 수학 시리즈-출처
  //
  const mathSeriesSourcePaths = {
    /** (GET) 수학 시리즈-출처 목록 */
    retrieveMathSeriesSourcesPath() {
      return `${BASE_PATH}series/`;
    },

    /** (GET) 수학 시리즈-출처 조회 */
    retrieveMathSeriesSourcePath(params: TRetrieveMathSeriesSourceApiRequestParams) {
      const {
        pathParams: {
          seriesId,
        },
      } = params;

      return `${BASE_PATH}series/${seriesId}/`;
    },

    /** (PUT) 수학 시리즈-출처 수정 */
    putMathSeriesSourcePath(params: TPutMathSeriesSourceApiRequestParams) {
      return `${this.retrieveMathSeriesSourcePath(params)}`;
    },

    /** (POST) 수학 시리즈-출처 생성 */
    produceMathSeriesSourcePath() {
      return this.retrieveMathSeriesSourcesPath();
    },
  };

  //
  // 수학 지문
  //
  const mathInstructionPaths = {
    /** (GET) 수학 지문 목록 */
    retrieveMathInstructions() {
      return `${BASE_PATH}instructions/`;
    },
  };

  //
  // 수학 문항
  //
  const mathQuestionPaths = {
    /** (GET) 수학 문항 목록 */
    retrieveMathQuestions() {
      return `${BASE_PATH}questions/`;
    },

    /** (GET) 수학 문항 조회 */
    retrieveMathQuestion(params: TRetrieveMathQuestionApiRequestParams) {
      const {
        pathParams: {
          questionId,
        },
      } = params;

      return `${BASE_PATH}questions/${questionId}`;
    },

    /** (PUT) 수학 문항 수정 */
    putMathQuestion(params: TPutMathQuestionApiRequestParams) {
      return this.retrieveMathQuestion(params);
    },

    /** (GET) 수학 문항 히스토리 목록 */
    retrieveMathQuestionHistories(params: TRetrieveMathQuestionHistoriesApiRequestParams) {
      const {
        pathParams: {
          questionId,
        },
      } = params;

      // FIXME: API 추가되면 주석해제
      return `${this.retrieveMathQuestions()}histories/${questionId}/`;

      // FIXME: API 추가되면 지우기
      // return `${this.retrieveMathQuestions()}histories/`;
    },
  };

  return {
    ...mathTextbookPaths,
    ...mathChapterPaths,
    ...mathAchievementPaths,
    ...mathKnowledgeConceptPaths,
    ...mathSeriesSourcePaths,
    ...mathInstructionPaths,
    ...mathQuestionPaths,
  } as const;
})();

export default mathApiUrlFactory;

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

    /** (POST) 수학 교과서 업로드 */
    produceMathTextbookImport() {
      return `${BASE_PATH}textbooks/import/`;
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

    /** (POST) 수학 대단원 업로드 */
    produceMathChapter1ImportPath() {
      return `${BASE_PATH}chapter1/import/`;
    },

    /** (POST) 수학 중단원 업로드 */
    produceMathChapter2ImportPath() {
      return `${BASE_PATH}chapter2/import/`;
    },

    /** (POST) 수학 소단원 업로드 */
    produceMathChapter3ImportPath() {
      return `${BASE_PATH}chapter3/import/`;
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

    /** (POST) 수학 성취기준(대) 업로드 */
    produceMathAchievement1ImportPath() {
      return `${BASE_PATH}achievement1/import/`;
    },

    /** (POST) 수학 성취기준(중) 업로드 */
    produceMathAchievement2ImportPath() {
      return `${BASE_PATH}achievement2/import/`;
    },

    /** (POST) 수학 성취기준 업로드 */
    produceMathAchievement3ImportPath() {
      return `${BASE_PATH}achievement3/import/`;
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

    /** (POST) 수학 지식개념1 업로드 */
    produceMathKnowledgeConcept1ImportPath() {
      return `${BASE_PATH}kc1/import/`;
    },

    /** (POST) 수학 지식개념2 업로드 */
    produceMathKnowledgeConcept2ImportPath() {
      return `${BASE_PATH}kc2/import/`;
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

    /** (POST) 수학 시리즈 업로드 */
    produceMathSeriesImportPath() {
      return `${BASE_PATH}series/import/`;
    },

    /** (POST) 수학 출처 업로드 */
    produceMathSourceImportPath() {
      return `${BASE_PATH}source/import/`;
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

      return `${this.retrieveMathQuestions()}${questionId}/histories/`;
    },

    /** (POST) 수학 문항 다운로드 */
    produceMathQuestionsExport() {
      return `${BASE_PATH}question/export/`;
    },

    /** (POST) 수학 문항 업로드 */
    produceMathQuestionImport() {
      return `${BASE_PATH}question/import/`;
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

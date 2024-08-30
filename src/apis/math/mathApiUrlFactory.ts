// type
import { 
  TRetrieveMathTextbookApiRequestParams,
  TPatchMathTextbookApiRequestParams,
  TDeleteMathTextbookApiRequestParams,
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
  };

  //
  // 수학 성취기준
  //
  const mathAchievementPaths = {
    /** (GET) 수학 성취기준 목록 */
    retrieveMathAchievementsPath() {
      return `${BASE_PATH}achievements/`;
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
  };

  return {
    ...mathTextbookPaths,
    ...mathChapterPaths,
    ...mathAchievementPaths,
    ...mathKnowledgeConceptPaths,
  } as const;
})();

export default mathApiUrlFactory;

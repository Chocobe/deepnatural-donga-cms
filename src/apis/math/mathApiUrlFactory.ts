// type
import { 
  TPatchMathTextbookApiRequestParams,
  TRetrieveMathTextbookApiRequestParams,
} from './mathApi.type';

const mathApiUrlFactory = (() => {
  const BASE_PATH = import.meta.env.VITE_CMS_API_PATH;

  return {
    // (GET) 수학 교과서 목록
    retrieveMathTextbooks() {
      return `${BASE_PATH}textbooks/`;
    },

    // (GET) 수학 교과서
    retrieveMathTextbook(params: TRetrieveMathTextbookApiRequestParams) {
      const {
        pathParams: {
          textbookId,
        },
      } = params;

      return `${this.retrieveMathTextbooks()}${textbookId}/`;
    },

    // (PATCH) 수학 교과서
    patchMathTextbook(params: TPatchMathTextbookApiRequestParams) {
      return this.retrieveMathTextbook(params);
    },
  };
})();

export default mathApiUrlFactory;

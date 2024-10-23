// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기
// FIXME: CMS 파일구조와 통합하기

const createFailureMessage = (
  message: string,
  status?: string | number
) => {
  return status
    ? `${message}\n(${status})`
    : message;
};

const apiFeedbackMessageFactory = {
  searchApi: {
    //
    // retrieve KnowledgeConceptList
    //
    retrieveKnowledgeConceptListRequest() {
      return '잠시만 기다려 주세요.\n지식개념 검색 중입니다.';
    },
    retrieveKnowledgeConceptListFailure(status: string | number) {
      return createFailureMessage(
        '지식개념 검색 중 네트워크 에러가 발생하였습니다.\n인터넷이 원활한 곳에서 다시 시도해 주세요.',
        status
      );
    },
  },

  taskApi: {
    submitRequest() {
      return '잠시만 기다려주세요.\n제출 중입니다.';
    },
    submitFailure(status?: string | number) {
      return createFailureMessage(
        '작업 제출 중 네트워크 에러가 발생하였습니다.\n잠시 후 다시 시도해 주세요.',
        status
      );
    },
  },

  mathEditor: {
    produceMathMLFromLatexRequest() {
      return 'LaTeX => MathML 변환 중입니다.';
    },
    produceMathMLFromLatexFailure(status?: string | number) {
      return createFailureMessage(
        'LaTex => MathML 변환 중, 네트워크 에러가 발생하였습니다.\n잠시후 다시 시도해 주세요.',
        status
      );
    },
  },
} as const;

export const createErrorMessage = ((params: {
    error: any,
    createDefaultErrorMessage: (state: string | number) => string,
}) => {
  const {
    error,
    createDefaultErrorMessage,
  } = params;

  const status = error.status;
  const errorMessage = error.detail;

  if (errorMessage) {
    return status
      ? `${errorMessage}\n(${status})`
      : errorMessage;
  }

  return createDefaultErrorMessage(status);
});

export default apiFeedbackMessageFactory;

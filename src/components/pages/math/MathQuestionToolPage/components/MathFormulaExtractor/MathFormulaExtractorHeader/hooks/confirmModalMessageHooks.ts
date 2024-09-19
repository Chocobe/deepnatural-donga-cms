const confirmModalMessageMapper = {
  submit: {
    title: '제출하기',
    message: '작업을 충분히 검토하셨나요?',
    confirmButtonText: '확인', 
    cancelButtonText: '취소',
  },

  exit: {
    title: '나가기',
    message: '정말로 나가시겠어요?\n제출되지 않은 작업은 삭제됩니다.',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  },

  resetDetail: {
    title: '리셋',
    message: '해당 항목을 리셋하시겠어요?',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  },

  removeQuestion: {
    title: '문항 삭제',
    message: '문항을 삭제하시겠어요?',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  },

  closePdf: {
    title: '문서 닫기',
    message: '현재 문서를 닫으시겠어요?',
    confirmButtonText: '확인',
    cancelButtonText: '취소',
  },
} as const;

export const useSubmitConfirmModalMessage = () => {
  const {
    title,
    message,
    confirmButtonText,
    cancelButtonText,
  } = confirmModalMessageMapper.submit;

  return {
    submitConfirmModalTitle: title,
    submitConfirmModalMessage: message,
    submitConfirmModalConfirmButtonText: confirmButtonText, 
    submitConfirmModalCancelButtonText: cancelButtonText,
  };
};

export const useExitConfirmModalMessage = () => {
  const {
    title,
    message,
    confirmButtonText,
    cancelButtonText,
  } = confirmModalMessageMapper.exit;

  return {
    exitConfirmModalTitle: title,
    exitConfirmModalMessage: message,
    exitConfirmModalConfirmButtonText: confirmButtonText, 
    exitConfirmModalCancelButtonText: cancelButtonText,
  };
};

export const useResetMetadataConfirmModalMessage = () => {
  const {
    title,
    message,
    confirmButtonText,
    cancelButtonText,
  } = confirmModalMessageMapper.resetDetail;

  return {
    resetMetadataConfirmModalTitle: title,
    resetMetadataConfirmModalMessage: message,
    resetMetadataConfirmModalConfirmButtonText: confirmButtonText,
    resetMetadataConfirmModalCancelButtonText: cancelButtonText,
  };
};

export const useRemoveQuestionConfirmModalMessage = () => {
  const {
    title,
    message,
    confirmButtonText,
    cancelButtonText,
  } = confirmModalMessageMapper.removeQuestion;

  return {
    removeQuestionConfirmModalTitle: title,
    removeQuestionConfirmModalMessage: message,
    removeQuestionConfirmModalConfirmButtonText: confirmButtonText,
    removeQuestionConfirmModalCancelButtonText: cancelButtonText,
  };
};

export const useClosePdfConfirmModalMessage = () => {
  const {
    title,
    message,
    confirmButtonText,
    cancelButtonText,
  } = confirmModalMessageMapper.closePdf;

  return {
    closePdfConfirmModalTitle: title,
    closePdfConfirmModalMessage: message,
    closePdfConfirmModalConfirmButtonText: confirmButtonText,
    closePdfConfirmModalCancelButtonText: cancelButtonText,
  };
};

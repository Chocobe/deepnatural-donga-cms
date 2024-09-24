// react
import {
  useCallback,
} from 'react';
// store
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// hook
import { 
  useRemoveQuestionConfirmModalMessage,
} from './confirmModalMessageHooks';

const useRemoveSubTextbookConfirmModal = () => {
  //
  // mathQuestionToolPage store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // hook
  //
  const {
    removeQuestionConfirmModalTitle,
    removeQuestionConfirmModalMessage,
    removeQuestionConfirmModalConfirmButtonText,
    removeQuestionConfirmModalCancelButtonText,
  } = useRemoveQuestionConfirmModalMessage();

  //
  // callback
  //
  const onOpenRemoveSubTextbookConfirmModal = useCallback((
    onConfirmFunction: () => void
  ) => {
    openNoticeModal({
      title: removeQuestionConfirmModalTitle,
      message: removeQuestionConfirmModalMessage,
      firstButton: {
        text: removeQuestionConfirmModalCancelButtonText,
        variant: 'outline',
      },
      secondButton: {
        text: removeQuestionConfirmModalConfirmButtonText,
        variant: 'default',
        onClick: onConfirmFunction,
      },
    });
  }, [
    removeQuestionConfirmModalTitle,
    removeQuestionConfirmModalMessage,
    removeQuestionConfirmModalCancelButtonText,
    removeQuestionConfirmModalConfirmButtonText,
    openNoticeModal,
  ]);

  return {
    onOpenRemoveSubTextbookConfirmModal,
  };
};

export default useRemoveSubTextbookConfirmModal;

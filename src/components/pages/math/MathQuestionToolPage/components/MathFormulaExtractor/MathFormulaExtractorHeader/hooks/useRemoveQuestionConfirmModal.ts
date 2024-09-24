// react
import {
  useCallback,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// hook
import { 
  useRemoveQuestionConfirmModalMessage,
} from './confirmModalMessageHooks';

const useRemoveQuestionConfirmModal = () => {
  //
  // mathQuestionToolPage store
  //
  const removeQuestionSet_action = useMathQuestionToolPageStore(state => state.ui.action.removeQuestionSet_action);

  //
  // resultNoticeModal store
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
  const onOpenRemoveQuestionConfirmModal = useCallback((
    targetIndex: number
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
        onClick: () => removeQuestionSet_action(targetIndex),
      },
    });
  }, [
    removeQuestionConfirmModalTitle,
    removeQuestionConfirmModalMessage,
    removeQuestionConfirmModalConfirmButtonText,
    removeQuestionConfirmModalCancelButtonText,
    removeQuestionSet_action,
    openNoticeModal,
  ]);

  return {
    onOpenRemoveQuestionConfirmModal,
  };
};

export default useRemoveQuestionConfirmModal;

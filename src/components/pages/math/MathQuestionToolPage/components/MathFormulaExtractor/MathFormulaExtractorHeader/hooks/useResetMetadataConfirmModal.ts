// react
import {
  useCallback,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// hook
import { 
  useResetMetadataConfirmModalMessage,
} from './confirmModalMessageHooks';

const useResetMetadataConfirmModal = () => {
  //
  // mathQuestionToolPage store
  //
  const clearMetadataItem_action = useMathQuestionToolPageStore(state => state.ui.action.clearMetadataItem_action);

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);

  //
  // hook
  //
  const {
    resetMetadataConfirmModalTitle,
    resetMetadataConfirmModalMessage,
    resetMetadataConfirmModalConfirmButtonText,
    resetMetadataConfirmModalCancelButtonText,
  } = useResetMetadataConfirmModalMessage();

  const openResetMetadataConfirmModal = useCallback((id: string) => {
    openNoticeModal({
      title: resetMetadataConfirmModalTitle,
      message: resetMetadataConfirmModalMessage,
      firstButton: {
        text: resetMetadataConfirmModalCancelButtonText,
        variant: 'outline',
      },
      secondButton: {
        text: resetMetadataConfirmModalConfirmButtonText,
        variant: 'default',
        onClick: () => clearMetadataItem_action(id),
      },
    });
  }, [
    resetMetadataConfirmModalTitle,
    resetMetadataConfirmModalMessage,
    resetMetadataConfirmModalCancelButtonText,
    resetMetadataConfirmModalConfirmButtonText,
    clearMetadataItem_action,
    openNoticeModal,
  ]);

  return {
    openResetMetadataConfirmModal,
  };
};

export default useResetMetadataConfirmModal;

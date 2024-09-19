// react
import {
  useState,
  useCallback,
} from 'react';
// hook
import { 
  useClosePdfConfirmModalMessage,
} from './confirmModalMessageHooks';

const useClosePdfConfirmModal = () => {
  //
  // state
  //
  const [isOpenClosePdfConfirmModal, setIsOpenClosePdfConfirmModal] = useState(false);

  //
  // callback
  //
  const onOpenClosePdfConfirmModal = useCallback(() => {
    setIsOpenClosePdfConfirmModal(true);
  }, []);

  const onCancelClosePdfConfirmModal = useCallback(() => {
    setIsOpenClosePdfConfirmModal(false);
  }, []);

  const {
    closePdfConfirmModalTitle,
    closePdfConfirmModalMessage,
    closePdfConfirmModalConfirmButtonText,
    closePdfConfirmModalCancelButtonText,
  } = useClosePdfConfirmModalMessage();

  return {
    closePdfConfirmModalTitle,
    closePdfConfirmModalMessage,
    closePdfConfirmModalConfirmButtonText,
    closePdfConfirmModalCancelButtonText,

    isOpenClosePdfConfirmModal,
    onOpenClosePdfConfirmModal,
    onCancelClosePdfConfirmModal,
  };
};

export default useClosePdfConfirmModal;

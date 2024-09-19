// hook
import useOnClickExit from '../../hooks/useOnClickExit';
import { 
  useExitConfirmModalMessage,
} from './confirmModalMessageHooks';

const useExitConfirmModal = () => {
  // hook
  const onClickExit = useOnClickExit();

  const {
    exitConfirmModalTitle,
    exitConfirmModalMessage,
    exitConfirmModalConfirmButtonText,
    exitConfirmModalCancelButtonText,
  } = useExitConfirmModalMessage();

  return {
    exitConfirmModalTitle,
    exitConfirmModalMessage,
    exitConfirmModalConfirmButtonText,
    exitConfirmModalCancelButtonText,

    onConfirmExitConfirmModal: onClickExit,
  };
};

export default useExitConfirmModal;

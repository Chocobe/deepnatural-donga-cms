// hook
import useOnClickSubmit from '../../hooks/useOnClickSubmit';
import { 
  useSubmitConfirmModalMessage,
} from './confirmModalMessageHooks';

const useSubmitConfirmModal = () => {
  // hook
  const onClickSubmit = useOnClickSubmit();

  const {
    submitConfirmModalTitle,
    submitConfirmModalMessage,
    submitConfirmModalConfirmButtonText,
    submitConfirmModalCancelButtonText,
  } = useSubmitConfirmModalMessage();

  return {
    submitConfirmModalTitle,
    submitConfirmModalMessage,
    submitConfirmModalConfirmButtonText,
    submitConfirmModalCancelButtonText,

    onConfirmSubmitConfirmModal: onClickSubmit,
  };
};

export default useSubmitConfirmModal;

// react
import {
  useCallback,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';

const useMathQuestionToolErrorModal = () => {
  //
  // mathQuestionToolPage store
  //
  const closeErrorModal_action = useMathQuestionToolPageStore(state => state.ui.action.closeErrorModal_action);
  const openErrorModal_action = useMathQuestionToolPageStore(state => state.ui.action.openErrorModal_action);

  //
  // callback
  //
  const openErrorModal = useCallback((params: {
    buttonActionType: 'close' | 'exit';
    message: string;
  }) => {
    const {
      buttonActionType,
      message,
    } = params;

    openErrorModal_action({
      buttonActionType,
      message,
    });
  }, [openErrorModal_action]);

  const closeErrorModal = useCallback(() => {
    closeErrorModal_action();
  }, [closeErrorModal_action]);

  return {
    openErrorModal,
    closeErrorModal,
  };
};

export default useMathQuestionToolErrorModal;

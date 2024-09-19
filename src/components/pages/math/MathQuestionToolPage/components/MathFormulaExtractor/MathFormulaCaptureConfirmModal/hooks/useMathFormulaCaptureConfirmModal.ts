// react
import {
  useCallback,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// util
import { 
  readClipboard_util,
} from '../../../../utils/fileUtils';

const useMathFormulaCaptureConfirmModal = () => {
  //
  // mathQuestionToolPage store
  //
  const openMathFormulaCaptureModal_action = useMathQuestionToolPageStore(state => state.ui.action.openMathFormulaCaptureModal_action);
  const setMathFormulaCaptureState_action = useMathQuestionToolPageStore(state => state.ui.action.setMathFormulaCaptureState_action);

  //
  // callback
  //
  const onClickMathFormulaCapture = useCallback(async () => {
    openMathFormulaCaptureModal_action();

    const { 
      url,
    } = await readClipboard_util() ?? {};

    if (!url) {
      return;
    }

    setMathFormulaCaptureState_action({
      isOpenConfirmModal: true,
      imageObjUrl: url,
    });
  }, [
    openMathFormulaCaptureModal_action,
    setMathFormulaCaptureState_action,
  ]);

  return {
    onClickMathFormulaCapture,
  };
};

export default useMathFormulaCaptureConfirmModal;

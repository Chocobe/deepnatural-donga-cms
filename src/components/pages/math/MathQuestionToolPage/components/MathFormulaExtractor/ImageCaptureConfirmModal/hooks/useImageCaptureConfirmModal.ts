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

const useImageCaptureConfirmModal = () => {
  //
  // mathQuestionToolPage store
  //
  const setImageCaptureState_action = useMathQuestionToolPageStore(state => state.ui.action.setImageCaptureState_action);

  //
  // callback
  //
  const onClickImageCapture = useCallback(async () => {
    const { url } = await readClipboard_util() ?? {};

    if (!url) {
      return;
    }

    setImageCaptureState_action({
      isOpenConfirmModal: true,
      imageObjUrl: url,
    });
  }, [setImageCaptureState_action]);

  return {
    onClickImageCapture,
  };
};

export default useImageCaptureConfirmModal;

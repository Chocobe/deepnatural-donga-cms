// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
// FIXME: API 연동 후, 적용하기
// import useIntegratedUploadFileApi from '../../../network/hooks/useIntegratedUploadFileApi';
// Ui
import ScreenCaptureConfirmModal from '../../ui/ScreenCaptureConfirmModal/ScreenCaptureConfirmModal';
// util
import { 
  createImgOuterHTML,
} from '../../../utils/domCreateUtils';
// api
// FIXME: API 연동 후, 적용하기
// import ApiManager from '@/network/ApiManager';
import apiFeedbackMessageFactory from '../../../network/apiFeedbackMessageFactory';

function _ImageCaptureConfirmModal() {
  //
  // mathQuestionToolPage store
  //
  const imageCaptureState = useMathQuestionToolPageStore(state => state.ui.state.imageCaptureState);
  const {
    isOpenConfirmModal,
    imageObjUrl,
  } = imageCaptureState;

  const targetElementState = useMathQuestionToolPageStore(state => state.ui.state.targetElementState);
  const resultState = useMathQuestionToolPageStore(state => state.ui.state.result);

  const closeImageConfirmModal_action = useMathQuestionToolPageStore(state => state.ui.action.closeImageConfirmModal_action);
  const resetApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.resetApiLoadingUiState_action);
  const resetImageCaptureState_action = useMathQuestionToolPageStore(state => state.ui.action.resetImageCaptureState_action);
  const setApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.setApiLoadingUiState_action);
  const setQuestionSetsValue_action = useMathQuestionToolPageStore(state => state.ui.action.setQuestionSetsValue_action);

  //
  // hook
  //
  // FIXME: API 연동 후, 적용하기
  // const { 
  //   uploadFile,
  // } = useIntegratedUploadFileApi();

  //
  // callback
  //
  const onClose = useCallback(() => {
    if (imageObjUrl) {
      URL.revokeObjectURL(imageObjUrl);
    }

    closeImageConfirmModal_action();
  }, [imageObjUrl, closeImageConfirmModal_action]);

  const onClickCancel = useCallback(() => {
    closeImageConfirmModal_action();
  }, [closeImageConfirmModal_action]);

  const onClickRegister = useCallback(async () => {
    if (!imageObjUrl) {
      return;
    }

    try {
      setApiLoadingUiState_action({
        isLoading: true,
        message: apiFeedbackMessageFactory.mathEditor.produceMathMLFromLatexRequest(),
      });

      const {
        indexOfResult,
        id,
        cursorIndex,
      } = targetElementState;

      if (
        typeof indexOfResult === 'undefined' ||
                typeof cursorIndex === 'undefined' ||
                !id
      ) {
        return;
      }

      // FIXME: API 연동하기
      // // 1. 이미지 업로드
      // const uploadedFileData = await uploadFile('', imageObjUrl);

      // if (!uploadedFileData) {
      //   console.log('파일 업로드 실패');
      //   return;
      // }

      // const {
      //   fileUrl,
      // } = uploadedFileData;

      // // 2. `<a />` tag outerHTML 생성
      const anchorTagOuterHTML = createImgOuterHTML({
        // FIXME: API 연동하기
        // src: fileUrl,
        src: '#',
        alt: '이미지 설명',
      });

      // 3. `2번 결과` 를 기존 LaTeX 에 insert
      let latex = resultState.questionSets[indexOfResult][id] as string ?? '';
      latex = latex.substring(0, cursorIndex) +
        anchorTagOuterHTML +
        latex.substring(cursorIndex);

      // 4. LaTeX => MathML 변환
      // const response = await ApiManager.produceMathMLFromLatex({
      //     latex,
      // });

      // const mathML = response?.data?.mathml;

      setQuestionSetsValue_action({
        indexOfResult,
        id,
        value: latex,
      });
    } catch(error) {
      console.group('onFailure - onClickRegister()');
      console.log('error: ', error);
      console.groupEnd();
    } finally {
      URL.revokeObjectURL(imageObjUrl);

      resetApiLoadingUiState_action();
      resetImageCaptureState_action();
    }
  }, [
    imageObjUrl, 
    targetElementState, 
    resultState,
    // FIXME: API 연동하기
    // uploadFile, 
    setApiLoadingUiState_action,
    setQuestionSetsValue_action,
    resetApiLoadingUiState_action,
    resetImageCaptureState_action,
  ]);

  return (
    <ScreenCaptureConfirmModal 
      isOpen={isOpenConfirmModal}
      imgSrc={imageObjUrl}
      onClose={onClose} 
      onClickCancel={onClickCancel}
      onClickRegister={onClickRegister} />
  );
}

const ImageCaptureConfirmModal = memo(_ImageCaptureConfirmModal);
export default ImageCaptureConfirmModal;

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
// FIXME: API 연동 후, 적용하기
// import useMathPixOCRApi from '../../../network/hooks/useMathPixOCRApi';
// api
// FIXME: API 연동 후, 적용하기
// import ApiManager from '@/network/ApiManager';
import apiFeedbackMessageFactory from '../../../network/apiFeedbackMessageFactory';
// ui
import ScreenCaptureConfirmModal from '../../ui/ScreenCaptureConfirmModal/ScreenCaptureConfirmModal';

function _MathFormulaCaptureConfirmModal() {
  //
  // mathQuestionToolPage store
  //
  const mathFormulaCaptureState = useMathQuestionToolPageStore(state => state.ui.state.mathFormulaCaptureState);
  const {
    isOpenConfirmModal,
    imageObjUrl,
  } = mathFormulaCaptureState;

  const targetElementState = useMathQuestionToolPageStore(state => state.ui.state.targetElementState);
  const resultState = useMathQuestionToolPageStore(state => state.ui.state.result);

  const closeMathFormulaConfirmModal_action = useMathQuestionToolPageStore(state => state.ui.action.closeMathFormulaConfirmModal_action);
  const resetApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.resetApiLoadingUiState_action);
  const resetMathFormulaCaptureState_action = useMathQuestionToolPageStore(state => state.ui.action.resetMathFormulaCaptureState_action);
  const setApiLoadingUiState_action = useMathQuestionToolPageStore(state => state.ui.action.setApiLoadingUiState_action);
  const setQuestionSetsValue_action = useMathQuestionToolPageStore(state => state.ui.action.setQuestionSetsValue_action);

  //
  // hook
  //
  // FIXME: API 연동 후, 적용하기
  // const { 
  //   uploadFile,
  // } = useIntegratedUploadFileApi();
  // const { produceMathPixOCR } = useMathPixOCRApi();

  //
  // callback
  //
  const onClose = useCallback(() => {
    if (imageObjUrl) {
      URL.revokeObjectURL(imageObjUrl);
    }

    closeMathFormulaConfirmModal_action();
  }, [imageObjUrl, closeMathFormulaConfirmModal_action]);

  const onClickCancel = useCallback(() => {
    closeMathFormulaConfirmModal_action();
  }, [closeMathFormulaConfirmModal_action]);

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
      //   throw new Error('파일 업로드 실패');
      // }

      // const {
      //   fileUrl,
      // } = uploadedFileData;

      // FIXME: API 연동하기
      // 2. Image => LaTeX 변환
      // const responseOfMathPixOCR = await produceMathPixOCR(fileUrl);
      // const data = responseOfMathPixOCR?.data;
      const data = {
        text: 'mockup - MathFormulaCaptureConfirmModal.tsx',
      };

      // 3. `2번 결과` 를 기존 LaTeX 에 insert
      let latex = resultState.questionSets[indexOfResult][id] as string ?? '';
      latex = latex.substring(0, cursorIndex) +
        data.text +
        latex.substring(cursorIndex);

      // 4. LaTeX => MathML 변환 (미사용 주석 처리 로직)
      // const response = await ApiManager.produceMathMLFromLatex({
      //     latex,
      // });
      // const mathML = response?.data.mathml;

      setQuestionSetsValue_action({
        indexOfResult,
        id,
        value: latex,
      });
    } catch(error) {
      console.group('onError - onClickRegister()');
      console.log('error: ', error);
      console.groupEnd();
    } finally {
      URL.revokeObjectURL(imageObjUrl);

      resetApiLoadingUiState_action();
      resetMathFormulaCaptureState_action();
    }
  }, [
    imageObjUrl, 
    targetElementState, 
    resultState,
    // FIXME: API 연동하기
    // uploadFile, 
    // produceMathPixOCR, 
    setApiLoadingUiState_action,
    setQuestionSetsValue_action,
    resetApiLoadingUiState_action,
    resetMathFormulaCaptureState_action,
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

const MathFormulaCaptureConfirmModal = memo(_MathFormulaCaptureConfirmModal);
export default MathFormulaCaptureConfirmModal;

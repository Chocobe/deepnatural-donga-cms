// react
import {
  useRef,
  useState,
  useCallback, 
  memo,
  ChangeEvent, 
} from 'react';
// store
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
// ui
import PdfSelector from './PdfSelector';
import MathQuestionToolScreenCaptureButton from './MathQuestionToolScreenCaptureButton';
import MathFormulaCaptureConfirmModal from '../MathFormulaCaptureConfirmModal/MathFormulaCaptureConfirmModal';
import ImageCaptureConfirmModal from '../ImageCaptureConfirmModal/ImageCaptureConfirmModal';
// hook
import useMathFormulaCaptureConfirmModal from '../MathFormulaCaptureConfirmModal/hooks/useMathFormulaCaptureConfirmModal';
import useImageCaptureConfirmModal from '../ImageCaptureConfirmModal/hooks/useImageCaptureConfirmModal';
import { 
  useClosePdfConfirmModalMessage,
} from '../MathFormulaExtractorHeader/hooks/confirmModalMessageHooks';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import {
  FiCamera,
} from 'react-icons/fi';
import {
  AiOutlineFunction,
} from 'react-icons/ai';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionToolViewerSection.css';

type TMathQuestionToolViewerSectionProps = {
    className: string;
};

function _MathQuestionToolViewerSection(props: TMathQuestionToolViewerSectionProps) {
  const {
    className,
  } = props;

  //
  // resultNoticeModal store
  //
  const openNoticeModal = useResultNoticeModalStore(state => state.openSuccessNoticeModal);
  const closeNoticeModal = useResultNoticeModalStore(state => state.closeResultNoticeModal);

  //
  // ref
  //
  const $inputFilesRef = useRef<HTMLInputElement | null>(null);

  //
  // state
  //
  const [indexOfPdfFile, setIndexOfPdfFile] = useState(0);
  const [pdfDataList, setPdfDataList] = useState<Array<{
        filename: string;
        url: string;
    }>>([]);

  //
  // hook
  //
  const {
    onClickMathFormulaCapture,
  } = useMathFormulaCaptureConfirmModal();

  const {
    onClickImageCapture,
  } = useImageCaptureConfirmModal();

  const {
    closePdfConfirmModalTitle,
    closePdfConfirmModalMessage,
    closePdfConfirmModalConfirmButtonText,
    closePdfConfirmModalCancelButtonText,
  } = useClosePdfConfirmModalMessage();

  //
  // callback
  //
  const onChangeIndexOfPdfFile = useCallback((index: number) => {
    setIndexOfPdfFile(index);
  }, []);

  const onSelectPdfFileList = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files ?? [])];

    const pdfDataList = files.map(file => {
      const filename = file.name;
      const url = URL.createObjectURL(file);

      return {
        filename,
        url,
      }; 
    });

    setPdfDataList(prev => {
      const nextIndexOfPdfFile = prev.length;

      setIndexOfPdfFile(nextIndexOfPdfFile);

      return [
        ...prev,
        ...pdfDataList,
      ];
    });
  }, []);

  const onOpenInputFiles = useCallback(() => {
    $inputFilesRef.current?.click();
  }, []);

  const closePdf = useCallback(() => {
    setPdfDataList(pdfDataList => {
      const hasSinglePdfFile = pdfDataList.length === 1;

      return pdfDataList.filter((pdfData, index) => {
        const {
          url,
        } = pdfData;

        const isTargetIndex = index === indexOfPdfFile;

        if (hasSinglePdfFile) {
          setIndexOfPdfFile(0);
          URL.revokeObjectURL(url);

          return false;
        }

        if (isTargetIndex) {
          const isLastIndex = index === (pdfDataList.length - 1);
          URL.revokeObjectURL(url);

          if (isLastIndex) {
            setIndexOfPdfFile(index - 1);
          }

          return false;
        }

        return true;
      });
    });
  }, [indexOfPdfFile]);

  const confirmClosePdfConfirmModal = useCallback(() => {
    closePdf();
    closeNoticeModal();
  }, [closePdf, closeNoticeModal]);

  const openClosePdfConfirmModal = useCallback(() => {
    openNoticeModal({
      title: closePdfConfirmModalTitle,
      message: closePdfConfirmModalMessage,
      firstButton: {
        text: closePdfConfirmModalCancelButtonText,
        variant: 'outline',
        onClick: closeNoticeModal,
      },
      secondButton: {
        text: closePdfConfirmModalConfirmButtonText,
        variant: 'default',
        onClick: confirmClosePdfConfirmModal,
      },
    });
  }, [
    closePdfConfirmModalTitle,
    closePdfConfirmModalMessage,
    closePdfConfirmModalCancelButtonText,
    closePdfConfirmModalConfirmButtonText,
    openNoticeModal,
    closeNoticeModal,
    confirmClosePdfConfirmModal,
  ]);

  return (<>
    <div className={cn(
      'MathQuestionToolViewerSection',
      className
    )}>
      <div className="actionsWrapper">
        <div className="leftActions">
          {pdfDataList.length > 0 && (
            <PdfSelector
              value={indexOfPdfFile}
              pdfFileNameList={pdfDataList.map(({ filename }) => filename)}
              onChange={onChangeIndexOfPdfFile} />
          )}
        </div>

        <div className="rightActions">
          <input
            ref={$inputFilesRef}
            className="inputFiles"
            multiple
            type="file"
            value=""
            accept=".pdf"
            onChange={onSelectPdfFileList} />

          <Button
            className="fileButton"
            variant="ghost"
            onClick={onOpenInputFiles}>
              문서 추가하기(PDF)
          </Button>

          <Button
            className="closePdfFileButton"
            variant="ghost"
            onClick={openClosePdfConfirmModal}>
              현재 문서 닫기
          </Button>
        </div>
      </div>

      <div 
        className="viewerWrapper">
        {!pdfDataList?.length && (
          <div className="pdfEmptyMessageWrapper">
            <div className="message">
              작업할 문서를 추가합니다.
            </div>

            <Button
              className="fileButton"
              variant="ghost"
              onClick={onOpenInputFiles}>
                문서 추가하기(PDF)
            </Button>
          </div>
        )}

        {pdfDataList?.map((pdfData, index) => {
          const {
            filename,
            url,
          } = pdfData;

          return (
            <object 
              key={`${url}-${filename}`}
              className={cn(
                'viewer', 
                { isShow: indexOfPdfFile === index })
              }
              data={`${url}#view=FitH`}
              type='application/pdf' 
              width='100%' 
              height='100%' />
          );
        })}

        {pdfDataList.length && (
          <div className="screenCaptureWrapper">
            <div className="pdfActionsWrapper">
              <MathQuestionToolScreenCaptureButton
                onScreenCapture={onClickMathFormulaCapture}>
                <AiOutlineFunction
                  size="24px"
                  color="#fff" />
              </MathQuestionToolScreenCaptureButton>

              <MathQuestionToolScreenCaptureButton
                onScreenCapture={onClickImageCapture}>
                <FiCamera
                  size="24"
                  color="#fff" />
              </MathQuestionToolScreenCaptureButton>
            </div>
          </div>
        )}
      </div>
    </div>

    <MathFormulaCaptureConfirmModal />

    <ImageCaptureConfirmModal />
  </>);
}

const MathQuestionToolViewerSection = memo(_MathQuestionToolViewerSection);
export default MathQuestionToolViewerSection;

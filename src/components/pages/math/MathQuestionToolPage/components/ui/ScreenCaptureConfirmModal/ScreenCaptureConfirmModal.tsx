// react
import {
  useState,
  useCallback,
  useEffect,
  memo,
} from 'react';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/ui/dialog';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icons
import {
  FiX,
  FiCheck,
} from 'react-icons/fi';
import './ScreenCaptureConfirmModal.css';

type TScreenCaptureConfirmModalProps = {
    isOpen: boolean;
    imgSrc?: string;
    onClose: () => void;
    onClickCancel: () => void;
    onClickRegister: () => void;
};

function _ScreenCaptureConfirmModal(props: TScreenCaptureConfirmModalProps) {
  const {
    isOpen,
    imgSrc,
    // onClose,
    onClickCancel,
    onClickRegister,
  } = props;

  //
  // state
  //
  const [stateForDisplay, setStateForDisplay] = useState<{
    imgSrc?: string;
  }>({
    imgSrc,
  });

  //
  // callback
  //
  const onAnimationEnd = useCallback(() => {
    if (isOpen) {
      return;
    }

    setStateForDisplay({
      imgSrc: undefined,
    });
  }, [isOpen]);

  //
  // effect
  //
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setStateForDisplay({
      imgSrc,
    });

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Dialog open={isOpen}>
      <DialogTrigger hidden />

      <DialogContent 
        className="ScreenCaptureConfirmModal"
        hideCloseButton
        onAnimationEndCapture={onAnimationEnd}>
        <DialogHeader hidden className="hidden">
          <DialogTitle hidden />
          <DialogDescription hidden />
        </DialogHeader>

        <div className="ScreenCaptureConfirmModal-content">
          <div className="modalBody">
            <div className="inner">
              <img 
                className="capturedImage"
                src={stateForDisplay.imgSrc}
                alt="캡처한 이미지가 없습니다."
                width="100%"
                height="auto" />

              <div className="actionsWrapper">
                <Button
                  className="actionButton"
                  onClick={onClickCancel}>
                  <FiX 
                    size="20px"
                    color="#fff" />
                      취소
                </Button>

                <Button
                  className="actionButton"
                  onClick={onClickRegister}>
                  <FiCheck
                    size="20px"
                    color="#fff" />
                      등록
                </Button>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter hidden className="hidden" />
      </DialogContent>
    </Dialog>
  );
}

const ScreenCaptureConfirmModal = memo(_ScreenCaptureConfirmModal);
export default ScreenCaptureConfirmModal;

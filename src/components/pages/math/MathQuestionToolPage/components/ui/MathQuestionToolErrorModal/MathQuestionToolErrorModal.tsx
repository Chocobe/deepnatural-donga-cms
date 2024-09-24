// react
import {
  useState,
  useCallback,
  useEffect,
  memo,
} from 'react';
// store
import useMathQuestionToolPageStore from '@/store/mathStores/mathQuestionToolPageStore/mathQuestionToolPageStore';
// hook
import useOnClickExit from '../../MathFormulaExtractor/hooks/useOnClickExit';
// ui
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/shadcn-ui/ui/dialog';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './MathQuestionToolErrorModal.css';

function _MathQuestionToolErrorModal() {

  //
  // mathQuestionToolPage store
  //
  const errorModalUiState = useMathQuestionToolPageStore(state => state.ui.state.errorModalUiState);
  const {
    isOpen,
    buttonActionType,
    message,
  } = errorModalUiState;

  const closeErrorModal_action = useMathQuestionToolPageStore(state => state.ui.action.closeErrorModal_action);

  //
  // state
  //
  const [stateForDisplay, setStateForDisplay] = useState<{
    message?: string;
    buttonActionType: typeof buttonActionType,
  }>({
    message,
    buttonActionType,
  });

  //
  // hook
  //
  const onClickExitButton = useOnClickExit();

  // 
  // callback
  //
  const onAnimationEnd = useCallback(() => {
    if (isOpen) {
      return;
    }

    setStateForDisplay({
      message: undefined,
      buttonActionType: undefined,
    });
  }, [
    isOpen,
  ]);

  const onClickConfirmButton = useCallback(() => {
    switch (stateForDisplay.buttonActionType) {
      case 'close':
        closeErrorModal_action();
        break;
      case 'exit':
      default:
        onClickExitButton();
        break;
    }
  }, [
    stateForDisplay.buttonActionType, 
    closeErrorModal_action,
    onClickExitButton,
  ]);

  const renderButtonText = useCallback(() => {
    switch(stateForDisplay.buttonActionType) {
      case 'close':
        return '확인';
      case 'exit':
      default:
        return '나가기';
    }
  }, [stateForDisplay.buttonActionType]);

  //
  // effect
  //
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setStateForDisplay({
      message,
      buttonActionType,
    });

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <Dialog
      open={isOpen}>
      <DialogTrigger hidden />

      <DialogContent 
        className={cn(
          'p-10 shadow-md gap-6 rounded-md max-w-[448px]',
        )}
        hideCloseButton
        onAnimationEndCapture={onAnimationEnd}>
        <DialogHeader hidden className="hidden">
          <DialogTitle hidden />
          <DialogDescription hidden />
        </DialogHeader>

        <div className="MathQuestionToolErrorModal-content">
          <div className="iconWrapper">
            🙏
          </div>

          <div 
            className="message"
            dangerouslySetInnerHTML={{ __html: stateForDisplay.message ?? '' }} />
        </div>

        <DialogFooter>
          <div className="MathQuestionToolErrorModal-footer">
            <Button
              className="confirmButton"
              variant="default"
              onClick={onClickConfirmButton}>
              {renderButtonText()}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const MathQuestionToolErrorModal = memo(_MathQuestionToolErrorModal);
export default MathQuestionToolErrorModal;

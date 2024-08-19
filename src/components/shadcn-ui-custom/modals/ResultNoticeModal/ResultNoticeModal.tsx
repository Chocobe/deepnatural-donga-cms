// react
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
} from 'react';
// store
import useResultNoticeModalStore from '@/store/resultNoticeModalStore/resultNoticeModalStore';
// ui
import SimpleNoticeModal from '../SimpleNoticeModal/SimpleNoticeModal';
import { 
  Button,
  ButtonProps,
} from '@/components/shadcn-ui/ui/button';
// type
import { 
  TSimpleNoticeModalVariant,
} from '../SimpleNoticeModal/SimpleNoticeModal.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './ResultNoticeModal.css';

function ResultNoticeModal() {
  //
  // resultNoticeModal store
  //
  const resultNoticeModalState = useResultNoticeModalStore(state => state);
  const {
    isOpen,
    title,
    message,
    variant,
    firstButton,
    secondButton,
    closeResultNoticeModal,
  } = resultNoticeModalState;

  //
  // state
  //
  const [stateForDisplay, setStateForDisplay] = useState<{
    title?: string;
    message?: string;
    variant?: TSimpleNoticeModalVariant;
    firstButtonText?: string;
    firstButtonVariant?: ButtonProps['variant'];
    secondButtonText?: string;
    secondButtonVariant?: ButtonProps['variant'];
  }>({
    title,
    message,
    variant,
    firstButtonText: firstButton?.text,
    firstButtonVariant: firstButton?.variant,
    secondButtonText: secondButton?.text,
    secondButtonVariant: secondButton?.variant,
  });

  //
  // cache
  //
  const isShowFirstButton = useMemo(() => {
    return !!stateForDisplay.firstButtonText;
  }, [stateForDisplay.firstButtonText]);

  const isShowSecondButton = useMemo(() => {
    return !!stateForDisplay.secondButtonText;
  }, [stateForDisplay.secondButtonText]);

  //
  // callback
  //
  const onAnimationEnd = useCallback(() => {
    if (isOpen) {
      return;
    }

    setStateForDisplay({
      title: undefined,
      message: undefined,
      firstButtonText: undefined,
      secondButtonText: undefined,
    });
  }, [isOpen]);

  const onClickFirstButton = useCallback(() => {
    closeResultNoticeModal();
    firstButton?.onClick?.();
  }, [firstButton, closeResultNoticeModal]);

  const onClickSecondButton = useCallback(() => {
    closeResultNoticeModal();
    secondButton?.onClick?.();
  }, [secondButton, closeResultNoticeModal]);

  //
  // effect
  //
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setStateForDisplay({
      title,
      message,
      variant,
      firstButtonText: resultNoticeModalState.firstButton?.text,
      firstButtonVariant: resultNoticeModalState.firstButton?.variant,
      secondButtonText: resultNoticeModalState.secondButton?.text,
      secondButtonVariant: resultNoticeModalState.secondButton?.variant,
    });

    // eslint-disable-next-line
  }, [isOpen]);

  return (
    <SimpleNoticeModal 
      isOpen={isOpen}
      setIsOpen={closeResultNoticeModal}
      onAnimationEnd={onAnimationEnd}
      className="ResultNoticeModal"
      title={stateForDisplay.title}
      message={stateForDisplay.message}
      variant={stateForDisplay.variant}
      $footer={<>
        {isShowFirstButton && (
          <Button
            className={cn(
              'ResultNoticeModal-button',
              stateForDisplay?.firstButtonVariant
            )}
            variant={stateForDisplay?.firstButtonVariant}
            onClick={onClickFirstButton}>
            {stateForDisplay.firstButtonText}
          </Button>
        )}

        {isShowSecondButton && (
          <Button
            className={cn(
              'ResultNoticeModal-button',
              stateForDisplay?.secondButtonVariant
            )}
            variant={stateForDisplay.secondButtonVariant}
            onClick={onClickSecondButton}>
            {stateForDisplay.secondButtonText}
          </Button>
        )}
      </>} />
  );
}

export default ResultNoticeModal;

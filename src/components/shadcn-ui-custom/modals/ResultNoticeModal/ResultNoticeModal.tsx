// react
import {
  useMemo,
} from 'react';
// ui
import SimpleNoticeModal, { 
  TSimpleNoticeModalProps,
} from '../SimpleNoticeModal/SimpleNoticeModal';
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

type TResultNoticeModalProps = Required<Pick<
  TSimpleNoticeModalProps, 
  'title' | 'description' | 'isOpen' | 'setIsOpen'
>> & {
  variant?: TSimpleNoticeModalVariant;
  firstButtonText?: string;
  firstButtonVariant?: ButtonProps['variant'];
  onClickFirstButton?: () => void;

  secondButtonText?: string;
  secondButtonVariant?: ButtonProps['variant'];
  onClickSecondButton?: () => void;
};

function ResultNoticeModal(props: TResultNoticeModalProps) {
  const {
    firstButtonText,
    firstButtonVariant,
    onClickFirstButton,

    secondButtonText,
    secondButtonVariant,
    onClickSecondButton,
    ..._props
  } = props;

  const isShowFirstButton = useMemo(() => {
    return !!(firstButtonText && onClickFirstButton);
  }, [firstButtonText, onClickFirstButton]);

  const isShowSecondButton = useMemo(() => {
    return !!(secondButtonText && onClickSecondButton);
  }, [secondButtonText, onClickSecondButton]);

  return (
    <SimpleNoticeModal 
      {..._props}
      className="ResultNoticeModal"
      $footer={<>
        {isShowFirstButton && (
          <Button
            className={cn(
              'ResultNoticeModal-button',
              firstButtonVariant
            )}
            variant={firstButtonVariant}
            onClick={onClickFirstButton}>
            {firstButtonText}
          </Button>
        )}

        {isShowSecondButton && (
          <Button
            className={cn(
              'ResultNoticeModal-button',
              secondButtonVariant
            )}
            variant={secondButtonVariant}
            onClick={onClickSecondButton}>
            {secondButtonText}
          </Button>
        )}
      </>} />
  );
}

export default ResultNoticeModal;

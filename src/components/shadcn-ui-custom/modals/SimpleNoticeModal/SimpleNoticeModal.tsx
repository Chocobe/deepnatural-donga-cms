// react
import {
  AnimationEvent,
  ReactNode,
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
// type
import { 
  simpleNoticeModalVariantMapper,
  TSimpleNoticeModalVariant,
} from './SimpleNoticeModal.type';
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './SimpleNoticeModal.css';

export type TSimpleNoticeModalProps = {
  className?: string;
  title?: string;
  message?: string;
  variant?: TSimpleNoticeModalVariant;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onAnimationEnd?: (e: AnimationEvent<HTMLDivElement>) => void;
  $footer?: ReactNode;
};

export function SimpleNoticeModal(props: TSimpleNoticeModalProps) {
  const {
    className,
    title,
    message,
    variant = simpleNoticeModalVariantMapper.SUCCESS,
    isOpen,
    setIsOpen,
    onAnimationEnd,
    $footer,
  } = props;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger hidden />

      <DialogContent 
        className={cn(
          'SimpleNoticeModal',
          className
        )}
        hideCloseButton
        onAnimationEndCapture={onAnimationEnd}>
        <DialogHeader className="SimpleNoticeModal-header">
          <DialogTitle className={cn(
            'title',
            variant
          )}> 
            {title}
          </DialogTitle>

          <DialogDescription className="message">
            {message}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="SimpleNoticeModal-footer">
          {$footer}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default SimpleNoticeModal;

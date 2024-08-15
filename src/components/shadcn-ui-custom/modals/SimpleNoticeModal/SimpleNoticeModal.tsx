// react
import {
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
  description?: string;
  variant?: TSimpleNoticeModalVariant;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  $footer?: ReactNode;
};

export function SimpleNoticeModal(props: TSimpleNoticeModalProps) {
  const {
    className,
    title,
    description,
    variant = simpleNoticeModalVariantMapper.SUCCESS,
    isOpen,
    setIsOpen,
    $footer,
  } = props;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger hidden />

      <DialogContent className={cn(
        'SimpleNoticeModal',
        className
      )}>
        <DialogHeader className="SimpleNoticeModal-header">
          <DialogTitle className={cn(
            'title',
            variant
          )}> 
            {title}
          </DialogTitle>

          <DialogDescription className="description">
            {description}
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

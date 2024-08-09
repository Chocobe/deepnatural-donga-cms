// react
import {
  useCallback,
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
// style
import './ResultNoticeModal.css';

type TResultNoticeModalProps = {
  title: string;
  description: string;
  confirmButtonText?: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onConfirm?: () => void;
};

export function ResultNoticeModal(props: TResultNoticeModalProps) {
  const {
    title,
    description,
    confirmButtonText = '확인',
    isOpen,
    setIsOpen,
    onConfirm,
  } = props;

  //
  // callback
  //
  const onClose = useCallback(() => {
    onConfirm?.();
    setIsOpen(false);
  }, [setIsOpen, onConfirm]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger hidden />

      <DialogContent className="ResultNoticeModal">
        <DialogHeader className="ResultNoticeModal-header">
          <DialogTitle className="title"> 
            {title}
          </DialogTitle>

          <DialogDescription className="description">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="ResultNoticeModal-footer">
          <Button 
            className="button"
            onClick={onClose}>
            {confirmButtonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ResultNoticeModal;

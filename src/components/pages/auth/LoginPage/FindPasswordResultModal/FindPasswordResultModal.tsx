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
import './FindPasswordResultModal.css';

type TFindPasswordResultModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function FindPasswordResultModal(props: TFindPasswordResultModalProps) {
  const {
    isOpen,
    setIsOpen,
  } = props;

  //
  // callback
  //
  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger hidden />

      <DialogContent className="FindPasswordResultModal">
        <DialogHeader className="FindPasswordResultModal-header">
          <DialogTitle className="title"> 
            비밀번호 찾기
          </DialogTitle>

          <DialogDescription className="description">
            등록된 이메일로 임시발급된 비밀번호를 보내드렸습니다.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="FindPasswordResultModal-footer">
          <Button 
            className="button"
            onClick={onClose}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FindPasswordResultModal;

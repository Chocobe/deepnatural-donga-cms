// react
import {
  useState,
  useCallback,
} from 'react';
// ui
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/shadcn-ui/ui/dialog';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// style
import './GenerateTempPasswordModal.css';

function GenerateTempPasswordModal() {
  //
  // state
  //
  const [open, setOpen] = useState(false);

  //
  // callback
  //
  const onClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClickCopy = useCallback(() => {
    console.log('onClickCopy()');
    setOpen(false);
  }, []);

  return (
    <Dialog
      open={open}>
      <DialogClose />
      <DialogTrigger asChild>
        <Button
          className="GenerateTempPasswordModalTrigger"
          onClick={onClickOpen}>
          임시 비번 발급
        </Button>
      </DialogTrigger>

      <DialogContent 
        className="GenerateTempPasswordModal"
        hideCloseButton>
        <DialogHeader className="GenerateTempPasswordModal-header">
          <DialogTitle className="title">
            임시 비밀번호가 발급되었습니다.
          </DialogTitle>

          <DialogDescription className="description">
            임시 비밀번호는 1회만 사용가능 합니다.
          </DialogDescription>
        </DialogHeader>

        <Button
          className="copyButton"
          variant="outline"
          onClick={onClickCopy}>
          복사하기
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateTempPasswordModal;

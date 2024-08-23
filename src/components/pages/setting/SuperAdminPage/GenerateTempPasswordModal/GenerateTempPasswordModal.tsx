// react
import {
  useRef,
  useState,
  useCallback,
  useEffect,
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
import ApiManager from '@/apis/ApiManager';

type TGenerateTempPasswordModalProps = {
  onChangePassword: (password: string) => void;
};

function GenerateTempPasswordModal(props: TGenerateTempPasswordModalProps) {
  const {
    onChangePassword,
  } = props;

  //
  // ref
  //
  const tempPasswordRef = useRef<string | null>(null);

  //
  // state
  //
  const [open, setOpen] = useState(false);

  //
  // callback
  //
  const generateTempPassword = useCallback(async () => {
    const response = await ApiManager
      .auth
      .randomPasswordApi
      .callWithNoticeMessageGroup();

    const tempPassword = response?.data?.password;

    if (tempPassword) {
      tempPasswordRef.current = tempPassword;
    }

    setOpen(true);
  }, []);

  const onClickCopy = useCallback(async () => {
    const tempPassword = tempPasswordRef.current;

    if (tempPassword) {
      await window.navigator.clipboard.writeText(tempPassword);
      onChangePassword(tempPassword);
    }

    setOpen(false);
  }, [onChangePassword]);

  //
  // effect
  //
  useEffect(function cleanup() {
    if (open) {
      return () => {
        tempPasswordRef.current = null;
      };
    }
  }, [open]);

  return (
    <Dialog open={open}>
      <DialogClose />
      <DialogTrigger asChild>
        <Button
          className="GenerateTempPasswordModalTrigger"
          onClick={generateTempPassword}>
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

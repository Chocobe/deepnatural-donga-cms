// react
import {
  useState,
  useCallback,
  ChangeEvent,
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
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import { 
  Label,
} from '@/components/shadcn-ui/ui/label';
// style
import './FindPasswordModal.css';

type TFindPasswordModalProps = {
  onSubmit: () => void | Promise<any>;
};

export function FindPasswordModal(props: TFindPasswordModalProps) {
  const {
    onSubmit,
  } = props;

  //
  // state
  //
  const [open, setOpen] = useState(false);
  const [id, setId] = useState('');

  //
  // callback
  //
  const onClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const onClickClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setId(value);
  }, []);

  const onClickSubmit = useCallback(() => {
    onSubmit();
    setOpen(false);
  }, [onSubmit]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          className="p-0 h-fit text-indigo-500 text-[14px] font-normal"
          onClick={onClickOpen}
          variant="link">
          비밀번호 찾기
        </Button>
      </DialogTrigger>

      <DialogContent className="FindPasswordModal">
        <DialogHeader className="FindPasswordModal-header">
          <DialogTitle className="title"> 
            비밀번호 찾기
          </DialogTitle>

          <DialogDescription className="description">
            등록된 이메일로 임시발급된 비밀번호를 보내드립니다.
          </DialogDescription>
        </DialogHeader>

        <div className="FindPasswordModal-body">
          <Label 
            htmlFor="id"
            className="label">
            아이디
            <span className="required">
              *
            </span>
          </Label>

          <Input
            id="id"
            className="input"
            value={id}
            onChange={onChange} />
        </div>

        <DialogFooter className="FindPasswordModal-footer">
          <Button 
            className="button cancel"
            variant="outline"
            onClick={onClickClose}>
            취소
          </Button>

          <Button 
            className="button submit"
            onClick={onClickSubmit}>
            확인
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default FindPasswordModal;

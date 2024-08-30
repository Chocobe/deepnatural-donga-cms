// react
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
// store
import useResultNoticeModalStore from '@/store/modalStores/resultNoticeModalStore/resultNoticeModalStore';
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
import './ChangePasswordModal.css';

function ChangePasswordModal() {
  //
  // resultNoticeModal store
  //
  const {
    openSuccessNoticeModal,
    closeResultNoticeModal,
  } = useResultNoticeModalStore();

  //
  // state
  //
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState({
    password: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  //
  // cache
  //
  const inputItems = useMemo(() => [
    {
      id: 'password',
      label: '이전 비밀번호',
      type: 'password',
      placeholder: '이전 비밀번호를 입력해주세요.',
    },
    {
      id: 'newPassword',
      label: '새로운 비밀번호',
      type: 'password',
      placeholder: '새로운 비밀번호를 입력해주세요.',
    },
    {
      id: 'confirmNewPassword',
      label: '새로운 비밀번호 확인',
      type: 'password',
      placeholder: '새로운 비밀번호를 한번 더 입력해주세요.',
    },
  ], []);

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
    const {
      id,
      value,
    } = e.target;

    setFormState(formState => ({
      ...formState,
      [id]: value,
    }));
  }, []);

  const onClickSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    console.group('onClickSubmit()');
    console.log('formState: ', formState);
    console.groupEnd();

    setOpen(false);

    // FIXME: ApiManager 의 callWithNoticeMessageGroup() 으로 사용하기
    // FIXME: 적용 후, 지우기
    openSuccessNoticeModal({
      title: '비밀번호 변경 완료',
      message: '새로운 비밀번호로 변경이 완료되었습니다.',
      firstButton: {
        text: '확인',
        variant: 'default',
        onClick: closeResultNoticeModal,
      },
    });
  }, [formState, openSuccessNoticeModal, closeResultNoticeModal]);

  //
  // effect
  //
  useEffect(function cleanup() {
    return () => {
      if (open) {
        setFormState({
          password: '',
          newPassword: '',
          confirmNewPassword: '',
        });
      }
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="ChangePasswordModalTrigger"
          // FIXME: 비밀번호 변경 API 기능 추가되면, 지우기
          disabled
          onClick={onClickOpen}>
          비밀번호 변경
        </Button>
      </DialogTrigger>

      <DialogContent className="ChangePasswordModal">
        <DialogHeader className="ChangePasswordModal-header">
          <DialogTitle className="title">
            비밀번호 변경하기
          </DialogTitle>

          <DialogDescription className="description">
            설정된 비밀번호를 변경 합니다.
          </DialogDescription>
        </DialogHeader>

        <form 
          className="ChangePasswordModal-form"
          onSubmit={onClickSubmit}>
          {inputItems.map(item => {
            const {
              id,
              label,
              type,
              placeholder,
            } = item;

            return (
              <div 
                key={id}
                className="inputWrapper">
                <Label
                  htmlFor={id}
                  className="label">
                  {label}
                  <span className="required">
                    *
                  </span>
                </Label>

                <Input
                  id={id}
                  className="input"
                  autoComplete="off"
                  type={type}
                  placeholder={placeholder}
                  value={formState[id]}
                  onChange={onChange} />
              </div>
            );
          })}

          <DialogFooter className="ChangePasswordModal-form-footer">
            <Button
              className="button cancel"
              variant="outline"
              onClick={onClickClose}>
              취소
            </Button>

            <Button
              className="button submit"
              variant="default"
              type="submit">
              확인
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordModal;

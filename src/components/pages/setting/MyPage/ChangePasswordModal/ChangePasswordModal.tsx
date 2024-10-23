// react
import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  ChangeEvent,
  FormEvent,
} from 'react';
// api
import ApiManager from '@/apis/ApiManager';
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
// type
import { 
  TPatchChangePasswordApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './ChangePasswordModal.css';

function ChangePasswordModal() {
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

  const onClickSubmit = useCallback(async (e: FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      password,
      newPassword,
      confirmNewPassword,
    } = formState;

    const params: TPatchChangePasswordApiRequestParams = {
      payload: {
        old_password: password,
        new_password: newPassword,
        new_password2: confirmNewPassword,
      },
    };

    const response = await ApiManager
      .auth
      .changePasswordApi
      .callWithNoticeMessageGroup(params);

    if (!response?.data) {
      return;
    }

    setOpen(false);
  }, [formState]);

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

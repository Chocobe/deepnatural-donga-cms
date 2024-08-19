// react
import {
  useState,
  useMemo,
  useCallback,
  FormEvent,
  ChangeEvent,
  useEffect,
} from 'react';
// ui
import UserRoleSelect from '../UserRoleSelect/UserRoleSelect';
import GenerateTempPasswordModal from '../GenerateTempPasswordModal/GenerateTempPasswordModal';
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
// icon
import { 
  LuUserPlus,
} from 'react-icons/lu';
// type
import { 
  TGroupModel,
} from '@/apis/models/authModel.type';
// style
import './AddUserModal.css';

function AddUserModal() {
  //
  // state
  //
  const [open, setOpen] = useState(false);
  const [formState, setFormState] = useState<{
    username: string;
    password: string;
    email: string;
    phone: string;
    groups: TGroupModel[];
  }>({
    username: '',
    password: '',
    email: '',
    phone: '',
    groups: [],
  });

  //
  // cache
  //
  const inputItems = useMemo(() => [
    {
      id: 'username',
      label: '이름 (아이디)',
      type: 'text',
      placeholder: '이름을 입력해주세요.',
      required: true,
      disabled: false,
      ActionButton: undefined,
    },
    {
      id: 'password',
      label: '임시 비밀번호',
      type: 'password',
      placeholder: '새로운 비밀번호를 한번 더 입력해주세요.',
      required: true,
      disabled: true,
      ActionButton: () => (
        <GenerateTempPasswordModal />
      ),
    },
    {
      id: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일을 입력해주세요.',
      required: true,
      disabled: false,
      ActionButton: undefined,
    },
    {
      id: 'phone',
      label: '휴대전화',
      type: 'tel',
      placeholder: '전화번호를 입력해주세요.',
      required: false,
      disabled: false,
      ActionButton: undefined,
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

  const onChangeRole = useCallback((groups: TGroupModel[]) => {
    setFormState(formState => ({
      ...formState,
      groups,
    }));
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
  }, [formState]);

  //
  // effect
  //
  useEffect(function cleanup() {
    return () => {
      if (open) {
        setFormState({
          username: '',
          password: '',
          email: '',
          phone: '',
          groups: [],
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
          className="AddUserModalTrigger"
          onClick={onClickOpen}>
          <LuUserPlus className="UsersTableActions-rightSide-addUserButton-icon" />
          유저 등록
        </Button>
      </DialogTrigger>

      <DialogContent className="AddUserModal">
        <DialogHeader className="AddUserModal-header">
          <DialogTitle className="title">
            User 등록하기
          </DialogTitle>

          <DialogDescription className="description">
            유저를 등록하고, 권한 설정을 할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <form 
          className="AddUserModal-form"
          onSubmit={onClickSubmit}>
          <div className="formItem">
            <Label
              htmlFor="role"
              className="label">
              권한설정
              <span className="required">
                *
              </span>
            </Label>

            <div className="inputWrapper">
              <UserRoleSelect
                value={formState.groups}
                onChange={onChangeRole}
              />
            </div>
          </div>

          {inputItems.map(item => {
            const {
              id,
              label,
              type,
              placeholder,
              required,
              disabled,
              ActionButton,
            } = item;

            return (
              <div 
                key={id}
                className="formItem">
                <Label
                  htmlFor={id}
                  className="label">
                  {label}
                  {required && (
                    <span className="required">
                      *
                    </span>
                  )}
                </Label>

                <div className="inputWrapper">
                  <Input
                    id={id}
                    className="input"
                    autoComplete="off"
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    value={formState[id]}
                    onChange={onChange} />

                  {ActionButton && (
                    <ActionButton />
                  )}
                </div>
              </div>
            );
          })}

          <DialogFooter className="AddUserModal-form-footer">
            <Button
              className="button cancel"
              variant="outline"
              onClick={onClickClose}>
              Cancel
            </Button>

            <Button
              className="button cancel"
              variant="default"
              type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddUserModal;

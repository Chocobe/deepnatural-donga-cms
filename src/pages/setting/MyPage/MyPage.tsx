// react
import {
  useState,
  useMemo,
  useCallback,
  FC,
  ChangeEvent,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// style
import './MyPage.css';
import useMockStore from '@/store/mockStore/mockStore';
import { Label } from '@/components/shadcn-ui/ui/label';
import { Input } from '@/components/shadcn-ui/ui/input';

function MyPage() {
  //
  // mockStore
  //
  const isSuperAdmin = useMockStore(state => state.isSuperAdmin);

  // const [formState, setFormState] = useState<{
  //   id: 'role' | 'id' | 'email' | 'password' | 'phone',
  //   value: string;
  // }[]>([
  const [formState, setFormState] = useState<{
    role: string;
    id: string;
    email: string;
    password: string;
    phone: string;
  }>({
    role: '편집자 (문항 관리, 수정 가능)',
    id: 'michelle',
    email: 'michelle@bookdonga.com',
    password: 'hello',
    phone: '010-1234-5678',
  });

  //
  // cache
  //
  const description = useMemo(() => {
    return '개인 정보를 수정하고, 권한 설정을 할 수 있습니다.';
  }, []);

  const formItems = useMemo<{
    // id: 'role' | 'id' | 'email' | 'password' | 'phone',
    id: keyof typeof formState;
    type: 'text' | 'email' | 'password' | 'tel';
    label: string;
    placeholder?: string;
    disabled?: boolean;
    isHide?: boolean;
    ActionButton?: FC
  }[]>(() => [
    {
      id: 'role',
      type: 'text',
      label: '권한설정',
      placeholder: undefined,
      disabled: true,
      isHide: isSuperAdmin,
      ActionButton: undefined,
    },
    {
      id: 'id',
      type: 'text',
      label: 'ID',
      placeholder: undefined,
      disabled: !isSuperAdmin,
      ActionButton: undefined,
    },
    {
      id: 'email',
      type: 'email',
      label: '이메일',
      placeholder: '이메일을 입력해 주세요.',
      ActionButton: undefined,
    },
    {
      id: 'password',
      type: 'password',
      label: '비밀번호',
      isHide: isSuperAdmin,
      placeholder: '비밀번호를 입력해 주세요.',
      ActionButton: () => (
        <Button
          className="actionButton"
          variant="default"
          size="sm"
          onClick={() => console.log('비밀 번호 변경')}>
          비밀 번호 변경
        </Button>
      ),
    },
    {
      id: 'phone',
      type: 'tel',
      label: '휴대전화',
      placeholder: '휴대전화 번호를 입력해 주세요.',
      ActionButton: undefined,
    },
  ], [isSuperAdmin]);

  //
  // callback
  //
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    setFormState(state => ({
      ...state,
      [id]: value,
    }));
  }, []);

  return (
    <div className="MyPage">
      <div className="MyPage-header">
        <h2 className="MyPage-header-title">
          My Page {isSuperAdmin && ('(Super Admin)')}
        </h2>

        <div className="MyPage-header-description">
          {description}
        </div>
      </div>

      <div className="MyPage-form">
        {formItems.map(item => {
          const {
            id,
            type,
            label,
            placeholder,
            disabled,
            isHide,
            ActionButton,
          } = item;

          return !isHide && (
            <div 
              key={id}
              className="formItem">
              <Label 
                htmlFor={id}
                className="label">
                {label}
              </Label>

              <div className="inputWrapper">
                <Input
                  id={id}
                  type={type}
                  className="input"
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
      </div>

      <div className="MyPage-footer">
        <Button
          className=""
          variant="outline"
          size="sm"
          onClick={() => console.log('취소')}>
          취소
        </Button>

        <Button
          className=""
          variant="default"
          size="sm"
          onClick={() => console.log('저장하기')}>
          저장하기
        </Button>
      </div>
    </div>
  );
}

export default MyPage;

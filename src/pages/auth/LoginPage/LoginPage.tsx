// react
import {
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';
import { 
  createSuccessApiSliceState,
} from '@/store/apiStateUtils';
// ui
import FindPasswordModal from '@/components/pages/auth/LoginPage/FindPasswordModal/FindPasswordModal';
import ResultNoticeModal from '@/components/shadcn-ui-custom/modals/ResultNoticeModal/ResultNoticeModal';
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// api
import ApiManager from '@/apis/ApiManager';
// type
import { 
  TLoginPayload,
} from '@/apis/auth/auth.type';
// style
import './LoginPage.css';

function LoginPage() {
  //
  // state
  //
  const [formState, setFormState] = useState({
    username: '',
    password: '',
  });

  const [isOpenResultNoticeModal, setIsOpenResultNoticeModal] = useState(false);

  const formTemplates = [
    {
      id: 'username',
      type: 'text',
      label: '아이디',
      value: formState.username,
      placeholder: '아이디를 입력해주세요',
    },
    {
      id: 'password',
      type: 'password',
      label: '비밀번호',
      value: formState.password,
      placeholder: '비밀번호를 입력해주세요',
    },
  ];

  //
  // authApiStore
  //
  const setLoginState = useAuthApiStore(state => state.login.action.setLoginState);

  function  onChange(e: ChangeEvent<HTMLInputElement>) {
    const {
      id,
      value,
    } = e.target;

    setFormState(state => ({
      ...state,
      [id]: value,
    }));
  }

  async function login(e?: FormEvent) {
    e?.preventDefault();

    const payload: TLoginPayload = formState;

    try {
      const response = await ApiManager
        .auth
        .login(payload);

      const data = response.data;

      console.log('login() 성공 - data: ', data);

      setLoginState(createSuccessApiSliceState(data));
    } catch(error) {
      // TODO: Sonar 컴포넌트로 메시지 렌더링하기
      console.error(error);
    }
  }

  //
  // callback
  //
  const findPassword = useCallback(async () => {
    await new Promise(res => setTimeout(res));
    setIsOpenResultNoticeModal(true);
  }, []);

  const closeResultNoticeModal = useCallback(() => {
    setIsOpenResultNoticeModal(false);
  }, []);

  return (
    <div className="LoginPage">
      <div className="form">
        {/* formHeader */}
        <div className="formHeader">
          <figure className="logoWrapper">
            <img
              className="logo"
              src="images/donga-logo.png"
              alt="동아출판"
            />
          </figure>

          <div className="titleWrapper">
            <h1 className="cmsTitle">
              동아출판 CMS
            </h1>
            <h2 className="loginTitle">
              로그인
            </h2>
          </div>
        </div>

        {/* formBody */}
        <form 
          className="formBody"
          onSubmit={login}>
          {formTemplates.map(template => {
            const {
              id,
              type,
              label,
              value,
              placeholder,
            } = template;

            return (
              <div 
                key={id}
                id={id}
                className="formInputWrapper">
                <label
                  className="label"
                  htmlFor={id}>
                  {label}
                </label>

                <Input
                  className="input"
                  id={id}
                  type={type}
                  value={value}
                  placeholder={placeholder}
                  autoComplete="off"
                  onChange={onChange} />
              </div>
            );
          })}

          <Button
            className="loginButton"
            type="submit">
            로그인
          </Button>
        </form>

        {/* formFooter */}
        <div className="formFooter">
          <FindPasswordModal onSubmit={findPassword} />
          <ResultNoticeModal
            title="비밀번호 찾기"
            description="등록된 이메일로 임시발급된 비밀번호를 보내드렸습니다."
            variant="success"
            isOpen={isOpenResultNoticeModal}
            setIsOpen={setIsOpenResultNoticeModal}
            firstButtonText="확인"
            firstButtonVariant="default"
            onClickFirstButton={closeResultNoticeModal} />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

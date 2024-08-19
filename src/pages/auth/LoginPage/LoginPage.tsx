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
} from '@/apis/auth/authApi.type';
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
  // authApi store
  //
  const setLoginState = useAuthApiStore(state => state.login.action.setLoginState);

  //
  // callback
  //
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

    const response = await ApiManager
      .auth
      .loginApi
      .callWithNoticeMessageGroup(payload);

    if (response?.data) {
      setLoginState(createSuccessApiSliceState(response.data));
    }
  }

  const findPassword = useCallback(async () => {
    ApiManager
      .auth
      .findPasswordApi
      .callWithNoticeMessageGroup();
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
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

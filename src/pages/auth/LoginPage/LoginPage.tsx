// react
import {
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
// router
import { 
  NavLink,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useAuthStore from '@/store/authStore/authStore';
import { 
  createSuccessApiState,
} from '@/store/apiStateUtils';
// ui
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
  // authStore
  //
  const setLoginState = useAuthStore(state => state.login.action.setLoginState);

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

      setLoginState(createSuccessApiState(data));
    } catch(error) {
      // TODO: Sonar 컴포넌트로 메시지 렌더링하기
      console.error(error);
    }
  }

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
          <NavLink
            className="findPasswordPageButton"
            to={routePathFactory.auth.getFindPasswordPagePath()}>
            비밀번호 찾기
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

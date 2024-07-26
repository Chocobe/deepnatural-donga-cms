// react
import {
  useState,
  useMemo,
  useCallback,
  ChangeEvent,
} from 'react';
// router
import { 
  NavLink,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// ui
import { 
  Input,
} from '@/components/shadcn-ui/ui/input';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// style
import './LoginPage.css';

function LoginPage() {
  //
  // state
  //
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  //
  // callback
  //
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const {
      id,
      value,
    } = e.target;

    switch(id) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
    }
  }, []);

  const login = useCallback(() => {
    console.group('login()');
    console.log('email: ', email);
    console.log('password: ', password);
    console.groupEnd();
  }, [email, password]);

  //
  // cache
  //
  const formTemplates = useMemo(() => [
    {
      id: 'email',
      label: '아이디',
      value: email,
      placeholder: '아이디를 입력해주세요',
    },
    {
      id: 'password',
      label: '비밀번호',
      value: password,
      placeholder: '비밀번호를 입력해주세요',
    },
  ], [email, password]);

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
        <div className="formBody">
          {formTemplates.map(template => {
            const {
              id,
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
                  value={value}
                  placeholder={placeholder}
                  autoComplete="off"
                  onChange={onChange} />
              </div>
            );
          })}

          <Button
            className="loginButton"
            onClick={login}>
            로그인
          </Button>
        </div>

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

// FIXME: mockup page

// react
import {
  useCallback,
} from 'react';
// router
import { useNavigate, NavLink } from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// ui
import { Button } from '@/components/shadcn-ui/ui/button';
// style
import './FindPasswordPage.css';

function FindPasswordPage() {
  //
  // hook
  //
  const navigate = useNavigate();

  const findPassword = useCallback(() => {
    console.log('findPassword()');

    navigate(routePathFactory.auth.getLoginPagePath());
  }, [navigate]);

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
          <div className="findPassword-mockup">
            TBU
          </div>

          <Button
            className="findPasswordButton"
            onClick={findPassword}>
            비밀번호 찾기
          </Button>
        </div>

        {/* formFooter */}
        <div className="formFooter">
          <NavLink
            className="findPasswordPageButton"
            to={routePathFactory.auth.getLoginPagePath()}>
            로그인
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default FindPasswordPage;

// router
import { Outlet } from 'react-router-dom';
// style
import './AuthLayout.css';

function AuthLayout() {
  return (
    <div className="AuthLayout">
      <figure className="bgWrapper">
        <img
          className="bg"
          src="/images/login-page-bg.jpg"
          alt="동아출판 로그인"
        />
      </figure>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;

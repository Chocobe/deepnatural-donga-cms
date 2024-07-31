// react
import {
  useState,
  useEffect,
  PropsWithChildren,
} from  'react';
// router
import {
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';

type TLoginRedirectMiddlewareProps = PropsWithChildren;

function LoginRedirectMiddleware(props: TLoginRedirectMiddlewareProps) {
  const {
    children,
  } = props;

  //
  // authApiStore
  //
  const loginData = useAuthApiStore(state => state.login.state.data);

  //
  // state
  //
  const [isChecked, setIsChecked] = useState(false);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // effect
  //
  useEffect(function redirectToLoginPage() {
    if (loginData) {
      setIsChecked(true);
      return;
    }

    navigate(routePathFactory
      .auth
      .getLoginPagePath()
    );
  }, [loginData, navigate]);

  return isChecked
    ? children
    : null;
}

export default LoginRedirectMiddleware;

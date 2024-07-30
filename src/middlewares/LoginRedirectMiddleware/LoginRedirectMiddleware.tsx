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
import useAuthStore from '@/store/authStore/authStore';

type TLoginRedirectMiddlewareProps = PropsWithChildren;

function LoginRedirectMiddleware(props: TLoginRedirectMiddlewareProps) {
  const {
    children,
  } = props;

  //
  // authStore
  //
  const loginToken = useAuthStore(state => state.login.state.data);

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
    if (loginToken) {
      setIsChecked(true);
      return;
    }

    navigate(routePathFactory
      .auth
      .getLoginPagePath()
    );
  }, [loginToken, navigate]);

  return isChecked
    ? children
    : null;
}

export default LoginRedirectMiddleware;

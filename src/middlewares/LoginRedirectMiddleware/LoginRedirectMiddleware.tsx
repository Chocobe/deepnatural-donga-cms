// react
import {
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
  // hook
  //
  const navigate = useNavigate();

  //
  // effect
  //
  useEffect(function redirectToLoginPage() {
    if (loginToken) {
      return;
    }

    navigate(routePathFactory
      .auth
      .getLoginPagePath()
    );
  }, [loginToken, navigate]);

  return children;
}

export default LoginRedirectMiddleware;

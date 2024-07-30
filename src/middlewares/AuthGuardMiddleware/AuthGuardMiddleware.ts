// react
import {
  useEffect,
  PropsWithChildren,
} from 'react';
// router
import {
  useNavigate,
} from 'react-router-dom';
import routePathFactory from '@/routes/routePathFactory';
// store
import useAuthStore from '@/store/authStore/authStore';

type TAuthGuardMiddlewareProps = PropsWithChildren<{
  to?: string;
}>;

function AuthGuardMiddleware(props: TAuthGuardMiddlewareProps) {
  const {
    to = routePathFactory.math.getTextbookPath(),
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
  useEffect(function redirectTo() {
    if (!loginToken) {
      return;
    }

    navigate(to);
  }, [loginToken, to, navigate]);

  return children;
}

export default AuthGuardMiddleware;

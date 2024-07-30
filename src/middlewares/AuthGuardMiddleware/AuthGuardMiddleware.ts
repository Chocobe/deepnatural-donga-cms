// react
import {
  useState,
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
  useEffect(function redirectTo() {
    if (!loginToken) {
      setIsChecked(true);
      return;
    }

    navigate(to);
  }, [loginToken, to, navigate]);

  return isChecked
    ? children
    : null;
}

export default AuthGuardMiddleware;

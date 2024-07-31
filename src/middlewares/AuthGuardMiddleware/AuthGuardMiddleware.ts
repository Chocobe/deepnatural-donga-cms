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
import useAuthApiStore from '@/store/authApiStore/authApiStore';

type TAuthGuardMiddlewareProps = PropsWithChildren<{
  to?: string;
}>;

function AuthGuardMiddleware(props: TAuthGuardMiddlewareProps) {
  const {
    to = routePathFactory.math.getTextbookPath(),
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
  useEffect(function redirectTo() {
    if (!loginData) {
      setIsChecked(true);
      return;
    }

    navigate(to);
  }, [loginData, to, navigate]);

  return isChecked
    ? children
    : null;
}

export default AuthGuardMiddleware;

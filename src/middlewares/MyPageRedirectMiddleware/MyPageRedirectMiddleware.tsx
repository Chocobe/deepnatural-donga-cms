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

type TMyPageRedirectMiddlewareProps = PropsWithChildren;

function MyPageRedirectMiddleware(props: TMyPageRedirectMiddlewareProps) {
  const {
    children,
  } = props;

  //
  // auApi store
  //
  const userInfoState = useAuthApiStore(state => state.userInfo.state.data);
  const isSuperUser = userInfoState?.is_superuser;

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
  useEffect(function redirectToMyPage() {
    if (isSuperUser) {
      setIsChecked(true);
      return;
    }

    navigate(routePathFactory
      .setting
      .getMyPagePath()
    );
  }, [isSuperUser, navigate]);

  return isChecked
    ? children
    : null;
}

export default MyPageRedirectMiddleware;

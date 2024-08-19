// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';

const useIsLoggedIn = () => {
  //
  // authApi store
  //
  const loginData = useAuthApiStore(state => state.login.state.data);
  const isSuccess = useAuthApiStore(state => state.login.state.isSuccess);
  const userInfoData = useAuthApiStore(state => state.userInfo.state.data);

  const isLoggedIn = loginData && isSuccess;

  return {
    userInfoData,
    isLoggedIn,
  };
};

export default useIsLoggedIn;

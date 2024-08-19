// store
import useAuthApiStore from '@/store/authApiStore/authApiStore';

const useIsLoggedIn = () => {
  //
  // authApi store
  //
  const loginData = useAuthApiStore(state => state.login.state.data);
  const isSuccess = useAuthApiStore(state => state.login.state.isSuccess);

  const isLoggedIn = loginData && isSuccess;

  return {
    isLoggedIn,
  };
};

export default useIsLoggedIn;

// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// api
import ApiManager from '@/apis/ApiManager';
// type
import { 
  initialAuthStoreState,
  TAuthStore,
} from './authStore.type';

const useAuthStore = create(devtools<TAuthStore>((set, _get) => ({
  login: {
    state: initialAuthStoreState.login.state,
    action: {
      initLoginState: () => {
        const data = ApiManager.localStorage.getToken();

        set(old => ({
          login: {
            ...old.login,
            state: {
              ...initialAuthStoreState.login.state,
              data,
            },
          },
        }), false, 'initLoginState');
      },
      setLoginState: loginState => {
        const {
          data,
          isSuccess,
        } = loginState;

        if (data && isSuccess) {
          ApiManager.localStorage.setToken(data);
        }

        set(old => ({
          login: {
            ...old.login,
            state: loginState,
          },
        }), false, 'setLoginState');
      },
    },
  },
}), {
  name: 'AuthStore',
}));

export default useAuthStore;

// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// utils
import { 
  createIdleApiState,
} from '../apiStateUtils';
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

      login: loginState => {
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
        }), false, 'login');
      },

      logout: () => {
        ApiManager
          .localStorage
          .setToken();

        set(old => ({
          login: {
            ...old.login,
            state: createIdleApiState(),
          },
        }), false, 'logout');
      },
    },
  },
}), {
  name: 'AuthStore',
}));

export default useAuthStore;

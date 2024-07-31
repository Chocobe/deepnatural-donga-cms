// zustand
import { 
  TStateCreatorWithDevtools,
} from '@/store/apiStateUtils.type';
import { 
  TAuthApiStore,
} from '../authApiStore.type';
import { 
  initialLoginApiSliceState,
  TLoginApiSlice,
} from './loginApiSlice.type';
import { 
  createIdleApiSliceState,
  createSuccessApiSliceState,
} from '@/store/apiStateUtils';
// api
import ApiManager from '@/apis/ApiManager';
import { 
  TLoginResponse,
} from '@/apis/auth/auth.type';

const createLoginApiSlice: TStateCreatorWithDevtools<
  TAuthApiStore, 
  TLoginApiSlice
> = (set, _get) => ({
  login: {
    state: initialLoginApiSliceState,
    action: {
      initLoginState: () => {
        const data = ApiManager.localStorage.getToken();
        const newLoginState = data
          ? createSuccessApiSliceState(data)
          : createIdleApiSliceState<TLoginResponse>();

        set(old => ({
          login: {
            ...old.login,
            state: newLoginState,
          },
        }), false, 'initLoginState');
      },

      setLoginState: apiState => {
        const {
          data,
          isSuccess,
        } = apiState;

        if (data && isSuccess) {
          ApiManager.localStorage.setToken(data);
        }

        set(old => ({
          login: {
            ...old.login,
            state: apiState,
          },
        }), false, 'setLoginState');
      },

      removeLoginState: () => {
        ApiManager
          .localStorage
          .setToken();

        set(old => ({
          login: {
            ...old.login,
            state: createIdleApiSliceState(),
          },
        }), false, 'removeLoginState');
      },
    },
  },
});

export default createLoginApiSlice;

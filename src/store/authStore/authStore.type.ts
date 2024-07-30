// util
import { createIdleApiState } from '../apiStateUtils';
// type
import { TApiState } from '../apiStateUtils.type';
import { TLoginResponse } from '@/apis/auth/auth.type';

export type TAuthStoreState = {
  login: {
    state: TApiState<TLoginResponse>;
  };
};

export const initialAuthStoreState: TAuthStoreState = {
  login: {
    state: createIdleApiState(),
  },
};

export type TAuthStoreAction = {
  login: {
    action: {
      initLoginState: () => void;
      setLoginState: (apiState: TApiState<TLoginResponse>) => void;
    },
  },
};

export type TAuthStore = TAuthStoreState & TAuthStoreAction;

// utils
import { 
  createIdleApiSliceState,
} from '../../apiStateUtils';
// type
import { 
  TApiSliceState,
} from '../../apiStateUtils.type';
import { 
  TLoginResponse,
} from '@/apis/auth/auth.type';

//
// state
//
export type TLoginApiSliceState = TApiSliceState<TLoginResponse>;
export const initialLoginApiSliceState: TLoginApiSliceState = createIdleApiSliceState();

//
// action
//
export type TLoginApiSliceAction = {
  initLoginState: () => void;
  setLoginState: (apiState: TApiSliceState<TLoginResponse>) => void;
  removeLoginState: () => void;
}

export type TLoginApiSlice = {
  login: {
    state: TLoginApiSliceState;
    action: TLoginApiSliceAction;
  };
};

// utils
import { 
  createIdleApiSliceState,
} from '../../apiStateUtils';
// type
import { 
  TApiSliceState,
} from '../../apiStateUtils.type';
import { 
  TLoginApiResponse,
} from '@/apis/auth/authApi.type';

//
// state
//
export type TLoginApiSliceState = TApiSliceState<TLoginApiResponse>;
export const initialLoginApiSliceState: TLoginApiSliceState = createIdleApiSliceState();

//
// action
//
export type TLoginApiSliceAction = {
  initLoginState: () => void;
  setLoginState: (apiState: TApiSliceState<TLoginApiResponse>) => void;
  removeLoginState: () => void;
}

export type TLoginApiSlice = {
  login: {
    state: TLoginApiSliceState;
    action: TLoginApiSliceAction;
  };
};

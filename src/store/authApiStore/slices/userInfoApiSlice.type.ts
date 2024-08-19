// utils
import { 
  createIdleApiSliceState,
} from '@/store/apiStateUtils';
// type
import { 
  TApiSliceState,
} from '@/store/apiStateUtils.type';
import { 
  TRetrieveUserInfoApiResponse,
} from '@/apis/auth/authApi.type';

//
// state
//
export type TUserInfoApiSliceState = TApiSliceState<TRetrieveUserInfoApiResponse>;
export const initialUserInfoApiSliceState: TUserInfoApiSliceState = createIdleApiSliceState();

//
// action
//
export type TUserInfoApiSliceAction = {
  clearUserInfoState: () => void;
  setUserInfoState: (userState: TApiSliceState<TRetrieveUserInfoApiResponse>) => void;
};

export type TUserInfoApiSlice = {
  userInfo: {
    state: TUserInfoApiSliceState;
    action: TUserInfoApiSliceAction;
  };
};

// zustand
import { 
  TStateCreatorWithDevtools,
} from '@/store/apiStateUtils.type';
import { 
  TAuthApiStore,
} from '../authApiStore.type';
import { 
  initialUserInfoApiSliceState,
  TUserInfoApiSlice,
} from './userInfoApiSlice.type';
import { 
  createIdleApiSliceState,
} from '@/store/apiStateUtils';

const createUserInfoApiSlice: TStateCreatorWithDevtools<
  TAuthApiStore,
  TUserInfoApiSlice
> = (set, _get) => ({
  userInfo: {
    state: initialUserInfoApiSliceState,
    action: {
      clearUserInfoState: () => {
        set(old => ({
          ...old,
          userInfo: {
            ...old.userInfo,
            state: createIdleApiSliceState(),
          },
        }), false, 'clearUserInfoState');
      },

      setUserInfoState: userInfoState => {
        set(old => ({
          ...old,
          userInfo: {
            ...old.userInfo,
            state: userInfoState,
          },
        }), false, 'setUserInfoState');
      },
    },
  },
});

export default createUserInfoApiSlice;

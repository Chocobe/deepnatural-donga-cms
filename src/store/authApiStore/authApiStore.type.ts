// loginSlice
import { 
  TLoginApiSlice,
} from './slices/loginApiSlice.type';
import { 
  TUserInfoApiSlice,
} from './slices/userInfoApiSlice.type';
import { 
  TGroupsApiSlice,
} from './slices/groupsApiSlice.type';

export type TAuthApiStore = {
  login: TLoginApiSlice['login'];
  userInfo: TUserInfoApiSlice['userInfo'];
  groups: TGroupsApiSlice['groups'];
};

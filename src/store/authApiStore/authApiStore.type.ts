// loginSlice
import { 
  TLoginApiSlice,
} from './slices/loginApiSlice.type';
import { 
  TGroupsApiSlice,
} from './slices/groupsApiSlice.type';

export type TAuthApiStore = {
  login: TLoginApiSlice['login'];
  groups: TGroupsApiSlice['groups'];
};

// loginSlice
import { 
  TLoginApiSlice,
} from './slices/loginApiSlice.type';

export type TAuthApiStore = {
  login: TLoginApiSlice['login'];
};

// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
import { 
  TAuthApiStore,
} from './authApiStore.type';
// slice
import createLoginApiSlice from './slices/loginApiSlice';

const useAuthApiStore = create<TAuthApiStore>()(devtools((...params) => ({
  login: createLoginApiSlice(...params).login,
}), {
  name: 'AuthApi',
}));

export default useAuthApiStore;

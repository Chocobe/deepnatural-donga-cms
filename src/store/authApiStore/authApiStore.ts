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
import createGroupsApiSlice from './slices/groupsApiSlice';

const useAuthApiStore = create<TAuthApiStore>()(devtools((...params) => ({
  login: createLoginApiSlice(...params).login,
  groups: createGroupsApiSlice(...params).groups,
}), {
  name: 'AuthApi',
}));

export default useAuthApiStore;

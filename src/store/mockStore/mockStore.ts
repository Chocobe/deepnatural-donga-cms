// zustand
import {
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialMockStoreState,
  TMockStore,
} from './mockStore.type';

const useMockStore = create(devtools<TMockStore>((set, _get) => ({
  ...initialMockStoreState,

  toggleIsSuperAdmin: () => {
    set(state => ({
      isSuperAdmin: !state.isSuperAdmin,
    }));
  },
}), {
  name: 'MockStore',
}));

export default useMockStore;

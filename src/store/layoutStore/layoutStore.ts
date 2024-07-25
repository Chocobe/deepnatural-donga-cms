// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialLayoutStoreState,
  TLayoutStore,
} from './layoutStore.type';

const useLayoutStore = create(devtools<TLayoutStore>((set, _get) => ({
  ...initialLayoutStoreState,

  resetLayoutStore: () => {
    set(initialLayoutStoreState);
  },

  setIsOpenSideBar: isOpenSideBar => {
    set({ isOpenSideBar });
  },
  toggleIsOpenSideBar: () => {
    set(state => ({
      isOpenSideBar: !state.isOpenSideBar,
    }));
  },
}), {
  name: 'LayoutStore',
}));

export default useLayoutStore;

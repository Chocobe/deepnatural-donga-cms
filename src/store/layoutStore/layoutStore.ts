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
    set(initialLayoutStoreState, false, 'resetLayoutStore');
  },

  setIsOpenSideBar: isOpenSideBar => {
    set({ 
      isOpenSideBar,
    }, false, 'setIsOpenSideBar');
  },
  toggleIsOpenSideBar: () => {
    set(state => ({
      isOpenSideBar: !state.isOpenSideBar,
    }), false, 'toggleIsOpenSideBar');
  },
}), {
  name: 'LayoutStore',
}));

export default useLayoutStore;

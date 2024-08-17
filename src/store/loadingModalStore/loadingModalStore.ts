// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialLoadingModalStoreState,
  TLoadingModalStore,
} from './loadingModalStore.type';

const useLoadingModalStore = create(devtools<TLoadingModalStore>((set, _get) => ({
  ...initialLoadingModalStoreState,

  openLoadingModal: title => {
    set({
      isOpen: true,
      message: title,
    }, false, 'openLoadingModal');
  },

  closeLoadingModal: () => {
    set({
      isOpen: false,
      message: undefined,
    }, false, 'closeLoadingModal');
  },
}), {
  name: 'LoadingModalStore',
}));

export default useLoadingModalStore;


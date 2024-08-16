// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialResultNoticeModalStoreState,
  TResultNoticeModalStore,
} from './resultNoticeModalStore.type';
import { 
  simpleNoticeModalVariantMapper,
} from '@/components/shadcn-ui-custom/modals/SimpleNoticeModal/SimpleNoticeModal.type';

const useResultNoticeModalStore = create(devtools<TResultNoticeModalStore>((set, _get) => ({
  ...initialResultNoticeModalStoreState,

  openSuccessNoticeModal: params => {
    set(state => ({
      ...state,
      ...params,
      isOpen: true,
      variant: simpleNoticeModalVariantMapper.SUCCESS,
    }), false, 'openSuccessNoticeModal');
  },

  openErrorNoticeModal: params => {
    set(state => ({
      ...state,
      ...params,
      isOpen: true,
      variant: simpleNoticeModalVariantMapper.ERROR,
    }), false, 'openErrorNoticeModal');
  },

  closeResultNoticeModal: () => {
    set({
      ...initialResultNoticeModalStoreState,
    }, false, 'closeResultNoticeModal');
  },
}), {
  name: 'ResultNoticeModalStore',
}));

export default useResultNoticeModalStore;

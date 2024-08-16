// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialHistoryModalStoreState,
  THistoryModalStore,
} from './historyModalStore.type';

const useHistoryModalStore = create(devtools<THistoryModalStore>((set, _get) => ({
  ...initialHistoryModalStoreState,

  openHistoryModal: async retrieveHistoryDataList => {
    set({
      isOpen: true,
    }, false, 'openHistoryModal-open');

    const historyDataList = await retrieveHistoryDataList();

    set({
      historyDataList,
    }, false, 'openHistoryModal-historyDataList');
  },

  closeHistoryModal: () => {
    set({
      isOpen: false,
      historyDataList: undefined,
    }, undefined, 'closeHistoryModal');
  },
}), {
  name: 'HistoryModalStore',
}));

export default useHistoryModalStore;

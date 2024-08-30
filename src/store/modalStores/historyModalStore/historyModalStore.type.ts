// type
import { 
  THistoryModalData,
} from '@/components/shadcn-ui-custom/modals/HistoryModal/HistoryModal.type';

export type THistoryModalStoreState = {
  isOpen: boolean;
  historyDataList?: THistoryModalData[];
};

export const initialHistoryModalStoreState: THistoryModalStoreState = {
  isOpen: false,
  historyDataList: undefined,
} as const;

export type THistoryModalStoreAction = {
  openHistoryModal: (retrieveHistoryDataList: () => Promise<THistoryModalData[] | undefined>) => void;
  closeHistoryModal: () => void;
};

export type THistoryModalStore = 
  & THistoryModalStoreState
  & THistoryModalStoreAction;

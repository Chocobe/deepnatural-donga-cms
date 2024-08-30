export type TLoadingModalStoreState = {
  isOpen: boolean,
  message?: string;
};

export const initialLoadingModalStoreState: TLoadingModalStoreState = {
  isOpen: false,
  message: undefined,
} as const;

export type TLoadingModalStoreAction = {
  openLoadingModal: (message: string) => void;
  closeLoadingModal: () => void;
};

export type TLoadingModalStore =
  & TLoadingModalStoreState
  & TLoadingModalStoreAction;

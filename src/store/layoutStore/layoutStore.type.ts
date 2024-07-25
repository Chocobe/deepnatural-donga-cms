export type TLayoutStoreState = {
  isOpenSideBar: boolean;
};

export const initialLayoutStoreState: TLayoutStoreState = {
  isOpenSideBar: true,
};

export type TLayoutStoreAction = {
  resetLayoutStore: () => void;

  setIsOpenSideBar: (isOpenSideBar: boolean) => void;
  toggleIsOpenSideBar: () => void;
};

export type TLayoutStore = TLayoutStoreState & TLayoutStoreAction;

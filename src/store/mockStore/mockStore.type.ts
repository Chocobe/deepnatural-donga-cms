export type TMockStoreState = {
  isSuperAdmin: boolean;
};

export const initialMockStoreState: TMockStoreState = {
  isSuperAdmin: true,
};

export type TMockStoreAction = {
  toggleIsSuperAdmin: () => void;
};

export type TMockStore = TMockStoreState & TMockStoreAction;


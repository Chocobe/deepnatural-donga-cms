// type
import { 
  TRetrieveUsersApiRequestParams,
  TRetrieveUsersApiResponse,
} from '@/apis/auth/authApi.type';
import { 
  TUserModel,
} from '@/apis/models/authModel.type';

export type TSuperAdminPageStoreState = {
  searchParamsForRetrieveUsersApi: TRetrieveUsersApiRequestParams['searchParams'];

  superUser?: TUserModel;
  usersData?: TRetrieveUsersApiResponse;

  /** Table 에서 클릭한 user 데이터 (checkbox 아님) */
  detailTargetUser?: TUserModel;
  /** Table 에서 checkbox 로 선택한 user 목록 데이터 (row click 아님) */
  selectedUsers?: TUserModel[];
};

export const initialSuperAdminPageStoreState: TSuperAdminPageStoreState = {
  searchParamsForRetrieveUsersApi: {
    is_active: undefined,
    page: undefined,
    search: undefined,
  },

  superUser: undefined,
  usersData: undefined,

  detailTargetUser: undefined,
  selectedUsers: undefined,
};

export type TSuperAdminPageStoreAction = {
  clearSuperAdminPageStoreState: () => void;

  clearSearchParamsForRetrieveUsersApi: () => void;
  updateSearchParamsForRetrieveUsersApi: (searchParams: TRetrieveUsersApiRequestParams) => void;

  clearUsersData: () => void;
  setUsersData: (usersData: TRetrieveUsersApiResponse) => void;
  updateUsersData: (
    callback: (oldUsersData: TRetrieveUsersApiResponse) => TRetrieveUsersApiResponse
  ) => void;

  clearDetailTargetUser: () => void;
  setDetailTargetUser: (detailTargetUser: TUserModel | ((detailTargetUser?: TUserModel) => TUserModel | undefined)) => void;

  clearSelectedUsers: () => void;
  setSelectedUsers: (selectedUsers: TUserModel[]) => void;
};

export type TSuperAdminPageStore =
  & TSuperAdminPageStoreState
  & TSuperAdminPageStoreAction;

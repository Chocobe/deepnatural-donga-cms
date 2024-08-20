// type
import { 
  TRetrieveUsersApiSearchParams,
  TRetrieveUsersApiResponse,
} from '@/apis/auth/authApi.type';
import { 
  TUserModel,
} from '@/apis/models/authModel.type';

export type TSuperAdminPageStoreState = {
  pathParamsForRetrieveUsersApi: TRetrieveUsersApiSearchParams;

  superUser?: TUserModel;
  usersData?: TRetrieveUsersApiResponse;

  detailTargetUser?: TUserModel;
  selectedUsers?: TUserModel[];
};

export const initialSuperAdminPageStoreState: TSuperAdminPageStoreState = {
  pathParamsForRetrieveUsersApi: {
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

  updatePathParamsForRetrieveUsersApi: (pathParams: TRetrieveUsersApiSearchParams) => void;

  setUsersData: (usersData: TRetrieveUsersApiResponse) => void;
  updateUsersData: (
    callback: (oldUsersData: TRetrieveUsersApiResponse) => TRetrieveUsersApiResponse
  ) => void;

  clearDetailTargetUser: () => void;
  setDetailTargetUser: (detailTargetUser: TUserModel | ((detailTargetUser?: TUserModel) => TUserModel)) => void;
  setSelectedUsers: (selectedUsers: TUserModel[]) => void;
};

export type TSuperAdminPageStore =
  & TSuperAdminPageStoreState
  & TSuperAdminPageStoreAction;

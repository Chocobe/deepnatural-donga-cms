// zustand
import { 
  create,
} from 'zustand';
import { 
  devtools,
} from 'zustand/middleware';
// type
import { 
  initialSuperAdminPageStoreState,
  TSuperAdminPageStore,
} from './superAdminPageStore.type';
import { 
  TUserModel,
} from '@/apis/models/authModel.type';

const useSuperAdminPageStore = create(devtools<TSuperAdminPageStore>((set, _get) => ({
  ...initialSuperAdminPageStoreState,

  clearSuperAdminPageStoreState: () => {
    set(initialSuperAdminPageStoreState, false, 'clearSuperAdminPageStoreState');
  },

  updatePathParamsForRetrieveUsersApi: pathParams => {
    set(old => ({
      ...old,
      pathParamsForRetrieveusersApi: {
        ...old.pathParamsForRetrieveUsersApi,
        ...pathParams,
      },
    }), false, 'updatePathParamsForRetrieveUsersApi');
  },

  setUsersData: usersData => {
    let superUser: TUserModel;
    const users = usersData.results.filter(user => {
      if (user.is_superuser) {
        superUser = user;
        return false;
      }

      return true;
    });

    set(old => ({
      ...old,
      superUser,
      usersData: {
        ...usersData,
        results: users,
      },
    }), false, 'setUsersData');
  },
  updateUsersData: callback => {
    set(old => ({
      ...old,
      usersData: old?.usersData
        ? callback(old.usersData)
        : old.usersData
    }), false, 'updateUsersData');
  },

  clearDetailTargetUser: () => {
    set(old => ({
      ...old,
      detailTargetUser: undefined,
    }), false, 'clearDetailTargetUser');
  },
  setDetailTargetUser: detailTargetUser => {
    set(old => ({
      ...old,
      detailTargetUser: typeof detailTargetUser === 'function'
        ? detailTargetUser(old.detailTargetUser)
        : detailTargetUser,
    }), false, 'setDetailTargetUser');
  },
  setSelectedUsers: selectedUsers => {
    set(old => ({
      ...old,
      selectedUsers,
    }), false, 'setSelectedUsers');
  },
}), {
  name: 'SuperAdminPageStore',
}));

export default useSuperAdminPageStore;

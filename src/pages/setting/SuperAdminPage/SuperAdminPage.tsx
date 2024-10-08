// react
import { 
  useCallback,
  useEffect,
} from 'react';
// store
import useSuperAdminPageStore from '@/store/settingStores/superAdminPageStore/superAdminPageStore';
// ui
import UsersTableHeader from '@/components/pages/setting/SuperAdminPage/UsersTableHeader/UsersTableHeader';
import UsersTableActions from '@/components/pages/setting/SuperAdminPage/UsersTableActions/UsersTableActions';
import UsersTable from '@/components/pages/setting/SuperAdminPage/UsersTable/UsersTable';
import UsersTableFooter from '@/components/pages/setting/SuperAdminPage/UsersTableFooter/UsersTableFooter';
// api
import ApiManager from '@/apis/ApiManager';
// type
import { 
  TRetrieveUsersApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './SuperAdminPage.css';

function SuperAdminPage() {
  //
  // superAdminPage store
  //
  const searchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.searchParamsForRetrieveUsersApi);

  const setUsersData = useSuperAdminPageStore(state => state.setUsersData);
  const clearUsersData = useSuperAdminPageStore(state => state.clearUsersData);
  const clearSelectedUsers = useSuperAdminPageStore(state => state.clearSelectedUsers);
  const setUsersCount = useSuperAdminPageStore(state => state.setUsersCount);

  //
  // callback
  //
  const retrieveUsers = useCallback(async (
    params: TRetrieveUsersApiRequestParams
  ) => {
    const response = await ApiManager
      .auth
      .retrieveUsersApi
      .callWithNoticeMessageGroup(params, {
        successMessage: {
          isDisabled: true,
        },
      });

    if (response?.data) {
      setUsersData(response.data);
    }
  }, [setUsersData]);

  const retrieveUsersCount = useCallback(async () => {
    const response = await ApiManager
      .auth
      .retrieveUsersCountApi
      .callWithNoticeMessageGroup();

    if (response?.data) {
      setUsersCount(response.data);
    }
  }, [setUsersCount]);

  useEffect(function init() {
    retrieveUsers({
      searchParams: searchParamsForRetrieveUsersApi,
    });
    retrieveUsersCount();

    // eslint-disable-next-line
  }, []);

  useEffect(function cleanup() {
    return () => {
      clearSelectedUsers();
      clearUsersData();
    };
  }, [clearSelectedUsers, clearUsersData]);

  return (
    <div className="SuperAdminPage">
      <div className="SuperAdminPage-filterWrapper">
        <UsersTableHeader retrieveUsers={retrieveUsers} />
      </div>

      <div className="SuperAdminPage-tableActionsWrapper">
        <UsersTableActions retrieveUsers={retrieveUsers} />
      </div>

      <div className="SuperAdminPage-tableWrapper">
        <UsersTable />
      </div>

      <div className="SuperAdminPage-tableFooterWrapper">
        <UsersTableFooter retrieveUsers={retrieveUsers} />
      </div>
    </div>
  );
}

export default SuperAdminPage;

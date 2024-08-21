// react
import { 
  useMemo,
  useCallback,
  useEffect,
} from 'react';
// store
import useSuperAdminPageStore from '@/store/superAdminPageStore/superAdminPageStore';
// ui
import UsersTableHeader from '@/components/pages/setting/SuperAdminPage/UsersTableHeader/UsersTableHeader';
import UsersTableActions from '@/components/pages/setting/SuperAdminPage/UsersTableActions/UsersTableActions';
import UsersTable from '@/components/pages/setting/SuperAdminPage/UsersTable/UsersTable';
import UsersTableFooter from '@/components/pages/setting/SuperAdminPage/UsersTableFooter/UsersTableFooter';
// api
import ApiManager from '@/apis/ApiManager';
// type
import { 
  TRetrieveUsersApiSearchParams,
} from '@/apis/auth/authApi.type';
// style
import './SuperAdminPage.css';

function SuperAdminPage() {
  //
  // superAdminPage store
  //
  const usersData = useSuperAdminPageStore(state => state.usersData);
  const users = usersData?.results;

  const setUsersData = useSuperAdminPageStore(state => state.setUsersData);

  const clearUsersData = useSuperAdminPageStore(state => state.clearUsersData);
  const clearSelectedUsers = useSuperAdminPageStore(state => state.clearSelectedUsers);

  //
  // cache
  //
  const isUsersEmpty = useMemo(() => {
    return !users?.length;
  }, [users]);

  //
  // callback
  //
  const retrieveUsers = useCallback(async () => {
    const pathParams: TRetrieveUsersApiSearchParams = {
      page: 1,
    };

    const response = await ApiManager
      .auth
      .retrieveUsersApi
      .callWithNoticeMessageGroup(pathParams, {
        successMessage: {
          isDisabled: true,
        },
      });

    if (response?.data) {
      setUsersData(response.data);
    }
  }, [setUsersData]);

  useEffect(function init() {
    retrieveUsers();
  }, [retrieveUsers]);

  useEffect(function cleanup() {
    return () => {
      clearSelectedUsers();
      clearUsersData();
    };
  }, [clearSelectedUsers, clearUsersData]);

  return (
    <div className="SuperAdminPage">
      <div className="SuperAdminPage-filterWrapper">
        <UsersTableHeader />
      </div>

      <div className="SuperAdminPage-tableActionsWrapper">
        <UsersTableActions />
      </div>

      {/* FIXME: SuperAdminPageStore 구현하기 */}
      {/* FIXME: <TableBlankMessageCell /> 로 바꾸기 */}
      {isUsersEmpty
        ? (
          <div className="SuperAdminPage-emptyData">
            등록된 유저가 없습니다.
          </div>
        ): (
          <div className="SuperAdminPage-tableWrapper">
            <UsersTable />
          </div>
        )
      }

      {!isUsersEmpty && (
        <div className="SuperAdminPage-tableFooterWrapper">
          <UsersTableFooter />
        </div>
      )}
    </div>
  );
}

export default SuperAdminPage;

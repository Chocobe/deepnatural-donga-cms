// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useSuperAdminPageStore from '@/store/settingStores/superAdminPageStore/superAdminPageStore';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveUsersApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './UsersTableFooter.css';

type TUsersTableFooterProps = {
  retrieveUsers: (params: TRetrieveUsersApiRequestParams) => void;
};

function _UsersTableFooter(props: TUsersTableFooterProps) {
  const {
    retrieveUsers,
  } = props;

  //
  // superAdminPage store
  //
  const usersData = useSuperAdminPageStore(state => state.usersData);
  const {
    current_page = 1,
    last_page = 1,
  } = usersData ?? {};

  const searchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.searchParamsForRetrieveUsersApi);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveUsersApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveUsersApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveUsersApi]);

  const goToFirstPage = useCallback(() => {
    const params = createParams(1);

    retrieveUsers(params);
  }, [createParams, retrieveUsers]);

  const goToPreviousPage = useCallback(() => {
    const previousPage = current_page - 1;
    const params = createParams(previousPage);

    retrieveUsers(params);
  }, [current_page, createParams, retrieveUsers]);

  const goToNextPage = useCallback(() => {
    const nextPage = current_page + 1;
    const params = createParams(nextPage);

    retrieveUsers(params);
  }, [current_page, createParams, retrieveUsers]);

  const goToLastPage = useCallback(() => {
    const params = createParams(last_page);

    retrieveUsers(params);
  }, [last_page, createParams, retrieveUsers]);

  if (!usersData) {
    return null;
  }

  return (
    <div className="UsersTableFooter">
      <TablePagination
        currentPage={usersData.current_page}
        lastPage={usersData.last_page}
        goToFirstPage={goToFirstPage}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        goToLastPage={goToLastPage} />
    </div>
  );
}

const UsersTableFooter = memo(_UsersTableFooter);
export default UsersTableFooter;

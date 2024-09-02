// react
import {
  useRef,
  useCallback,
  useEffect,
  memo,
  ChangeEvent,
} from 'react';
// ui
import AddUserModal from '../AddUserModal/AddUserModal';
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
import {
  InputWithIcon,
} from '@/components/shadcn-ui-custom/InputWithIcon/InputWithIcon';
import TBUTooltip from '@/components/shadcn-ui-custom/TBUTooltip/TBUTooltip';
// store
import useSuperAdminPageStore from '@/store/settingStores/superAdminPageStore/superAdminPageStore';
// hook
import useOnKeyDownEnterOrESC from '@/components/hooks/useOnKeyDownEnterOrESC';
// icon
import { 
  LuSearch,
} from "react-icons/lu";
// type
import { 
  TRetrieveUsersApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './UsersTableActions.css';

type TUsersTableActionsProps = {
  retrieveUsers: (params: TRetrieveUsersApiRequestParams) => Promise<void>;
};

function _UsersTableActions(props: TUsersTableActionsProps) {
  const {
    retrieveUsers,
  } = props;

  //
  // superAdminPage store
  //
  const usersData = useSuperAdminPageStore(state => state.usersData);

  const searchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.searchParamsForRetrieveUsersApi);
  const {
    search = '',
  } = searchParamsForRetrieveUsersApi;
  const updateSearchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.updateSearchParamsForRetrieveUsersApi);

  //
  // ref
  //
  const $searchInputRef = useRef<HTMLInputElement | null>(null);

  //
  // callback
  //
  const onClickRemove = useCallback(() => {
    console.log('onClickRemove()');
  }, []);

  const onEnter = useCallback(() => {
    $searchInputRef.current?.blur();

    const params: TRetrieveUsersApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveUsersApi,
      },
    };

    retrieveUsers(params);
  }, [searchParamsForRetrieveUsersApi, retrieveUsers]);

  const onESC = useCallback(() => {
    updateSearchParamsForRetrieveUsersApi(searchParamsForRetrieveUsersApi => ({
      ...searchParamsForRetrieveUsersApi,
      search: undefined,
    }));
  }, [updateSearchParamsForRetrieveUsersApi]);

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    updateSearchParamsForRetrieveUsersApi(searchParamsForRetrieveUsersApi => ({
      ...searchParamsForRetrieveUsersApi,
      search: value,
    }));
  }, [updateSearchParamsForRetrieveUsersApi]);

  //
  // hook
  //
  const {
    onKeyDown,
  } = useOnKeyDownEnterOrESC(onEnter, onESC);

  //
  // effect
  //
  useEffect(function focusSearchInput() {
    $searchInputRef.current?.focus();
  }, [usersData]);

  return (
    <div className="UsersTableActions">
      <div className="UsersTableActions-leftSide">
        <TBUTooltip>
          <Button
            className="actionButton"
            disabled
            onClick={onClickRemove}>
            삭제
          </Button>
        </TBUTooltip>
      </div>

      <div className="UsersTableActions-rightSide">
        <InputWithIcon 
          ref={$searchInputRef}
          className="UsersTableActions-rightSide-roleSearchInput"
          placeholder="검색어를 입력해주세요"
          autoFocus
          value={search}
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          EndIcon={LuSearch} />

        <AddUserModal />
      </div>
    </div>
  );
}

const UsersTableActions = memo(_UsersTableActions);
export default UsersTableActions;

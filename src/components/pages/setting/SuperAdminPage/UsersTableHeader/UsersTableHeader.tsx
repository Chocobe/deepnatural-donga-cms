// react
import {
  useState,
  useMemo,
  useCallback,
  memo,
} from 'react';
// store
import useSuperAdminPageStore from '@/store/settingStores/superAdminPageStore/superAdminPageStore';
// ui
import { 
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/shadcn-ui/ui/tabs';
// type
import { 
  usersCountTabValueMapper,
} from './UsersTableHeader.type';
import { 
  TRetrieveUsersApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './UsersTableHeader.css';

type TUsersTableHeaderProps = {
  retrieveUsers: (params: TRetrieveUsersApiRequestParams) => void;
};

function _UsersTableHeader(props: TUsersTableHeaderProps) {
  const {
    retrieveUsers,
  } = props;

  //
  // state
  //
  const [tabValue, setTabValue] = useState<string>(usersCountTabValueMapper.ALL);

  //
  // superAdminPage store
  //
  const usersCount = useSuperAdminPageStore(state => state.usersCount);
  const searchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.searchParamsForRetrieveUsersApi);

  const updateSearchParamsForRetrieveUsersApi = useSuperAdminPageStore(state => state.updateSearchParamsForRetrieveUsersApi);

  //
  // cache
  //
  const items = useMemo(() => {
    if (!usersCount) {
      return null;
    }

    return [
      {
        text: `전체 사용자 (${usersCount.user_count})`,
        tabValue: usersCountTabValueMapper.ALL,
      },
      {
        text: `사용중 (${usersCount.active_user_count})`,
        tabValue: usersCountTabValueMapper.ACTIVE,
      },
      {
        text: `사용중지 (${usersCount.inactive_user_count})`,
        tabValue: usersCountTabValueMapper.INACTIVE,
      },
    ];
  }, [usersCount]);

  //
  // callback
  //
  const onChangeTabValue = useCallback((tabValue: string) => {
    setTabValue(tabValue);

    const searchParams = searchParamsForRetrieveUsersApi;

    switch (tabValue) {
      case usersCountTabValueMapper.ALL: {
        searchParams.is_active = undefined;

        break;
      }

      case usersCountTabValueMapper.ACTIVE: {
        searchParams.is_active = true;

        break;
      }

      case usersCountTabValueMapper.INACTIVE: {
        searchParams.is_active = false;

        break;
      }
    }

    updateSearchParamsForRetrieveUsersApi(() => searchParams);
    retrieveUsers({
      searchParams,
    });
  }, [
    searchParamsForRetrieveUsersApi, 
    updateSearchParamsForRetrieveUsersApi, retrieveUsers,
  ]);

  return (
    <div className="UsersTableHeader">
      <Tabs 
        value={tabValue}
        onValueChange={onChangeTabValue}>
        <TabsList className="UsersTableHeader-tabList">
          {items?.map(item => {
            const {
              text,
              tabValue,
            } = item;

            return (
              <TabsTrigger
                key={tabValue}
                value={tabValue}>
                {text}
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>
    </div>
  );
}

const UsersTableHeader = memo(_UsersTableHeader);
export default UsersTableHeader;

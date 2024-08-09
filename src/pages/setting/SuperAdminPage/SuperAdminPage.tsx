// react
import { 
  useState,
  useMemo,
} from 'react';
// ui
import UsersTableHeader from '@/components/pages/setting/SuperAdminPage/UsersTableHeader/UsersTableHeader';
import UsersTableActions from '@/components/pages/setting/SuperAdminPage/UsersTableActions/UsersTableActions';
import UsersTable from '@/components/pages/setting/SuperAdminPage/UsersTable/UsersTable';
import UsersTableFooter from '@/components/pages/setting/SuperAdminPage/UsersTableFooter/UsersTableFooter';
// style
import './SuperAdminPage.css';

// mock
import { 
  mockUsers,
  TMockUser,
} from '@/components/pages/setting/SuperAdminPage/UsersTable/UsersTable.type';

function SuperAdminPage() {
  //
  // state
  //
  const [data, setData] = useState<TMockUser[]>(mockUsers);

  //
  // cache
  //
  const isDataEmpty = useMemo(() => {
    return !data?.length;
  }, [data]);

  return (
    <div className="SuperAdminPage">
      <div className="SuperAdminPage-filterWrapper">
        <UsersTableHeader />
      </div>

      <div className="SuperAdminPage-tableActionsWrapper">
        <UsersTableActions />
      </div>

      {isDataEmpty
        ? (
          <div className="SuperAdminPage-emptyData">
            등록된 유저가 없습니다.
          </div>
        ): (
          <div className="SuperAdminPage-tableWrapper">
            <UsersTable 
              data={data}
              setData={setData} />
          </div>
        )
      }

      {!isDataEmpty && (
        <div className="SuperAdminPage-tableFooterWrapper">
          <UsersTableFooter />
        </div>
      )}
    </div>
  );
}

export default SuperAdminPage;

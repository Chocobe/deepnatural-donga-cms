// ui
import UsersTableHeader from '@/components/pages/setting/SuperAdminPage/UsersTableHeader/UsersTableHeader';
import UsersTableActions from '@/components/pages/setting/SuperAdminPage/UsersTableActions/UsersTableActions';
import UsersTable from '@/components/pages/setting/SuperAdminPage/UsersTable/UsersTable';
import UsersTableFooter from '@/components/pages/setting/SuperAdminPage/UsersTableFooter/UsersTableFooter';
// style
import './SuperAdminPage.css';

function SuperAdminPage() {
  //

  return (
    <div className="SuperAdminPage">
      <div className="SuperAdminPage-filterWrapper">
        <UsersTableHeader />
      </div>

      <div className="SuperAdminPage-tableActionsWrapper">
        <UsersTableActions />
      </div>

      <div className="SuperAdminPage-tableWrapper">
        <UsersTable />
      </div>

      <div className="SuperAdminPage-tableFooterWrapper">
        <UsersTableFooter />
      </div>
    </div>
  );
}

export default SuperAdminPage;

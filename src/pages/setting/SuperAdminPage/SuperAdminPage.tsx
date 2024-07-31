// ui
import UserStatusFilter from '@/components/pages/setting/SuperAdminPage/UserStatusFilter/UserStatusFilter';
import UsersTableActions from '@/components/pages/setting/SuperAdminPage/UsersTableActions/UsersTableActions';
// style
import './SuperAdminPage.css';

function SuperAdminPage() {
  //

  return (
    <div className="SuperAdminPage">
      <div className="SuperAdminPage-filterWrapper">
        <UserStatusFilter />
      </div>

      <div className="SuperAdminPage-tableActionsWrapper">
        <UsersTableActions />
      </div>

      <div className="SuperAdminPage-tableWrapper">
        Table Wrapper
      </div>

      <div className="SuperAdminPage-tableFooterWrapper">
        Table Footer Wrapper
      </div>
    </div>
  );
}

export default SuperAdminPage;

// ui
import UserStatusFilter from '@/components/pages/setting/SuperAdminPage/UserStatusFilter/UserStatusFilter';
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
        Table Actions Wrapper
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

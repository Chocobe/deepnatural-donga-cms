// react
import {
  useEffect,
} from 'react';
// store
import useSuperAdminPageStore from '@/store/settingStores/superAdminPageStore/superAdminPageStore';
// ui
import UserInfoEditHeader from '@/components/pages/setting/UserInfoEditPage/UserInfoEditHeader/UserInfoEditHeader';
import UserInfoEditForm from '@/components/pages/setting/UserInfoEditPage/UserInfoEditForm/UserInfoEditForm';
import UserInfoEditFooter from '@/components/pages/setting/UserInfoEditPage/UserInfoEditFooter/UserInfoEditFooter';
// style
import './UserInfoEditPage.css';

function UserInfoEditPage() {
  //
  // superAdminPage store
  //
  const clearDetailTargetUser = useSuperAdminPageStore(state => state.clearDetailTargetUser);

  //
  // effect
  //
  useEffect(function cleanup() {
    return () => {
      clearDetailTargetUser();
    };
  }, [clearDetailTargetUser]);

  return (
    <div className="UserInfoEditPage">
      <div className="UserInfoEditPage-header">
        <UserInfoEditHeader />
      </div>

      <div className="UserInfoEditPage-form">
        <UserInfoEditForm />
      </div>

      <div className="UserInfoEditPage-footer">
        <UserInfoEditFooter />
      </div>
    </div>
  );
}

export default UserInfoEditPage;

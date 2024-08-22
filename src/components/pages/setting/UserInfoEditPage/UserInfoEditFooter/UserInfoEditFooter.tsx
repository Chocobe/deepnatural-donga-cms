// react
import {
  useCallback,
  memo,
} from 'react';
// router
import routePathFactory from '@/routes/routePathFactory';
import { 
  useNavigate,
} from 'react-router-dom';
// store
import useSuperAdminPageStore from '@/store/superAdminPageStore/superAdminPageStore';
// api
import ApiManager from '@/apis/ApiManager';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// type
import { 
  TPatchUserApiRequestParams,
} from '@/apis/auth/authApi.type';
// style
import './UserInfoEditFooter.css';

function _UserInfoEditFooter() {
  //
  // superAdminPage store
  //
  const detailTargetUser = useSuperAdminPageStore(state => state.detailTargetUser);

  //
  // hook
  //
  const navigate = useNavigate();

  //
  // callback
  //
  const onClickCancel = useCallback(() => {
    navigate(routePathFactory
      .setting
      .getSuperAdminPagePath()
    );
  }, [navigate]);

  const onClickSave = useCallback(async () => {
    if (!detailTargetUser) {
      return;
    }

    const {
      id,
      groups,
      email,
      phone,
    } = detailTargetUser;

    const params: TPatchUserApiRequestParams = {
      pathParams: {
        userId: id,
      },
      payload: {
        groups: groups.map(({ id }) => id),
        email,
        phone: phone ?? '',
      },
    };

    await ApiManager
      .auth
      .patchUserApi
      .callWithNoticeMessageGroup(params);
  }, [detailTargetUser]);

  return (
    <div className="UserInfoEditFooter">
      <Button
        className="UserInfoEditFooter-button cancel"
        variant="outline"
        onClick={onClickCancel}>
        취소
      </Button>

      <Button
        className="UserInfoEditFooter-button save"
        variant="default"
        onClick={onClickSave}>
        저장하기
      </Button>
    </div>
  );
}

const UserInfoEditFooter = memo(_UserInfoEditFooter);
export default UserInfoEditFooter;

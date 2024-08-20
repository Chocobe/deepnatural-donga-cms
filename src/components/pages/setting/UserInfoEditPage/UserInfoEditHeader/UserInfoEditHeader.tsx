// react
import {
  memo,
} from 'react';
// style
import './UserInfoEditHeader.css';

function _UserInfoEditHeader() {
  return (
    <div className="UserInfoEditHeader">
      <h2 className="title">
        개인정보 수정, 권한 설정
      </h2>

      <div className="description">
        개인 정보를 수정하고, 권한 설정을 할 수 있습니다.
      </div>
    </div>
  );
}

const UserInfoEditHeader = memo(_UserInfoEditHeader);
export default UserInfoEditHeader;

// react
import {
  memo,
} from 'react';
// style
import './MathAchievementDetailHeader.css';

function _MathAchievementDetailHeader() {
  return (
    <div className="MathAchievementDetailHeader">
      <div className="MathAchievementDetailHeader-title">
        성취 기준
      </div>

      <div className="MathAchievementDetailHeader-description">
        성취기준을 수정하거나, 추가할 수 있습니다.
      </div>
    </div>
  );
}

const MathAchievementDetailHeader = memo(_MathAchievementDetailHeader);
export default MathAchievementDetailHeader;

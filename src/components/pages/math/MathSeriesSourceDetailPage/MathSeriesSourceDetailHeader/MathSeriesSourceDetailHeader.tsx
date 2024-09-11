// react
import {
  memo,
} from 'react';
// style
import './MathSeriesSourceDetailHeader.css';

function _MathSeriesSourceDetailHeader() {
  return (
    <div className="MathSeriesSourceDetailHeader">
      <div className="MathSeriesSourceDetailHeader-title">
        시리즈-출처
      </div>
      <div className="MathSeriesSourceDetailHeader-description">
        시리즈-출처를 수정하거나, 추가할 수 있습니다.
      </div>
    </div>
  );
}

const MathSeriesSourceDetailHeader = memo(_MathSeriesSourceDetailHeader);
export default MathSeriesSourceDetailHeader;

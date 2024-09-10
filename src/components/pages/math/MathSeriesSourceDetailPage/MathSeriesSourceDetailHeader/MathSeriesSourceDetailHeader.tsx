// react
import {
  memo,
} from 'react';

function _MathSeriesSourceDetailHeader() {
  return (
    <div className="MathSeriesSourceDetailHeader">
      <div className="MathSeriesSourceDetailHeader-title">
        1
      </div>
      <div className="MathSeriesSourceDetailHeader-description">
        1
      </div>
    </div>
  );
}

const MathSeriesSourceDetailHeader = memo(_MathSeriesSourceDetailHeader);
export default MathSeriesSourceDetailHeader;

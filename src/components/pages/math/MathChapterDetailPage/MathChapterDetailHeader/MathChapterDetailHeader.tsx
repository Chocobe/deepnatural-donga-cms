// react
import {
  memo,
} from 'react';
// style
import './MathChapterDetailHeader.css';

function _MathChapterDetailHeader() {
  return (
    <div className="MathChapterDetailHeader">
      <div className="MathChapterDetailHeader-title">
        교과서 단원
      </div>

      <div className="MathChapterDetailHeader-description">
        교과서 단원을 수정하거나, 추가할 수 있습니다.
      </div>
    </div>
  );
}

const MathChapterDetailHeader = memo(_MathChapterDetailHeader);
export default MathChapterDetailHeader;

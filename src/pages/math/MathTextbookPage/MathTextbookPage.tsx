// ui
import MathTextbookHeader from '@/components/pages/math/MathTextbook/MathTextbookHeader/MathTextbookHeader';
// style
import './MathTextbookPage.css';

// react
import {
  memo,
} from 'react';

function _MathTextbookPage() {
  return (
    <div className="MathTextbookPage">
      <div className="MathTextbookPage-header">
        <MathTextbookHeader />
      </div>

      <div className="MathTextbookPage-actions">
        Actions
      </div>

      <div className="MathTextbookPage-table">
        Table
      </div>

      <div className="MathTextbookPage-footer">
        Footer
      </div>
    </div>
  );
}

const MathTextbookPage = memo(_MathTextbookPage);
export default MathTextbookPage;

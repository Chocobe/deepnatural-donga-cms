// react
import {
  memo,
} from 'react';
// ui
import MathTextbookHeader from '@/components/pages/math/MathTextbook/MathTextbookHeader/MathTextbookHeader';
import MathTextbookTableActions from '@/components/pages/math/MathTextbook/MathTextbookTableActions/MathTextbookTableActions';
import MathTextbookTable from '@/components/pages/math/MathTextbook/MathTextbookTable/MathTextbookTable';
import MathTextbookFooter from '@/components/pages/math/MathTextbook/MathTextbookFooter/MathTextbookFooter';
// style
import './MathTextbookPage.css';

// moick
import { 
  mockMathTextbookData,
} from './MathTextbookPage.type';

function _MathTextbookPage() {
  return (
    <div className="MathTextbookPage">
      <div className="MathTextbookPage-header">
        <MathTextbookHeader />
      </div>

      <div className="MathTextbookPage-actions">
        <MathTextbookTableActions />
      </div>

      <div className="MathTextbookPage-table">
        <MathTextbookTable
          data={mockMathTextbookData} />
      </div>

      <div className="MathTextbookPage-footer">
        <MathTextbookFooter />
      </div>
    </div>
  );
}

const MathTextbookPage = memo(_MathTextbookPage);
export default MathTextbookPage;

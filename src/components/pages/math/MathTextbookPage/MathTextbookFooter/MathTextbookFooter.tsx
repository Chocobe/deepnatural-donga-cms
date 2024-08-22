// react
import {
  memo
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathTextbookFooter.css';

function _MathTextbookFooter() {
  return (
    <div className="MathTextbookFooter">
      <div className="MathTextbookFooter-leftSide">
        Total 100 교과서
      </div>

      <div className="MathTextbookFooter-rightSide">
        <TablePagination
          currentPage="1"
          lastPage="10"
          goToFirstPage={() => console.log('goToFirst()')}
          goToPreviousPage={() => console.log('goToPrevious()')}
          goToNextPage={() => console.log('goToNext()')}
          goToLastPage={() => console.log('goToLast()')} />
      </div>
    </div>
  );
}

const MathTextbookFooter = memo(_MathTextbookFooter);
export default MathTextbookFooter;

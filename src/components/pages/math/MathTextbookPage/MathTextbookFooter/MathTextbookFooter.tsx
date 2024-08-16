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
          rowsPerPage="50"
          onChangeRowsPerPage={() => {/** */}}
          goToFirst={() => console.log('goToFirst()')}
          goToPrevious={() => console.log('goToPrevious()')}
          goToNext={() => console.log('goToNext()')}
          goToLast={() => console.log('goToLast()')} />
      </div>
    </div>
  );
}

const MathTextbookFooter = memo(_MathTextbookFooter);
export default MathTextbookFooter;

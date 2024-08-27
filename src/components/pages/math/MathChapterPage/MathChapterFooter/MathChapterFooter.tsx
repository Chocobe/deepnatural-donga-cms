// react
import {
  memo,
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathChapterFooter.css';

function _MathChapterFooter() {
  return (
    <div className="MathChapterFooter">
      <div className="MathChapterFooter-leftSide">
        Total 100 교과서 소단원
      </div>

      <div className="MathChapterFooter-rightSide">
        <TablePagination
          currentPage={1}
          lastPage={1}
          goToFirstPage={() => console.log('goToFirstPage()')}
          goToPreviousPage={() => console.log('goToPreviousPage()')}
          goToNextPage={() => console.log('goToNextPage()')}
          goToLastPage={() => console.log('goToLastPage()')} />
      </div>
    </div>
  );
}

const MathChapterFooter = memo(_MathChapterFooter);
export default MathChapterFooter;

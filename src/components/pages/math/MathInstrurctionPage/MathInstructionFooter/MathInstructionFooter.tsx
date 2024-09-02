// react
import {
  memo,
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathInstructionFooter.css';

function _MathInstructionFooter() {
  return (
    <div className="MathInstructionFooter">
      <div className="MathInstructionFooter-leftSide">
        Total 1 지문
      </div>

      <div className="MathInstructionFooter-rightSide">
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

const MathInstructionFooter = memo(_MathInstructionFooter);
export default MathInstructionFooter;

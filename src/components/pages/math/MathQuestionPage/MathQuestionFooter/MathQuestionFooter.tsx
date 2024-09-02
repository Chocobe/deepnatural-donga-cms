// react
import {
  memo,
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathQuestionFooter.css';

function _MathQuestionFooter() {
  return (
    <div className="MathQuestionFooter">
      <div className="MathQuestionFooter-leftSide">
        Total 1 문항
      </div>

      <div className="MathQuestionFooter-rightSide">
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

const MathQuestionFooter = memo(_MathQuestionFooter);
export default MathQuestionFooter;

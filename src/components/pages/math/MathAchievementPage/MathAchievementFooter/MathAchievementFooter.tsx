// react
import {
  memo,
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathAchievementFooter.css';

function _MathAchievementFooter() {
  return (
    <div className="MathAchievementFooter">
      <div className="MathAchievementFooter-leftSide">
        Total {1} 성취기준(소)
      </div>

      <div className="MathAchievementFooter-rightSide">
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

const MathAchievementFooter = memo(_MathAchievementFooter);
export default MathAchievementFooter;

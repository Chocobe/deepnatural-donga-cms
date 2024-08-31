// react
import {
  useCallback,
  memo,
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathSeriesSourceFooter.css';

function _MathSeriesSourceFooter() {
  //
  // callback
  //
  const mockOnClick = useCallback((name: string) => {
    console.log(`onClick() - ${name}`);
  }, []);

  return (
    <div className="MathSeriesSourceFooter">
      <div className="MathSeriesSourceFooter-leftSide">
        Total {1} 시리즈-출처
      </div>

      <div className="MathSeriesSourceFooter-rightSide">
        <TablePagination
          currentPage={1}
          lastPage={1}
          goToFirstPage={() => mockOnClick('goToFirst')}
          goToPreviousPage={() => mockOnClick('goToPrevious')}
          goToNextPage={() => mockOnClick('goToNext')}
          goToLastPage={() => mockOnClick('goToLast')} />
      </div>
    </div>
  );
}

const MathSeriesSourceFooter = memo(_MathSeriesSourceFooter);
export default MathSeriesSourceFooter;

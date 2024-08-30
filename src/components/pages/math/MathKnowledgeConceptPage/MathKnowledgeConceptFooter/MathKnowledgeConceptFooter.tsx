// react
import {
  memo,
} from 'react';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// style
import './MathKnowledgeConceptFooter.css';

function _MathKnowledgeConceptFooter() {
  return (
    <div className="MathKnowledgeConceptFooter">
      <div className="MathKnowledgeConceptFooter-leftSide">
        Total 1 성취기준(소)
      </div>

      <div className="MathKnowledgeConceptFooter-rightSide">
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

const MathKnowledgeConceptFooter = memo(_MathKnowledgeConceptFooter);
export default MathKnowledgeConceptFooter;

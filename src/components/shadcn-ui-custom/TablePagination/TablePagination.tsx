// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icon
import { 
  LuChevronLeft,
  LuChevronRight,
} from "react-icons/lu";
// style
import './TablePagination.css';

type TTablePaginationProps = {
  currentPage: number | string;
  lastPage: number | string;
  goToFirstPage: () => void;
  goToNextPage: () => void;
  goToPreviousPage: () => void;
  goToLastPage: () => void;
};

function TablePagination(props: TTablePaginationProps) {
  const {
    currentPage,
    lastPage,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = props;

  return (
    <div className="TablePagination">
      <div className="TablePagination-paginationWrapper">
        <div className="indicator">
          Page {currentPage} of {lastPage}
        </div>

        <div className="pagination">
          <Button
            className="paginationButton goToThreshold goToFirst"
            variant="outline"
            disabled={currentPage === 1}
            onClick={goToFirstPage}>
            <LuChevronLeft className="icon" strokeWidth={2} />
            <LuChevronLeft className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToPrev"
            variant="outline"
            disabled={currentPage === 1}
            onClick={goToPreviousPage}>
            <LuChevronLeft className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToNext"
            variant="outline"
            disabled={currentPage === lastPage}
            onClick={goToNextPage}>
            <LuChevronRight className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToLast"
            variant="outline"
            disabled={currentPage === lastPage}
            onClick={goToLastPage}>
            <LuChevronRight className="icon" strokeWidth={2} />
            <LuChevronRight className="icon" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;

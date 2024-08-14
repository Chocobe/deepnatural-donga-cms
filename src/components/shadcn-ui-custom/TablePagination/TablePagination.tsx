// ui
import { 
  Select, 
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/shadcn-ui/ui/select';
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

const tableRowsPerPageItems = Array.from(
  { length: 4 },
  (_, i) => String((i + 1) * 50)
);

type TTablePaginationProps = {
  currentPage: number | string;
  lastPage: number | string;
  rowsPerPage: number | string;
  onChangeRowsPerPage: (rowsPerPage: number | string) => void;
  goToFirst: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
  goToLast: () => void;
};

function TablePagination(props: TTablePaginationProps) {
  const {
    currentPage,
    lastPage,
    rowsPerPage,
    onChangeRowsPerPage,
    goToFirst,
    goToPrevious,
    goToNext,
    goToLast,
  } = props;

  return (
    <div className="TablePagination">
      <div className="TablePagination-rowsPerPageWrapper">
        <div className="label">
          Rows per page
        </div>

        <Select
          value={String(rowsPerPage)}
          onValueChange={onChangeRowsPerPage}>
          <SelectTrigger className="trigger">
            {rowsPerPage}개씩 보기
          </SelectTrigger>

          <SelectContent>
            {tableRowsPerPageItems.map(value => (
              <SelectItem
                key={value}
                className="item"
                value={value}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="TablePagination-paginationWrapper">
        <div className="indicator">
          Page {currentPage} of {lastPage}
        </div>

        <div className="pagination">
          <Button
            className="paginationButton goToThreshold goToFirst"
            variant="outline"
            onClick={goToFirst}>
            <LuChevronLeft className="icon" strokeWidth={2} />
            <LuChevronLeft className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToPrev"
            variant="outline"
            onClick={goToPrevious}>
            <LuChevronLeft className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToNext"
            variant="outline"
            onClick={goToNext}>
            <LuChevronRight className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToLast"
            variant="outline"
            onClick={goToLast}>
            <LuChevronRight className="icon" strokeWidth={2} />
            <LuChevronRight className="icon" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TablePagination;

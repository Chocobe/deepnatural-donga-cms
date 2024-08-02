// react
import {
  memo,
} from 'react';
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
import './UsersTableFooter.css';

const usersTableRowsPerPageItems = Array.from(
  { length: 4 },
  (_, i) => String((i + 1) * 50)
);

function _UsersTableFooter() {
  return (
    <div className="UsersTableFooter">
      <div className="UsersTableFooter-rowsPerPageWrapper">
        <div className="label">
          Rows per page
        </div>

        <Select>
          <SelectTrigger className="trigger">
            200개씩 보기
          </SelectTrigger>

          <SelectContent>
            {usersTableRowsPerPageItems.map(value => (
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

      <div className="UsersTableFooter-paginationWrapper">
        <div className="indicator">
          Page 1 of 10
        </div>

        <div className="pagination">
          <Button
            className="paginationButton goToThreshold goToFirst"
            variant="outline"
            onClick={() => console.log('처음으로')}>
            <LuChevronLeft className="icon" strokeWidth={2} />
            <LuChevronLeft className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToPrev"
            variant="outline"
            onClick={() => console.log('이전으로')}>
            <LuChevronLeft className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToNext"
            variant="outline"
            onClick={() => console.log('다음으로')}>
            <LuChevronRight className="icon" strokeWidth={2} />
          </Button>

          <Button
            className="paginationButton goToThreshold goToLast"
            variant="outline"
            onClick={() => console.log('마지막으로')}>
            <LuChevronRight className="icon" strokeWidth={2} />
            <LuChevronRight className="icon" strokeWidth={2} />
          </Button>
        </div>
      </div>
    </div>
  );
}

const UsersTableFooter = memo(_UsersTableFooter);
export default UsersTableFooter;

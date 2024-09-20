// react
import {
  useMemo,
  useCallback,
  memo,
} from 'react';
// ui
import { 
  Button,
} from '@/components/shadcn-ui/ui/button';
// icons
import { 
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { 
  AiOutlineEllipsis,
} from "react-icons/ai";
// style
import { 
  cn,
} from '@/lib/shadcn-ui-utils';
import './Pagination.css';
// type
import { 
  TSearchApiPagination,
} from '../../../../network/network.type/searchApi.type';

type TPaginationProps = {
  className?: string;
  pagination?: TSearchApiPagination;
  searchValue: string;

  onSearch: (
    value: string,
    page?: number
  ) => Promise<void>;
};

function _Pagination(props: TPaginationProps) {
  const {
    className,
    pagination,
    searchValue,

    onSearch,
  } = props;

  //
  // cache
  //
  const pageNumData = useMemo(() => {
    if (!pagination) {
      return null;
    }

    const {
      currentPage,
      lastPage,
    } = pagination;

    let start = Math.max(1, currentPage - 4);
    let end = Math.min(lastPage, currentPage + 4);

    end = (end - start) < 9
      ? Math.min(lastPage, start + 8)
      : end;

    start = (end - start) < 9
      ? Math.max(end - 8, 1)
      : start;

    const pageNumList = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i
    );

    return {
      start,
      end,
      pageNumList,
    };
  }, [pagination]);

  //
  // callback
  //
  const onClickPrevPage = useCallback(() => {
    if (!pagination) {
      return;
    }

    const prevPageNum = pagination.currentPage - 1;

    if (prevPageNum < 1) {
      return;
    }

    onSearch(searchValue, prevPageNum);
  }, [pagination, searchValue, onSearch]);

  const onClickNextPage = useCallback(() => {
    if (!pagination) {
      return;
    }

    const nextPageNum = pagination.currentPage + 1;

    if (nextPageNum > pagination.lastPage) {
      return;
    }

    onSearch(searchValue, nextPageNum);
  }, [pagination, searchValue, onSearch]);

  const onClickPageNum = useCallback((pageNum: number) => {
    onSearch(searchValue, pageNum);
  }, [searchValue, onSearch]);

  if (!pagination || !pageNumData) {
    return null;
  }

  const {
    start,
    end,
    pageNumList,
  } = pageNumData;

  return (
    <div className={cn(
      'Pagination',
      className
    )}>
      <Button
        className="pageButton"
        variant="ghost"
        disabled={pagination.currentPage === 1}
        onClick={onClickPrevPage}>
        <FaChevronLeft />
      </Button>

      {start > 1 && (
        <div className="ellipsis">
          <AiOutlineEllipsis />
        </div>
      )}

      {pageNumList.map(pageNum => {
        return (
          <Button
            key={pageNum}
            className={cn(
              'pageButton',
              { currentPage: pageNum === pagination.currentPage }
            )}
            variant="ghost"
            onClick={() => onClickPageNum(pageNum)}>
            {pageNum}
          </Button>
        );
      })}

      {end < pagination.lastPage && (
        <div className="ellipsis">
          <AiOutlineEllipsis />
        </div>
      )}

      <Button
        className="pageButton"
        variant="ghost"
        disabled={pagination.currentPage >= pagination.lastPage}
        onClick={onClickNextPage}>
        <FaChevronRight />
      </Button>
    </div>
  );
}

const Pagination = memo(_Pagination);
export default Pagination;

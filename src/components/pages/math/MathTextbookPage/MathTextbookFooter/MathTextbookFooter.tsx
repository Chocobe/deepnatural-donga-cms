// react
import {
  useCallback,
  memo
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathTextbooksApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathTextbookFooter.css';

type TMathTextbookFooterProps = {
  retrieveMathTextbooks: (params: TRetrieveMathTextbooksApiRequestParams) => Promise<void>;
};

function _MathTextbookFooter(props: TMathTextbookFooterProps) {
  const {
    retrieveMathTextbooks,
  } = props;

  //
  // mathTextbookPage store
  //
  const mathTextbooksData = useMathTextbookPageStore(state => state.mathTextbooksData);
  const searchParamsForRetrieveMathTextbooksApi = useMathTextbookPageStore(state => state.searchParamsForRetrieveMathTextbooksApi);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathTextbooksApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathTextbooksApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathTextbooksApi]);

  //
  // hook
  //
  const {
    count,
    current_page,
    last_page,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  } = useTablePagination({
    paginationData: mathTextbooksData,
    createParams,
    retrieveApiFunction: retrieveMathTextbooks,
  });

  return (
    <div className="MathTextbookFooter">
      <div className="MathTextbookFooter-leftSide">
        Total {count} 교과서
      </div>

      <div className="MathTextbookFooter-rightSide">
        <TablePagination
          currentPage={current_page}
          lastPage={last_page}
          goToFirstPage={goToFirstPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
          goToLastPage={goToLastPage} />
      </div>
    </div>
  );
}

const MathTextbookFooter = memo(_MathTextbookFooter);
export default MathTextbookFooter;

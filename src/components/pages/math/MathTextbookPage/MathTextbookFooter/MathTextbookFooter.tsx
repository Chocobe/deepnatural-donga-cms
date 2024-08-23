// react
import {
  useCallback,
  memo
} from 'react';
// store
import useMathTextbookPageStore from '@/store/mathTextbookPageStore/mathTextbookPageStore';
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
  const {
    current_page = 1,
    last_page = 1,
    count,
  } = mathTextbooksData ?? {};

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

  const goToFirstPage = useCallback(() => {
    const params = createParams(1);

    retrieveMathTextbooks(params);
  }, [createParams, retrieveMathTextbooks]);

  const goToPreviousPage = useCallback(() => {
    const params = createParams(current_page - 1);

    retrieveMathTextbooks(params);
  }, [current_page, createParams, retrieveMathTextbooks]);

  const goToNextPage = useCallback(() => {
    const params = createParams(current_page + 1);

    retrieveMathTextbooks(params);
  }, [current_page, createParams, retrieveMathTextbooks]);

  const goToLastPage = useCallback(() => {
    const params = createParams(last_page);

    retrieveMathTextbooks(params);
  }, [last_page, createParams, retrieveMathTextbooks]);

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

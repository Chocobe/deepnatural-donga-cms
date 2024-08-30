// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathChapterPageStore from '@/store/mathStores/mathChapterPageStore/mathChapterPageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathChaptersApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathChapterFooter.css';

type TMathChapterFooterProps = {
  retrieveMathChapters: (params: TRetrieveMathChaptersApiRequestParams) => Promise<void>;
};

function _MathChapterFooter(props: TMathChapterFooterProps) {
  const {
    retrieveMathChapters
  } = props;

  //
  // mathChapterPage store
  //
  const mathChaptersData = useMathChapterPageStore(state => state.mathChaptersData);
  const searchParamsForRetrieveMathChaptersApi = useMathChapterPageStore(state => state.searchParamsForRetrieveMathChaptersApi);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathChaptersApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathChaptersApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathChaptersApi]);

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
    paginationData: mathChaptersData,
    createParams,
    retrieveApiFunction: retrieveMathChapters,
  });

  return (
    <div className="MathChapterFooter">
      <div className="MathChapterFooter-leftSide">
        Total {count} 교과서 소단원
      </div>

      <div className="MathChapterFooter-rightSide">
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

const MathChapterFooter = memo(_MathChapterFooter);
export default MathChapterFooter;

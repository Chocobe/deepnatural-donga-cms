// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathSeriesSourcePageStore from '@/store/mathStores/mathSeriesSourcePageStore/mathSeriesSourcePageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathSeriesSourcesApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathSeriesSourceFooter.css';

type TMathSeriesSourceFooterProps = {
  retrieveMathSeriesSources: (params: TRetrieveMathSeriesSourcesApiRequestParams) => Promise<void>;
};

function _MathSeriesSourceFooter(props: TMathSeriesSourceFooterProps) {
  const {
    retrieveMathSeriesSources,
  } = props;

  //
  // store
  //
  const mathSeriesSourcesData = useMathSeriesSourcePageStore(state => state.mathSeriesSourcesData);
  const searchParamsForRetrieveMathSeriesSourcesApi = useMathSeriesSourcePageStore(state => state.searchParamsForRetrieveMathSeriesSourcesApi);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathSeriesSourcesApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathSeriesSourcesApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathSeriesSourcesApi]);

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
    createParams,
    retrieveApiFunction: retrieveMathSeriesSources,
    paginationData: mathSeriesSourcesData,
  });

  return (
    <div className="MathSeriesSourceFooter">
      <div className="MathSeriesSourceFooter-leftSide">
        Total {count} 시리즈-출처
      </div>

      <div className="MathSeriesSourceFooter-rightSide">
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

const MathSeriesSourceFooter = memo(_MathSeriesSourceFooter);
export default MathSeriesSourceFooter;

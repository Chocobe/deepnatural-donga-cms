// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathInstructionPageStore from '@/store/mathStores/mathInstructionPageStore/mathInstructionPageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathInstructionsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathInstructionFooter.css';

type TMathInstructionFooterProps = {
  retrieveMathInstructions: (params: TRetrieveMathInstructionsApiRequestParams) => Promise<void>;
};

function _MathInstructionFooter(props: TMathInstructionFooterProps) {
  const {
    retrieveMathInstructions,
  } = props;

  //
  // mathInstructionPage store
  //
  const searchParamsForRetrieveMathInstructionsApi = useMathInstructionPageStore(state => state.searchParamsForRetrieveMathInstructionsApi);
  const mathInstructionsData = useMathInstructionPageStore(state => state.mathInstructionsData);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathInstructionsApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathInstructionsApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathInstructionsApi]);

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
    retrieveApiFunction: retrieveMathInstructions,
    paginationData: mathInstructionsData,
  });

  return (
    <div className="MathInstructionFooter">
      <div className="MathInstructionFooter-leftSide">
        Total {count} 지문
      </div>

      <div className="MathInstructionFooter-rightSide">
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

const MathInstructionFooter = memo(_MathInstructionFooter);
export default MathInstructionFooter;

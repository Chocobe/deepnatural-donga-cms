// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathKnowledgeConceptPageStore from '@/store/mathStores/mathKnowledgeConceptPageStore/mathKnowledgeConceptPageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathKnowledgeConceptsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathKnowledgeConceptFooter.css';

type TMathKnowledgeConceptFooterProps = {
  retrieveMathKnowledgeConcepts: (params: TRetrieveMathKnowledgeConceptsApiRequestParams) => Promise<void>;
};

function _MathKnowledgeConceptFooter(props: TMathKnowledgeConceptFooterProps) {
  const {
    retrieveMathKnowledgeConcepts,
  } = props;

  //
  // store
  //
  const mathKnowledgeConceptsData = useMathKnowledgeConceptPageStore(state => state.mathKnowledgeConceptsData);
  const searchParamsForRetrieveMathKnowledgeConceptsApi = useMathKnowledgeConceptPageStore(state => state.searchParamsForRetrieveMathKnowledgeConceptsApi);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathKnowledgeConceptsApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathKnowledgeConceptsApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathKnowledgeConceptsApi]);

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
    retrieveApiFunction: retrieveMathKnowledgeConcepts,
    paginationData: mathKnowledgeConceptsData,
  });

  return (
    <div className="MathKnowledgeConceptFooter">
      <div className="MathKnowledgeConceptFooter-leftSide">
        Total {count} 성취기준
      </div>

      <div className="MathKnowledgeConceptFooter-rightSide">
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

const MathKnowledgeConceptFooter = memo(_MathKnowledgeConceptFooter);
export default MathKnowledgeConceptFooter;

// react
import {
  memo,
  useCallback,
} from 'react';
// store
import useMathQuestionPageStore from '@/store/mathStores/mathQuestionPageStore/mathQuestionPageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathQuestionsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathQuestionFooter.css';

type TMathQuestionFooterProps = {
  retrieveMathQuestions: (params: TRetrieveMathQuestionsApiRequestParams) => Promise<void>;
};

function _MathQuestionFooter(props: TMathQuestionFooterProps) {
  const {
    retrieveMathQuestions,
  } = props;

  //
  // mathQuestionPage store
  //
  const mathQuestionsData = useMathQuestionPageStore(state => state.mathQuestionsData);
  const searchParamsForRetrieveMathQuestionsApi = useMathQuestionPageStore(state => state.searchParamsForRetrieveMathQuestionsApi);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathQuestionsApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathQuestionsApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathQuestionsApi]);

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
    retrieveApiFunction: retrieveMathQuestions,
    paginationData: mathQuestionsData,
  });

  return (
    <div className="MathQuestionFooter">
      <div className="MathQuestionFooter-leftSide">
        Total {count} 문항
      </div>

      <div className="MathQuestionFooter-rightSide">
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

const MathQuestionFooter = memo(_MathQuestionFooter);
export default MathQuestionFooter;

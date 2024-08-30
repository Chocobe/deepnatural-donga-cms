// react
import {
  useCallback,
  memo,
} from 'react';
// store
import useMathAchievementPageStore from '@/store/mathStores/mathAchievementPageStore/mathAchievementPageStore';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TRetrieveMathAchievementsApiRequestParams,
} from '@/apis/math/mathApi.type';
// style
import './MathAchievementFooter.css';

type TMathAchievementFooterProps = {
  retrieveMathAchievements: (params: TRetrieveMathAchievementsApiRequestParams) => Promise<void>;
};

function _MathAchievementFooter(props: TMathAchievementFooterProps) {
  const {
    retrieveMathAchievements,
  } = props;

  //
  // mathAchievementPage store
  //
  const searchParamsForRetrieveMathAchievementsApi = useMathAchievementPageStore(state => state.searchParamsForRetrieveMathAchievementsApi);
  const mathAchievementsData = useMathAchievementPageStore(state => state.mathAchievementsData);

  //
  // callback
  //
  const createParams = useCallback((page: number) => {
    const params: TRetrieveMathAchievementsApiRequestParams = {
      searchParams: {
        ...searchParamsForRetrieveMathAchievementsApi,
        page,
      },
    };

    return params;
  }, [searchParamsForRetrieveMathAchievementsApi]);

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
    retrieveApiFunction: retrieveMathAchievements,
    paginationData: mathAchievementsData,
  });

  return (
    <div className="MathAchievementFooter">
      <div className="MathAchievementFooter-leftSide">
        Total {count} 성취기준(소)
      </div>

      <div className="MathAchievementFooter-rightSide">
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

const MathAchievementFooter = memo(_MathAchievementFooter);
export default MathAchievementFooter;

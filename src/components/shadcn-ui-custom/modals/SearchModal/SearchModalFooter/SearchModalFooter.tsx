// react
import {
  memo,
} from 'react';
// hook
import useTablePagination from '@/components/shadcn-ui-custom/TablePagination/hooks/useTablePagination';
// ui
import TablePagination from '@/components/shadcn-ui-custom/TablePagination/TablePagination';
// type
import { 
  TPaginationModel,
} from '@/apis/models/cmsCommonModel.type';
// style
import './SearchModalFooter.css';

type TSearchModalFooterProps<TModel = any> = {
  title: string;
  data: TPaginationModel<TModel> | null;
  createParams: (page: number) => any;
  retrieverApiFunction: (
    params: ReturnType<TSearchModalFooterProps['createParams']>
  ) => Promise<void>;
};

function _SearchModalFooter<TModel = any>(props: TSearchModalFooterProps<TModel>) {
  const {
    title,
    data,
    createParams,
    retrieverApiFunction,
  } = props;

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
    retrieveApiFunction: retrieverApiFunction,
    paginationData: data ?? undefined,
  });

  return (
    <div className="SearchModalFooter">
      <div className="SearchModalFooter-leftSide">
        Total {count} {title}
      </div>

      <div className="SearchModalFooter-rightSide">
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

const SearchModalFooter = memo(_SearchModalFooter) as typeof _SearchModalFooter;
export default SearchModalFooter;

// react
import { 
  useCallback,
} from 'react';
// type
import { 
  TPaginationModel,
} from '@/apis/models/cmsCommonModel.type';
import { 
  TApiRequestNonBodyParams,
} from '@/apis/api.type';

const useTablePagination = <
  TResponse,
>(params: {
  paginationData?: TPaginationModel<TResponse>;
  createParams: (page: number) => TApiRequestNonBodyParams<any, any>
  retrieveApiFunction: (
    params: TApiRequestNonBodyParams<any, any>
  ) => Promise<void>;
}) => {
  const {
    paginationData,
    createParams,
    retrieveApiFunction,
  } = params;

  const {
    count = 0,
    current_page = 1,
    last_page = 1,
  } = paginationData ?? {};

  //
  // callback
  //
  const goToFirstPage = useCallback(async () => {
    const params = createParams(1);

    retrieveApiFunction(params);
  }, [createParams, retrieveApiFunction]);

  const goToPreviousPage = useCallback(async () => {
    const params = createParams(current_page - 1);

    retrieveApiFunction(params);
  }, [
    current_page,
    createParams, retrieveApiFunction,
  ]);

  const goToNextPage = useCallback(async () => {
    const params = createParams(current_page + 1);
    
    retrieveApiFunction(params);
  }, [
    current_page,
    createParams, retrieveApiFunction,
  ]);

  const goToLastPage = useCallback(async () => {
    const params = createParams(last_page);

    retrieveApiFunction(params);
  }, [
    last_page,
    createParams, retrieveApiFunction,
  ]);

  return {
    count,
    current_page,
    last_page,
    goToFirstPage,
    goToPreviousPage,
    goToNextPage,
    goToLastPage,
  };
};

export default useTablePagination;

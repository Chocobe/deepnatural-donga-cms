// type
import { 
  apiSliceStatusMapper, 
  TApiSliceState,
} from './apiStateUtils.type';

export const createIdleApiSliceState = <T>(initialData?: T): TApiSliceState<T> => ({
  data: initialData ?? null,
  error: null,
  status: apiSliceStatusMapper.IDLE,
  isIdle: true,
  isFetching: false,
  isSuccess: false,
  isError: false,
});

export const createFetchingApiSliceState = <T>(flush = true): TApiSliceState<T> => {
  const newState: Partial<TApiSliceState<T>> = {
    status: apiSliceStatusMapper.FETCHING,
    isIdle: false,
    isFetching: true,
    isSuccess: false,
    isError: false,
  };

  if (flush) {
    newState.data = null;
    newState.error = null;
  }

  return newState as TApiSliceState<T>;
};

export const createSuccessApiSliceState = <T>(apiState: T): TApiSliceState<T> => {
  return {
    data: apiState,
    error: null,
    status: apiSliceStatusMapper.SUCCESS,
    isIdle: false,
    isFetching: false,
    isSuccess: true,
    isError: false,
  };
};

export const createErrorApiSliceState = <T>(error: T): TApiSliceState<null, T> => {
  return {
    data: null,
    error,
    status: apiSliceStatusMapper.ERROR,
    isIdle: false,
    isFetching: false,
    isSuccess: false,
    isError: true,
  };
};

// type
import { 
  apiCurrentStateMapper, 
  TApiState,
} from './apiStateUtils.type';

export const createIdleApiState = <T>(initialData?: T): TApiState<T> => ({
  data: initialData ?? null,
  error: null,
  state: apiCurrentStateMapper.IDLE,
  isIdle: true,
  isFetching: false,
  isSuccess: false,
  isError: false,
});

export const createFetchingApiState = <T>(flush = true): TApiState<T> => {
  const newState: Partial<TApiState<T>> = {
    state: apiCurrentStateMapper.FETCHING,
    isIdle: false,
    isFetching: true,
    isSuccess: false,
    isError: false,
  };

  if (flush) {
    newState.data = null;
    newState.error = null;
  }

  return newState as TApiState<T>;
};

export const createSuccessApiState = <T>(apiState: T): TApiState<T> => {
  return {
    data: apiState,
    error: null,
    state: apiCurrentStateMapper.SUCCESS,
    isIdle: false,
    isFetching: false,
    isSuccess: true,
    isError: false,
  };
};

export const createErrorApiState = <T>(error: T): TApiState<null, T> => {
  return {
    data: null,
    error,
    state: apiCurrentStateMapper.ERROR,
    isIdle: false,
    isFetching: false,
    isSuccess: false,
    isError: true,
  };
};

export const apiCurrentStateMapper = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
export type TApiCurrentState = typeof apiCurrentStateMapper[keyof typeof apiCurrentStateMapper];

export type TApiState<T, U = any> = {
  data: T | null;
  error: U | null;
  state: TApiCurrentState;
  isIdle: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

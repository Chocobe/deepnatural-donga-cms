export const apiCurrentStateMapper = {
  IDLE: 'idle',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
export type TAPICurrentState = typeof apiCurrentStateMapper[keyof typeof apiCurrentStateMapper];

export type TAPIState<T, U = any> = {
  data: T;
  error: U;
  state: TAPICurrentState;
  isIdle: boolean;
  isSuccess: boolean;
  isError: boolean;
};

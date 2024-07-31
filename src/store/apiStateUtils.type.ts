// zustand
import {
  StateCreator,
} from 'zustand';

export const apiSliceStatusMapper = {
  IDLE: 'idle',
  FETCHING: 'fetching',
  SUCCESS: 'success',
  ERROR: 'error',
} as const;
export type TApiSliceStatus = typeof apiSliceStatusMapper[keyof typeof apiSliceStatusMapper];

export type TApiSliceState<T, U = any> = {
  data: T | null;
  error: U | null;
  status: TApiSliceStatus;
  isIdle: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
};

export type TStateCreatorWithDevtools<T, U> = StateCreator<T, [["zustand/devtools", never]], [], U>;

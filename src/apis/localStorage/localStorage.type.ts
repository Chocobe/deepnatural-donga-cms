export const localStorageKeyMapper = {
  TOKEN: 'token',
} as const;
export type TLocalStoragekey = typeof localStorageKeyMapper[keyof typeof localStorageKeyMapper];

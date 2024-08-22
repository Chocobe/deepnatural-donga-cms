export const usersCountTabValueMapper = {
  ALL: '0',
  ACTIVE: '1',
  INACTIVE: '2',
} as const;
export type TUsersCountTabValue = typeof usersCountTabValueMapper[keyof typeof usersCountTabValueMapper];

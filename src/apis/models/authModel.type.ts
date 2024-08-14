// --- --- --- --- --- --- --- --- --- ---
//
// 인증 type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

//
// 로그인
//
export type TLoginModel = {
  expire: string;
  token: string;
};

//
// User (사용자)
//
export const userModelRoleMapper = {
  WRITER: 'write',
  REVIEWER: 'reviewer',
} as const;
export type TUserModelRole = typeof userModelRoleMapper[keyof typeof userModelRoleMapper];

export const userModelStatusMapper = {
  ACTIVE: 'active',
  DEACTIVE: 'deactive',
} as const;
export type TUserModelStatus = typeof userModelStatusMapper[keyof typeof userModelStatusMapper];

export type TUserModel = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TUserModelRole;
  status: TUserModelStatus;
};

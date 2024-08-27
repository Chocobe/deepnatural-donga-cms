// --- --- --- --- --- --- --- --- --- ---
//
// 인증 model type을 정의합니다.
//
// --- --- --- --- --- --- --- --- --- ---

/**
 * 로그인
 */
export type TLoginModel = {
  expire: string;
  token: string;
};

/**
 * 회원가입
 */
export type TSignupModel = {
  username: string;
  password: string;
  email: string;
  phone: string;
  groups: number[];
};

/**
 * Group (사용자 권한)
 */
export type TGroupModel = {
  id: number;
  name: string;
};

/**
 * 사용자 활성 여부
 */
export const userModelIsActiveTemplateMapper = {
  true: '사용중',
  false: '사용중지',
} as const;

/**
 * User (사용자)
 */
export type TUserModel = {
  id: number;
  username: string;
  email: string;
  phone: string | null;
  groups: TGroupModel[];
  is_active: boolean;
  is_superuser: boolean;
};

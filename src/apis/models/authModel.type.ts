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
// Group (사용자 권한)
//
export type TGroupModel = {
  id: number;
  name: string;
};


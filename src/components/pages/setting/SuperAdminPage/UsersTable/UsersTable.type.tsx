// FIXME: model 에 정의하기
export const mockUserRoleMapper = {
  WRITER: 'write',
  REVIEWER: 'reviewer',
} as const;
export type TMockUserRole = typeof mockUserRoleMapper[keyof typeof mockUserRoleMapper];

// FIXME: model 에 정의하기
export const mockUserRoleTemplateMapper = {
  [mockUserRoleMapper.WRITER]: '편집자 (문항 관리, 수정 가능)',
  [mockUserRoleMapper.REVIEWER]: '검수자 (문항 검수 가능, 수정 불가능)',
};

// FIXME: model 에 정의하기
export const mockUserStatusMapper = {
  ACTIVE: 'active',
  DEACTIVE: 'deactive',
} as const;
export type TMockUserStatus = typeof mockUserStatusMapper[keyof typeof mockUserStatusMapper];

// FIXME: model 에 정의하기
export const mockUserStatusTemplateMapper = {
  [mockUserStatusMapper.ACTIVE]: '사용중',
  [mockUserStatusMapper.DEACTIVE]: '사용중지',
} as const;

// FIXME: model 에 정의하기
export type TMockUser = {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: TMockUserRole;
  status: TMockUserStatus;
};

// FIXME: 지우기
export const mockUsers: TMockUser[] = [
  {
    id: 'id-1',
    name: '김철수1',
    email: '1-michelle@bookdonga.com',
    phone: '010-1234-5678',
    role: mockUserRoleMapper.WRITER,
    status: 'active',
  },
  {
    id: 'id-2',
    name: '김철수2',
    email: '2-michelle@bookdonga.com',
    phone: '020-1234-5678',
    role: mockUserRoleMapper.WRITER,
    status: 'active',
  },
  {
    id: 'id-3',
    name: '김철수3',
    email: '3-michelle@bookdonga.com',
    phone: '030-1234-5678',
    role: mockUserRoleMapper.WRITER,
    status: 'deactive',
  },
  {
    id: 'id-4',
    name: '김철수4',
    email: '4-michelle@bookdonga.com',
    phone: '040-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: 'id-5',
    name: '김철수5',
    email: '5-michelle@bookdonga.com',
    phone: '050-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: 'id-6',
    name: '김철수6',
    email: '6-michelle@bookdonga.com',
    phone: '060-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: 'id-7',
    name: '김철수7',
    email: '7-michelle@bookdonga.com',
    phone: '070-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: 'id-8',
    name: '김철수8',
    email: '8-michelle@bookdonga.com',
    phone: '080-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: 'id-9',
    name: '김철수9',
    email: '9-michelle@bookdonga.com',
    phone: '090-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: 'id-10',
    name: '김철수10',
    email: '10-michelle@bookdonga.com',
    phone: '100-1234-5678',
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
];
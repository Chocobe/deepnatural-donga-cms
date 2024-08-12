// faker
import { faker } from '@faker-js/faker';

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
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.WRITER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.WRITER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.WRITER,
    status: 'deactive',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: mockUserRoleMapper.REVIEWER,
    status: 'active',
  },
];
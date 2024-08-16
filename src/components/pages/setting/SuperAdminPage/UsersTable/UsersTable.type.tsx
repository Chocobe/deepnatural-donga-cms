// faker
import { 
  faker,
} from '@faker-js/faker';
// type
import { 
  TUserModel,
  userModelRoleMapper,
  userModelStatusMapper,
} from '@/apis/models/authModel.type';

export const userRoleTemplateMapper = {
  [userModelRoleMapper.WRITER]: '편집자 (문항 관리, 수정 가능)',
  [userModelRoleMapper.REVIEWER]: '검수자 (문항 검수 가능, 수정 불가능)',
};

export const userStatusTemplateMapper = {
  [userModelStatusMapper.ACTIVE]: '사용중',
  [userModelStatusMapper.DEACTIVE]: '사용중지',
} as const;


// FIXME: 지우기
export const mockUsers: TUserModel[] = [
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.WRITER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.WRITER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.WRITER,
    status: 'deactive',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
  {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    role: userModelRoleMapper.REVIEWER,
    status: 'active',
  },
];
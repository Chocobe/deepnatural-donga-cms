// faker
import { 
  faker,
} from '@faker-js/faker';
// type
import { 
  TUserModel,
} from '@/apis/models/userModel.type';

// FIXME: 지우기
export const mockUsers: TUserModel[] = [
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: true,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: true,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
  {
    id: faker.number.int(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    groups: [
      {
        id: 1,
        name: '테스트그룹',
      },
    ],
    is_active: false,
  },
];

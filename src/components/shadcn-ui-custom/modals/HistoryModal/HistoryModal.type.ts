// faker
import { 
  faker,
} from '@faker-js/faker';

export type THistoryModalData = {
  createdAt: string;
  username: string;
  action: string;
};

// FIXME: 삭제하기
export const mockHistoryModalData: THistoryModalData[] = [
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
  {
    createdAt: faker.date.past().toISOString(),
    username: faker.person.fullName(),
    action: faker.lorem.lines(1),
  },
] as const;

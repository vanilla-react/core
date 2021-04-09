import { PrismaClient } from '.prisma/client';
import { User } from '.prisma/client';

const users: User[] = [
  {
    id: 1,
    name: 'john-doe',
    email: 'john-doe@test.com',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function createUsersUp(client: PrismaClient) {
  await client.user.createMany({
    data: users,
  });
}

export async function createUsersDown(client: PrismaClient) {
  await client.user.deleteMany({});
}

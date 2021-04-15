// import { PrismaClient } from '@prisma/client';
// import faker from 'faker';
// import slugify from 'slugify';
const { PrismaClient } = require('@prisma/client');
const faker = require('faker');
const slugify = require('slugify');
const prisma = new PrismaClient();

export type Post = {
  id: number;
  slug: string;
  title: string;
  status: PostStatus;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
};

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

export function generateUsers() {
  return [...Array(5)].map((_, index) => ({
    name: faker.unique(faker.internet.userName),
    email: faker.unique(faker.internet.email),
  }));
}

export function generatePosts() {
  return [...Array(30)].map((_, index) => {
    const title = faker.unique(faker.name.title);
    const slug = slugify(title);

    return {
      title,
      slug,
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
      userId: faker.datatype.number({
        min: 1,
        max: 5,
      }),
      status: faker.datatype.number({ min: 0, max: 1 })
        ? PostStatus.PENDING
        : PostStatus.APPROVED,
    } as Post;
  });
}

export async function seed() {
  const generatedUsers = generateUsers().map((user, idx) =>
    prisma.user.upsert({
      where: {
        id: idx + 1,
      },
      update: {},
      create: user,
    }),
  );

  await Promise.all(generatedUsers);

  const generatedPosts = generatePosts().map((post, idx) =>
    prisma.post.upsert({
      where: {
        id: idx + 1,
      },
      update: {},
      create: post,
    }),
  );

  await Promise.all(generatedPosts);

  await prisma.programmingLanguage.upsert({
    where: {
      id: 1,
    },
    create: {
      id: 1,
      name: 'javascript',
      extension: '.js',
      template:
        'ZXhwb3J0IGNvbnN0IEFwcCA9ICgpID0+IHsKICBjb25zdCBoMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gxJykKICBoMS5pbm5lclRleHQgPSAiSGVsbG8gV29ybGQhIgoKICBkb2N1bWVudC5ib2R5LmFwcGVuZChoMSkKfQoKQXBwKCk=',
    },
    update: {},
  });

  await prisma.programmingLanguage.upsert({
    where: {
      id: 2,
    },
    create: {
      id: 2,
      name: 'jsx',
      extension: '.jsx',
      template:
        'ZXhwb3J0IGNvbnN0IEFwcCA9ICgpID0+IHsKICByZXR1cm4gKAogICAgPGgxPgogICAgICBIZWxsbyBXb3JsZCEKICAgIDwvaDE+CiAgKQo=',
    },
    update: {},
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

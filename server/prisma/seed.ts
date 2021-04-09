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
    id: index + 1,
    name: faker.unique(faker.internet.userName),
    email: faker.unique(faker.internet.email),
  }));
}

export function generatePosts() {
  return [...Array(15)].map((_, index) => {
    const title = faker.unique(faker.name.title);
    const slug = slugify(title);

    return {
      id: index + 1,
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
  const generatedUsers = generateUsers().map((user) =>
    prisma.user.upsert({
      where: {
        id: user.id,
      },
      update: {},
      create: user,
    }),
  );

  await Promise.all(generatedUsers);

  const generatedPosts = generatePosts().map((post) =>
    prisma.post.upsert({
      where: {
        id: post.id,
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
      name: 'js',
      template: "console.log('javascript')",
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
      template: "console.log('react')",
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

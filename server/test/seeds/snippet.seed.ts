import { PrismaClient } from '.prisma/client';
import { Snippet } from '.prisma/client';

const snippets: Snippet[] = [
  {
    id: 1,
    content: 'some cool js content',
    postId: 1,
    userId: 1,
    programmingLanguageId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    content: 'some cool react content',
    postId: 1,
    userId: 1,
    programmingLanguageId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function createSnippetsUp(client: PrismaClient) {
  await client.snippet.createMany({
    data: snippets,
  });
}

export async function createSnippetsDown(client: PrismaClient) {
  await client.snippet.deleteMany({});
}

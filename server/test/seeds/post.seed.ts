import { PostStatus } from '.prisma/client';
import { PrismaClient } from '.prisma/client';
import { Post } from '.prisma/client';

const posts: Post[] = [
  {
    id: 1,
    title: 'post title',
    slug: 'post-title',
    status: PostStatus.PENDING,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'post title',
    slug: 'post-title',
    status: PostStatus.PENDING,
    userId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export async function createPostsUp(client: PrismaClient) {
  await client.post.createMany({
    data: posts,
  });
}

export async function createPostsDown(client: PrismaClient) {
  await client.post.deleteMany({});
}

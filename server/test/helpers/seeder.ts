import { PrismaClient } from '.prisma/client';
import * as Posts from '../seeds/post.seed';
import * as Languages from '../seeds/programming-language.seed';
import * as Snippets from '../seeds/snippet.seed';
import * as Users from '../seeds/user.seed';

export async function up(prismaClient: PrismaClient) {
  await Users.createUsersUp(prismaClient);
  await Posts.createPostsUp(prismaClient);
  await Languages.createProgrammingLanguagesUp(prismaClient);
  await Snippets.createSnippetsUp(prismaClient);
}

export async function down(prismaClient: PrismaClient) {
  await Snippets.createSnippetsDown(prismaClient);
  await Languages.createProgrammingLanguagesDown(prismaClient);
  await Posts.createPostsDown(prismaClient);
  await Users.createUsersDown(prismaClient);
}

export async function init(prismaClient: PrismaClient) {
  await down(prismaClient);
  await up(prismaClient);
}

import { PrismaClient } from '.prisma/client';
import { ProgrammingLanguage } from '.prisma/client';

const languages: ProgrammingLanguage[] = [
  {
    id: 1,
    name: 'js',
    template: "console.log('js')",
  },
  {
    id: 2,
    name: 'react',
    template: "console.log('react')",
  },
];

export async function createProgrammingLanguagesUp(client: PrismaClient) {
  await client.programmingLanguage.createMany({
    data: languages,
  });
}

export async function createProgrammingLanguagesDown(client: PrismaClient) {
  await client.programmingLanguage.deleteMany({});
}

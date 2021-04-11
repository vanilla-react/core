import { INestApplication } from '@nestjs/common';
import { createAppModule } from './helpers/app-module';
import * as request from 'supertest';
import { UpdateSnippetDto } from '../src/snippet/dto/update-snippet.dto';
import * as Seeder from './helpers/seeder';
import { PrismaClient } from '.prisma/client';
import { UpdateBulkSnippetsDto } from '../src/snippet/dto/update-bulk-snippets';
import { SnippetRepository } from '../src/snippet/snippet.repository';
import { PrismaService } from '../src/prisma.service';

const PREFIX = '/snippet';

describe('Snippet Controller', () => {
  let prismaClient = new PrismaClient();
  let app: INestApplication;
  let httpServer: any;

  beforeAll(async () => {
    app = await createAppModule();
    httpServer = app.getHttpServer();
  });

  beforeEach(async (done) => {
    await Seeder.init(prismaClient);
    done();
  });

  describe(PREFIX + '/:id', () => {
    it('should return a 400 status code when the snippet does not exist, or some of its provided data is invalid', async () => {
      const updateSnippetDto = new UpdateSnippetDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;

      await request(httpServer)
        .patch(PREFIX + '/5')
        .send(updateSnippetDto)
        .expect(400);
    });

    it('should not update the resource when trying to update a resource which the user does not own', async () => {
      const updateSnippetDto = new UpdateSnippetDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;

      const originalSnippet = Seeder.snippets.find((s) => s.id === 2);

      await request(httpServer)
        .patch(PREFIX + '/2')
        .send(updateSnippetDto);

      const prisma = app.get(PrismaService);

      const snippet = await prisma.snippet.findFirst({ where: { id: 2 } });

      expect(snippet).toEqual(originalSnippet);
    });

    it('should return a 204 status code when the snippet has been updated', async () => {
      const updateSnippetDto = new UpdateSnippetDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;

      await request(httpServer)
        .patch(PREFIX + '/1')
        .send(updateSnippetDto)
        .expect(204);
    });
  });

  describe(PREFIX + '/bulk', () => {
    it('should return a 400 status code when it a snippet that does not exist', async () => {
      const updateSnippetDto = new UpdateBulkSnippetsDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;
      updateSnippetDto.id = 5;

      await request(httpServer)
        .patch(PREFIX + '/bulk')
        .send([updateSnippetDto])
        .expect(400);
    });

    // Not using transactions at the moment.
    it.skip('should not update the snippets when one of the given snippets is wrong', async () => {
      const updateSnippetDto = new UpdateBulkSnippetsDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;
      updateSnippetDto.id = 1;

      const updateSnippetDto2 = new UpdateBulkSnippetsDto();

      updateSnippetDto2.content = 'updated content';
      updateSnippetDto2.programmingLanguageId = 9;
      updateSnippetDto2.id = 3;

      const res = await request(httpServer)
        .patch(PREFIX + '/bulk')
        .send([updateSnippetDto]);

      const snippet = await prismaClient.snippet.findFirst({
        where: {
          id: 1,
        },
      });

      expect(snippet!.content).not.toBe('updated content');
      expect(res.status).toBe(400);
    });

    it('should return a 400 status code when it received bad data', async () => {
      const updateSnippetDto = new UpdateBulkSnippetsDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;
      updateSnippetDto.id = 5;

      await request(httpServer)
        .patch(PREFIX + '/bulk')
        .send([updateSnippetDto])
        .expect(400);
    });

    it('should return a 400 status code when trying to update a snippet where the post is approved', async () => {
      await prismaClient.post.update({
        where: {
          id: 1,
        },
        data: {
          status: 'APPROVED',
        },
      });

      const updateSnippetDto = new UpdateBulkSnippetsDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;
      updateSnippetDto.id = 1;

      await request(httpServer)
        .patch(PREFIX + '/bulk')
        .send([updateSnippetDto])
        .expect(400);
    });

    it('should return a 204 status code when given one snippet with valid data', async () => {
      const updateSnippetDto = new UpdateBulkSnippetsDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;
      updateSnippetDto.id = 1;

      await request(httpServer)
        .patch(PREFIX + '/bulk')
        .send([updateSnippetDto])
        .expect(204);
    });

    it('should return a 204 status code when given many snippets with valid data', async () => {
      const updateSnippetDto = new UpdateBulkSnippetsDto();

      updateSnippetDto.content = 'updated content';
      updateSnippetDto.programmingLanguageId = 1;
      updateSnippetDto.id = 1;

      const updateSnippetDto2 = new UpdateBulkSnippetsDto();

      updateSnippetDto2.content = 'updated content2';
      updateSnippetDto2.programmingLanguageId = 2;
      updateSnippetDto2.id = 2;

      await request(httpServer)
        .patch(PREFIX + '/bulk')
        .send([updateSnippetDto, updateSnippetDto2])
        .expect(204);
    });
  });

  afterAll(async (done) => {
    await app.close();
    await prismaClient.$disconnect();
    done();
  });
});

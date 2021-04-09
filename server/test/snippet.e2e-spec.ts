import { INestApplication } from '@nestjs/common';
import { createAppModule } from './helpers/app-module';
import * as request from 'supertest';
import { UpdateSnippetDto } from '../src/snippet/dto/update-snippet.dto';

const PREFIX = '/snippet';

// * [x] A user should be able to update a snippet only in pending state
// * [ ] A user should be able to update many snippets in a pending state

describe('Snippet Controller', () => {
  let app: INestApplication;
  let httpServer: any;

  beforeEach(async (done) => {
    app = await createAppModule();
    httpServer = app.getHttpServer();

    done();
  });

  it('should work', async (done) => {
    await request(httpServer)
      .patch(PREFIX)
      .send(new UpdateSnippetDto())
      .expect(200);

    done();
  });

  afterAll(async (done) => {
    await app.close();
    done();
  });
});

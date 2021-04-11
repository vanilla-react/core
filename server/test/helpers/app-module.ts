import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { AppModule } from './../../src/app.module';
import { JwtAuthGuard } from '../../src/auth/guards/jwt.guard';
import { OwnerGuard } from '../../src/snippet/guards/owner.guard';

export async function createAppModule() {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideGuard(JwtAuthGuard)
    .useValue({
      canActivate: jest.fn((context: ExecutionContext) => {
        context.switchToHttp().getRequest().user = { id: 1 };
        return true;
      }),
    })
    .overrideGuard(OwnerGuard)
    .useValue({
      canActivate: jest.fn(() => true),
    })
    .compile();

  let app = moduleFixture.createNestApplication();
  await app.init();

  return app;
}

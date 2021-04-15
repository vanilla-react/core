import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { PrismaService } from '../prisma.service';
import { PostRepository } from './post.repository';
import { KudoModule } from '../kudo/kudo.module';
import { ProgrammingLanguageModule } from '../programming-language/programming-language.module';

@Module({
  imports: [KudoModule, ProgrammingLanguageModule],
  controllers: [PostController],
  providers: [PostService, PrismaService, PostRepository],
})
export class PostModule {}

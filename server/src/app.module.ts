import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { SnippetModule } from './snippet/snippet.module';
@Module({
  imports: [AuthModule, UserModule, SnippetModule, ConfigModule.forRoot()],
  providers: [PrismaService],
})
export class AppModule {}

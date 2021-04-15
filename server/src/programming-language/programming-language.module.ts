import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ProgrammingLanguageRepository } from './programming-language.repository';
import { ProgrammingLanguageService } from './programming-language.service';

@Module({
  providers: [
    ProgrammingLanguageService,
    ProgrammingLanguageRepository,
    PrismaService,
  ],
  exports: [ProgrammingLanguageService],
})
export class ProgrammingLanguageModule {}

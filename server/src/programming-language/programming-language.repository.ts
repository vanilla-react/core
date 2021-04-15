import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProgrammingLanguageRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  public async getAll() {
    return this._prismaService.programmingLanguage.findMany();
  }
}

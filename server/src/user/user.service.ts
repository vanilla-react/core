import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly _prisma: PrismaService) {}

  public async create(userData: CreateUserDto) {
    return this._prisma.user.upsert({
      where: {
        email: userData.email,
      },
      update: {
        name: userData.name,
      },
      create: {
        email: userData.email,
        name: userData.name,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
}

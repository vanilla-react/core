import { User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IGithubUser } from 'src/types';

import { CreateUserDto } from '../user/dtos/create-user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  public constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  public async githubLogin(user: IGithubUser) {
    const createdUser = await this._userService.create(
      CreateUserDto.create(user),
    );

    return this.createJwt(createdUser.id);
  }

  private createJwt(userId: User['id']) {
    return {
      accessToken: this._jwtService.sign({ id: userId }),
    };
  }
}

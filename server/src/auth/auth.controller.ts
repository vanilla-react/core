import {
  Controller,
  Get,
  NotFoundException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { User } from './decorators/user.decorator';
import { IGithubUser } from '../types';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  public constructor(
    private readonly _authService: AuthService,
    private readonly _userService: UserService,
  ) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  public async me(@User() userId: number) {
    return this._userService.getOneById(userId);
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  public async githubAuth() {}

  @Get('redirect')
  @UseGuards(AuthGuard('github'))
  public async githubAuthRedirect(
    @User() user: IGithubUser,
    @Res() res: Response,
  ) {
    if (!user) {
      throw new NotFoundException('No user found');
    }

    const { accessToken } = await this._authService.githubLogin(user);

    const params = new URLSearchParams({ accessToken });

    res.redirect(`http://localhost:3000?${params.toString()}`);
  }
}

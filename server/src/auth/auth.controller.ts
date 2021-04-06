import {
  Controller,
  Get,
  NotFoundException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  public constructor(private readonly _authService: AuthService) {}

  @Get('/me')
  @UseGuards(JwtAuthGuard)
  public async me(@Req() req: Request) {
    return req.user;
  }

  @Get()
  @UseGuards(AuthGuard('github'))
  public async githubAuth(@Req() req: Request) {}

  @Get('redirect')
  @UseGuards(AuthGuard('github'))
  public async githubAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const { user } = req;

    if (!user) {
      throw new NotFoundException('No user found');
    }

    const { accessToken } = await this._authService.githubLogin(user);

    const params = new URLSearchParams({ accessToken });

    res.redirect(`http://localhost:3000?${params.toString()}`);
  }
}

import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { IGithubUser } from '../../types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  public constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/api/auth/redirect',
      scope: ['user:email'],
    });
  }

  public async validate(_: string, __: any, user: IGithubUser) {
    return user;
  }
}

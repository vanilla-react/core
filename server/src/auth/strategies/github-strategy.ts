import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { IGithubDoneResponse, IGithubLoginResponse } from 'src/types';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  public constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/redirect',
      scope: ['user:email'],
    });
  }

  public async validate(
    accessToken: string,
    _: any,
    user: IGithubLoginResponse,
    done: (error: Error | null, data: IGithubDoneResponse) => void,
  ) {
    return { user };
    // done(null, {
    //   user,
    // });
  }
}

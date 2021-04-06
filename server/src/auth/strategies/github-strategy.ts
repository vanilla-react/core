import 'dotenv/config';

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { IGithubUser } from 'src/types';

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

<<<<<<< HEAD
  public async validate(
    accessToken: string,
    _: any,
    user: IGithubLoginResponse,
    done: (error: Error | null, data: IGithubDoneResponse) => void,
  ) {
    return user;
    // done(null, {
    //   user,
    // });
=======
  public async validate(_: string, __: any, user: IGithubUser) {
    return user;
>>>>>>> 4b62e2d91b8fa75adbf2295482d8d667ee514f98
  }
}

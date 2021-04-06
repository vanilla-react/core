import { IGithubDoneResponse } from 'src/types';

export class CreateUserDto {
  name: string;
  email: string;

  static create({ user }: IGithubDoneResponse) {
    const _user = new CreateUserDto();

    _user.name = user.displayName;
    _user.email = user.emails[0].value;

    return _user;
  }
}

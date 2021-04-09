import { IGithubUser } from '../../types';

export class CreateUserDto {
  name: string;
  email: string;

  static create(user: IGithubUser) {
    const _user = new CreateUserDto();


    _user.name = user.username;
    _user.email = user.emails[0].value;

    return _user;
  }
}

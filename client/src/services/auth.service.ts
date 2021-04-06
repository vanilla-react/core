import { makeObservable, observable } from 'mobx';

export class AuthService {
  @observable
  public data: any = [];

  constructor() {
    makeObservable(this);
  }
}

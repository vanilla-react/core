export class ConfigService {
  public BASE_URL: string = 'http://localhost:5000/api/';
  public accessTokenKey: string = 'vr-auth-token';

  get accessToken() {
    return localStorage.getItem(this.accessTokenKey);
  }
}

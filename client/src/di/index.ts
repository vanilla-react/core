import * as AuthModule from '../auth/auth.module';
import * as SharedModule from '../shared/shared.module';

export const useInitialAuth = AuthModule.useInitialAuth;
export const config = new SharedModule.ConfigService();
export const httpClient = new SharedModule.HttpClientService(config);
export const authApi = new AuthModule.AuthApi(httpClient);
export const authService = new AuthModule.AuthService(
  authApi,
  config,
  httpClient,
);

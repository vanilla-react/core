import * as AuthModule from '../features/auth/auth.module';
import * as SharedModule from '../features/shared/shared.module';

// export your hooks
export const useInitialAuth = AuthModule.useInitialAuth;

// bootstrap your providers
export const config = new SharedModule.ConfigService();
export const httpClient = new SharedModule.HttpClientService(config);
export const authApi = new AuthModule.AuthApi(httpClient);
export const authService = new AuthModule.AuthService(
  authApi,
  config,
  httpClient,
);

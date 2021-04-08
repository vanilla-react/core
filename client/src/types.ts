import { AuthApi, AuthService, useInitialAuth } from './auth/auth.module';
import { HttpClientService, ConfigService } from './shared/shared.module';

export interface IAvatarProps {
  name: string;
}

export interface IProvidersContext {
  config: ConfigService;
  httpClient: HttpClientService;
  authApi: AuthApi;
  authService: AuthService;
  useInitialAuth: typeof useInitialAuth;
}

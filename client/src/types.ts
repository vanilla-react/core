import { AxiosInstance } from 'axios';
import {
  AuthApi,
  AuthService,
  useInitialAuth,
} from './features/auth/auth.module';
import { ConfigService } from './features/shared/shared.module';

export interface IAvatarProps {
  name: string;
}

export interface IProvidersContext {
  config: ConfigService;
  axios: AxiosInstance;
  authApi: AuthApi;
  authService: AuthService;
  useInitialAuth: typeof useInitialAuth;
}

export type AppProviderWithoutHooks = {
  [P in Exclude<keyof IProvidersContext, `use${string}`>]: IProvidersContext[P];
};

export type AppProviderHooks = {
  [P in Extract<keyof IProvidersContext, `use${string}`>]: IProvidersContext[P];
};

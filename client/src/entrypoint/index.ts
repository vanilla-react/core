import Axios from 'axios';
import * as AuthModule from '../features/auth/auth.module';
import * as SharedModule from '../features/shared/shared.module';

/*
  When adding new hooks of providers you need to update the interface in @/types.ts
*/

// export your hooks
export const useInitialAuth = AuthModule.useInitialAuth;

// bootstrap your providers
export const config = new SharedModule.ConfigService();
export const axios = Axios.create({
  baseURL: config.BASE_URL,
});

export const authApi = new AuthModule.AuthApi(axios);
export const authService = new AuthModule.AuthService(authApi, config, axios);

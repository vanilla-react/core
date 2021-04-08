/* When adding new hooks or providers you need to update the interface in @/types.ts */

import Axios from 'axios';
import * as AuthModule from '@features/auth/auth.module';
import * as SharedModule from '@features/shared/shared.module';

export const useInitialAuth = AuthModule.useInitialAuth;

export const config = new SharedModule.ConfigService();
export const axios = Axios.create({
  baseURL: config.BASE_URL,
});

export const authApi = new AuthModule.AuthApi(axios);
export const authService = new AuthModule.AuthService(authApi, config, axios);

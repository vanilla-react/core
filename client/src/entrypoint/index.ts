import Axios from 'axios';
import * as AuthModule from '@features/auth/auth.module';
import * as PostModule from '@features/posts/post.module';
import * as KudoModule from '@features/kudos/kudos.module';
import * as SharedModule from '@features/shared/shared.module';

export const useInitialAuth = AuthModule.useInitialAuth;

export const config = new SharedModule.ConfigService();
export const axios = Axios.create({
  baseURL: config.BASE_URL,
});

export const authApi = new AuthModule.AuthApi(axios);
export const authService = new AuthModule.AuthService(authApi, config, axios);

export const postApi = new PostModule.PostApi(axios);
export const postService = new PostModule.PostService(postApi);

export const kudoApi = new KudoModule.KudoApi(axios);
export const kudoService = new KudoModule.KudoService(kudoApi, postService);

import { AxiosInstance } from 'axios';
import {
  AuthApi,
  AuthService,
  useInitialAuth,
} from './features/auth/auth.module';
import { PostApi } from './features/posts/post.api';
import { PostService } from './features/posts/post.service';
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
  postApi: PostApi;
  postService: PostService;
}

export type AppProviderWithoutHooks = {
  [P in Exclude<keyof IProvidersContext, `use${string}`>]: IProvidersContext[P];
};

export type AppProviderHooks = {
  [P in Extract<keyof IProvidersContext, `use${string}`>]: IProvidersContext[P];
};

export interface IPost {
  title: string;
  updatedAt: Date;
  createdAt: Date;
  status: PostStatus;
  id: number;
  slug: string;
  User: Author;
  Snippets: any[];
}

export interface Author {
  id: number;
  name: string;
}

export enum PostStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}

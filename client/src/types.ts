import { AxiosInstance } from 'axios';
import {
  AuthApi,
  AuthService,
  useInitialAuth,
} from './features/auth/auth.module';
import { KudoApi } from './features/kudos/kudos.api';
import { KudoService } from './features/kudos/kudos.service';
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
  kudoApi: KudoApi;
  kudoService: KudoService;
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
  Kudos: Kudo[];
}

export interface Author {
  id: number;
  name: string;
}

export interface Kudo {
  userId: number;
  type: KudoType;
}

export enum PostStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
}

export enum KudoType {
  UPVOTE = 'UPVOTE',
  DOWNVOTE = 'DOWNVOTE',
}

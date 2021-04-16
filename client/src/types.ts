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
import { ProgrammingLanguagesApi } from './features/programming-languages/programming-languages.api';
import { ProgrammingLanguagesService } from './features/programming-languages/programming-languages.service';
import {
  Base64Service,
  ConfigService,
  useTabs,
} from './features/shared/shared.module';

export interface IAvatarProps {
  name: string;
}

export interface IProvidersContext {
  config: ConfigService;
  base64: Base64Service;
  axios: AxiosInstance;
  authApi: AuthApi;
  authService: AuthService;
  useInitialAuth: typeof useInitialAuth;
  useTabs: typeof useTabs;
  postApi: PostApi;
  postService: PostService;
  kudoApi: KudoApi;
  kudoService: KudoService;
  programmingLanguageApi: ProgrammingLanguagesApi;
  programmingLanguageService: ProgrammingLanguagesService;
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
  Snippets: Snippet<Base64>[];
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

export interface CreatePostDto<T = string> {
  title: string;
  snippets: Snippet<T>[];
}

export interface Snippet<T> {
  content: T;
  programmingLanguageId: number;
}

export type Base64 = string;

export interface ProgrammingLanguage {
  id: number;
  name: string;
  template: string;
  extension: string;
}

export type EditorFiles = Record<string, FileData>;

export type FileData = {
  name: string;
  language: string;
  value: string;
};

export interface IEditorProps {
  setSnippetData: React.Dispatch<React.SetStateAction<FileData[]>>;
  snippetData: FileData[];
}

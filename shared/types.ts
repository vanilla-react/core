export interface IUser {
  id: number;
  name: string;
  email: string;
}

export interface Post {
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

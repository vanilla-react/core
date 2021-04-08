export class SnippetDto {
  id: number;
  slug: string;
  title: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  JSContent: string;
  ReactContent: string;
  userId: number;
  Author: IAuthor;
}

export interface IAuthor {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

/* {
  "id": 3,
  "slug": "asdasda2",
  "title": "asdasda",
  "status": "PENDING",
  "createdAt": "2021-04-07T00:37:05.569Z",
  "updatedAt": "2021-04-07T00:37:05.570Z",
  "JSContent": "string",
  "ReactContent": "string",
  "userId": 1,
  "Author": {
    "id": 1,
    "name": "nnari",
    "email": "pannariiz@gmail.com",
    "createdAt": "2021-04-07T00:29:28.057Z",
    "updatedAt": "2021-04-07T00:31:39.893Z"
  }
} */

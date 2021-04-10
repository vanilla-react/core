export interface IGithubUser {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: string[];
  provider: string;
  emails: Email[];
}

export interface Email {
  value: string;
}

export enum PostStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
}

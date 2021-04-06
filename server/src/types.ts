export interface IGithubLoginResponse extends GithubUser {}

export interface IGithubDoneResponse {
  user: IGithubLoginResponse;
}

export interface GithubUser {
  id: string;
  nodeId: string;
  displayName: string;
  username: string;
  profileUrl: string;
  photos: string[];
  provider: string;
  emails: Email[];
}

export interface IJwtUser {
  id: string;
  email: string;
}

export class JwtUser implements IJwtUser {
  id: string;
  email: string;
}
export interface Email {
  value: string;
}

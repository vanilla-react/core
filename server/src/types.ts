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

export interface Email {
  value: string;
}

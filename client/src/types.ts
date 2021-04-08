import { Container } from 'inversify';

export interface IAvatarProps {
  name: string;
}

export interface IAppProvider {
  container: Container;
}

import { interfaces } from 'inversify';
import { container } from '.';

export const useInjection = <T extends unknown>(
  identifier: interfaces.ServiceIdentifier<T>,
) => container.get<T>(identifier);

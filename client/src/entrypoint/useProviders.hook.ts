import { useContext } from 'react';
import { getProviders } from '../lib';
import { AppProviderWithoutHooks, IProvidersContext } from '../types';
import { ProvidersContext } from './providers.context';

export const useProviders = () => {
  const deps = useContext(ProvidersContext);
  return getProviders(deps) as AppProviderWithoutHooks;
};

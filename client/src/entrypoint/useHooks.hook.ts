import { useContext } from 'react';
import { getHooks } from '@/lib';
import { AppProviderHooks } from '@/types';
import { ProvidersContext } from './providers.context';

export const useHooks = () => {
  const deps = useContext(ProvidersContext);
  return getHooks(deps) as AppProviderHooks;
};

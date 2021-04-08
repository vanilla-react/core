import { useContext } from 'react';
import { ProvidersContext } from './providers.context';

export const useProviders = () => useContext(ProvidersContext);

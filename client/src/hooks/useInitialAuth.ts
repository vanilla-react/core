import { useEffect } from 'react';
import { useProviders } from './useProviders';

export const useInitialAuth = (accessToken: string) => {
  const { authService, axios, config } = useProviders();

  useEffect(() => {
    if (!accessToken && !config.hasAccessToken) return;
    axios.addAuthorizationHeader(accessToken);
    authService.getMe();
  }, []);
};

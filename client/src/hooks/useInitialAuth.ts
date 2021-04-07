import { useState, useEffect } from 'react';
import { useProviders } from './useProviders';

export const useInitialAuth = (accessToken: string) => {
  const [loading, setLoading] = useState(true);
  const { authService, config } = useProviders();

  useEffect(() => {
    if (!accessToken && !config.accessToken) return setLoading(false);

    if (accessToken) {
      localStorage.setItem(config.accessTokenKey, accessToken);
    }

    authService.setupInterceptors();
    authService.addAuthorizationHeader(config.accessToken!);

    authService.getMe().finally(() => setLoading(false));
  }, [accessToken]);

  return { loading };
};

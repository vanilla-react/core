import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useProviders } from '../di/useProviders.hook';

export const useInitialAuth = (accessToken: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { authService, config } = useProviders();

  useEffect(() => {
    if (!accessToken && !config.accessToken) return setLoading(false);

    if (accessToken) {
      localStorage.setItem(config.accessTokenKey, accessToken);
    }

    authService.setupInterceptors();
    authService.addAuthorizationHeader(config.accessToken!);

    router.replace({
      search: '',
    });

    authService.getMe().finally(() => setLoading(false));
  }, [accessToken]);

  return { loading };
};

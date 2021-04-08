import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useProviders } from '../../../entrypoint/useProviders.hook';

export const useInitialAuth = (accessToken: string | string[]) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { authService, config } = useProviders();

  useEffect(() => {
    if (Array.isArray(accessToken)) return;

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

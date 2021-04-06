import React, { useMemo } from 'react';
import { createContext } from 'react';
import { AuthApi } from '../apis';
import { Configuration } from '../configuration';
import { AxiosFactory } from '../factories/axios.factory';
import { AuthService } from '../services/auth.service';

interface IAppProvidersProps {
  authService: AuthService;
  config: Configuration;
  axios: AxiosFactory;
}

export const AppContext = createContext<IAppProvidersProps>(undefined!);

export const AppProvider: React.FC = ({ children }) => {
  const configuration = new Configuration();

  const axiosFactory = new AxiosFactory(configuration);
  const authApi = new AuthApi(axiosFactory.axios);
  const authService = new AuthService(authApi);

  const value = useMemo(
    () => ({
      authService,
      config: configuration,
      axios: axiosFactory,
    }),
    [authService, configuration, axiosFactory],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

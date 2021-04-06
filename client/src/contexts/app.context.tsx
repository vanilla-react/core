import React, { useMemo } from 'react';
import { createContext } from 'react';
import { AuthApi } from '../apis';
import { Configuration } from '../configuration';
import { AuthService } from '../services/auth.service';
import { AxiosWrapper } from '../wrappers/axios.wrapper';

interface IAppProvidersProps {
  authService: AuthService;
  config: Configuration;
  axios: AxiosWrapper;
}

export const AppContext = createContext<IAppProvidersProps>(undefined!);

export const AppProvider: React.FC = ({ children }) => {
  const configuration = new Configuration();

  const axiosWrapper = new AxiosWrapper(configuration);
  const authApi = new AuthApi(axiosWrapper.axios);
  const authService = new AuthService(authApi);

  const value = useMemo(
    () => ({
      authService,
      config: configuration,
      axios: axiosWrapper,
    }),
    [authService, configuration, axiosWrapper],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

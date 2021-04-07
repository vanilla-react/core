import React, { useMemo } from 'react';
import { createContext } from 'react';
import { AuthApi } from '../apis';
import { Configuration } from '../configuration';
import { AuthService } from '../services/auth.service';
import Axios, { AxiosInstance } from 'axios';

interface IAppProvidersProps {
  authService: AuthService;
  config: Configuration;
  axios: AxiosInstance;
}

export const AppContext = createContext<IAppProvidersProps>(undefined!);

export const AppProvider: React.FC = ({ children }) => {
  const configuration = new Configuration();

  const axios = Axios.create({
    baseURL: configuration.BASE_URL,
  });

  const authApi = new AuthApi(axios);
  const authService = new AuthService(authApi, axios, configuration);

  const value = useMemo(
    () => ({
      authService,
      config: configuration,
      axios,
    }),
    [authService, configuration, axios],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

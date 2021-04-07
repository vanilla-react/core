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
  user: any;
  setUser: any;
}

export const AppContext = createContext<IAppProvidersProps>(undefined!);

export const AppProvider: React.FC = ({ children }) => {
  const [user, setUser] = React.useState<any>(null);
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
      user,
      setUser,
    }),
    [authService, configuration, axios, user, setUser],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

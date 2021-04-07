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

const config = new Configuration();

const axios = Axios.create({
  baseURL: config.BASE_URL,
});

const authApi = new AuthApi(axios);
const authService = new AuthService(authApi, axios, config);

export const AppContext = createContext<IAppProvidersProps>(undefined!);

export const AppProvider: React.FC = ({ children }) => (
  <AppContext.Provider value={{ config, axios, authService }}>
    {children}
  </AppContext.Provider>
);

import React, { useMemo } from 'react';
import { createContext } from 'react';
import { AuthService } from '../services/auth.service';

interface IAppProvidersProps {
  authService: AuthService;
}

export const AppContext = createContext<IAppProvidersProps>(undefined!);

export const AppProvider: React.FC = ({ children }) => {
  const authService = new AuthService();

  const value = useMemo(
    () => ({
      authService,
    }),
    [authService],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

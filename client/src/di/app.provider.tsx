import React from 'react';
import { ProvidersContext } from './providers.context';
import * as container from './index';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ProvidersContext.Provider
      value={{
        ...container,
      }}
    >
      {children}
    </ProvidersContext.Provider>
  );
};

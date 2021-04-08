import React from 'react';
import { container } from '.';
import { InversifyContext } from './inversify.context';

export const AppProvider: React.FC = ({ children }) => {
  return (
    <InversifyContext.Provider
      value={{
        container,
      }}
    >
      {children}
    </InversifyContext.Provider>
  );
};

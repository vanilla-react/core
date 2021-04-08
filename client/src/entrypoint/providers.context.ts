import React from 'react';
import { IProvidersContext } from '../types';

export const ProvidersContext = React.createContext<IProvidersContext>(
  undefined!,
);

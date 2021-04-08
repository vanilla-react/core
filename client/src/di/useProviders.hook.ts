import { useContext } from 'react';
import { InversifyContext } from './inversify.context';

export const useProviders = () => useContext(InversifyContext);

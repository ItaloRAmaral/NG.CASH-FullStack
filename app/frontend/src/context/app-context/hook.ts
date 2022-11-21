import { useContext } from 'react';
import { AppContext } from './index';

export const useAppContext = () => useContext(AppContext);
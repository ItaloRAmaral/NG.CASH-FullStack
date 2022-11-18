import { useContext } from 'react';
import { UserContext } from './index';

export const useUserContext = () => useContext(UserContext);
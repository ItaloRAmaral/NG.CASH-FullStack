import { createContext } from 'react';
import { IUserContext } from './user-interface';

export const UserContext = createContext<IUserContext>({} as IUserContext);

export default UserContext;
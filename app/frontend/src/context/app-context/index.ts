import { createContext } from 'react';
import { IAppContext } from './app-interface';

export const AppContext = createContext<IAppContext>({} as IAppContext);

export default AppContext;
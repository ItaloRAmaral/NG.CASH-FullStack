import { ReactNode } from "react";
import UserContext from "./index";

interface IProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: IProps) => {
  const teste = 'context'
  return (
      <UserContext.Provider value={{ teste }}>
        {children}
      </UserContext.Provider>
    );
};
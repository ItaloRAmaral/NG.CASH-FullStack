import { ReactNode, useState } from "react";
import UserContext from "./index";

interface IProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuLogin, setIsMenuLogin] = useState(false);

  const isLoadingHandler = () => {
    setIsLoading(!isLoading);
  };

  const isMenuLoginHandler = () => {
    setIsMenuLogin(!isMenuLogin);
  };

  const contextValue = {
    isLoading,
    setIsLoading,
    isLoadingHandler,
    isMenuLogin,
    setIsMenuLogin,
    isMenuLoginHandler,
  };
  return (
      <UserContext.Provider value={contextValue}>
        {children}
      </UserContext.Provider>
    );
};
export interface IUserContext {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  isLoadingHandler: () => void;
  isMenuLogin: boolean;
  setIsMenuLogin: (isLoginBtn: boolean) => void;
  isMenuLoginHandler: () => void;
}
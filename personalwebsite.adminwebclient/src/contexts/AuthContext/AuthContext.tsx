import { ReactNode, createContext, useState } from "react";
import { useCookies } from "react-cookie";

export interface IAuthContext {
  isLoggedIn: boolean;
  handleLogin: (token: string) => void;
  handleLogout: () => void;
  getCookie: () => string;
}

export const AuthContext = createContext<IAuthContext>(null!);

interface IAuthContextProvider {
  children: ReactNode;
}

function AuthContextProvider({ children }: IAuthContextProvider) {
  const cookieName: string = "token";
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  function handleLogin(token: string) {
    setCookie(cookieName, token);
    setIsLoggedIn(true);
  }

  function handleLogout() {
    removeCookie(cookieName);
    setIsLoggedIn(false);
  }

  function getCookie() {
    return cookies[cookieName];
  }

  const value: IAuthContext = {
    isLoggedIn: isLoggedIn,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getCookie: getCookie,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

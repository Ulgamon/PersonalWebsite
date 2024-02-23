import { AuthResponse } from "@/helpers/clients";
import { ReactNode, createContext, useState } from "react";
import { useCookies } from "react-cookie";

export interface IAuthContext {
  email: string;
  isLoggedIn: boolean;
  handleLogin: (authData: AuthResponse) => void;
  handleLogout: () => void;
  getCookie: () => string;
}

export const AuthContext = createContext<IAuthContext>(null!);

export interface IAuthContextProvider {
  children: ReactNode;
}

function AuthContextProvider({ children }: IAuthContextProvider) {
  const cookieName: string = "token";
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    cookies[cookieName] ? true : false
  );
  const [email, setEmail] = useState<string>("");

  function handleLogin(authData: AuthResponse) {
    setEmail(authData.email ? authData.email : "");
    setCookie(cookieName, authData.token);
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
    email: email,
    isLoggedIn: isLoggedIn,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getCookie: getCookie,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

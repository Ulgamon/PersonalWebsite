import { AuthResponse } from "@/helpers/clients";
import { ReactNode, createContext, useState } from "react";
import { useCookies } from "react-cookie";
import { useToast } from "@/components/ui/use-toast";

export interface IAuthContext {
  getEmail: () => string;
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
  const { toast } = useToast();
  const cookieName: string = "token";
  const emailString: string = "email";
  const [cookies, setCookie, removeCookie] = useCookies([cookieName]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    cookies[cookieName] ? true : false
  );

  function handleLogin(authData: AuthResponse) {
    setCookie(cookieName, authData.token);
    setCookie(emailString, authData.email);
    setIsLoggedIn(true);
    toast({
      description: "You logged in successfully!",
    });
  }

  function handleLogout() {
    removeCookie(emailString);
    removeCookie(cookieName);
    setIsLoggedIn(false);
    toast({
      variant: "destructive",
      description: "You logged out!",
    });
  }

  function getCookie() {
    return cookies[cookieName];
  }

  function getEmail() {
    return cookies[emailString];
  }

  const value: IAuthContext = {
    getEmail: getEmail,
    isLoggedIn: isLoggedIn,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    getCookie: getCookie,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

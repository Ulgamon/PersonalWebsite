import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useState } from "react";
import {
  AuthResponse,
  Client,
  LoginApplicationUserDto,
} from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";
import useInput, { IUseInput } from "@/hooks/useinput";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";

function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const loginClient = new Client(apiUrl);
  const { handleLogin } = useContext(AuthContext);
  const {
    enteredValue: password,
    blurInputHandler: blurPassword,
    changeInputHandler: changePassword,
    invalidInput: invalidPassword,
    reset: resetPassword,
    valueIsValid: passwordIsValid,
  }: IUseInput = useInput((val: string) => {
    return val.trim().length > 0;
  });

  const {
    enteredValue: email,
    blurInputHandler: blurEmail,
    changeInputHandler: changeEmail,
    invalidInput: invalidEmail,
    reset: resetEmail,
    valueIsValid: emailIsValid,
  }: IUseInput = useInput((val: string) => {
    return val.trim().length >= 3;
  });

  const errorClassName: string = " text-red-400 outline-red-400";
  const passwordError = "Password field is required.";
  const emailError = "email must be at least 3 characters long";

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!passwordIsValid || !emailIsValid) {
      blurPassword();
      blurEmail();
      return;
    }

    const payload: LoginApplicationUserDto = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      const response: AuthResponse = await loginClient.login(payload).then();
      handleLogin(response);
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }

    resetPassword();
    resetEmail();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Log in to your admin account here.</CardDescription>
        <form id="login" onSubmit={submitHandler}>
          <Label htmlFor="login text-red-400">{error}</Label>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                placeholder="@email"
                onBlur={blurEmail}
                value={email}
                onChange={changeEmail}
                autoComplete="email"
              />
              {invalidEmail ? (
                <Label htmlFor="email" className={errorClassName}>
                  {emailError}
                </Label>
              ) : (
                ""
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="@password"
                onBlur={blurPassword}
                value={password}
                onChange={changePassword}
                autoComplete="password"
              />
              {invalidPassword ? (
                <Label htmlFor="password" className={errorClassName}>
                  {passwordError}
                </Label>
              ) : (
                ""
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="disabled:opacity-75 hover:disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ReloadIcon className="animate-spin me-2" /> : <></>}{" "}
              Log In
            </Button>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
}

export default Login;

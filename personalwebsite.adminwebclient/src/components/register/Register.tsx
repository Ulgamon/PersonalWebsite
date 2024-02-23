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
import useInput, { IUseInput } from "@/hooks/useinput";
import { Client, CreateApplicationUserDto } from "@/helpers/clients";
import { useState } from "react";
import { useToast } from "../ui/use-toast";
import { ReloadIcon } from "@radix-ui/react-icons";
import { apiUrl } from "@/helpers/constants";

function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const [error, setError] = useState<string>("");
  const registerClient = new Client(apiUrl);
  const {
    enteredValue: password,
    blurInputHandler: blurPassword,
    changeInputHandler: changePassword,
    invalidInput: invalidPassword,
    reset: resetPassword,
    valueIsValid: passwordIsValid,
  }: IUseInput = useInput((val: string) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/.test(
      val
    );
  });

  const {
    enteredValue: email,
    blurInputHandler: blurEmail,
    changeInputHandler: changeEmail,
    invalidInput: invalidEmail,
    reset: resetEmail,
    valueIsValid: emailIsValid,
  }: IUseInput = useInput((val: string) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val);
  });

  const errorClassName: string = " text-red-400 outline-red-400";
  const emailError = "Invalid email address.";
  const passwordError =
    "Password must be at least 6 characters long, must have an uppercase letter, a number and special character.";

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!emailIsValid || !passwordIsValid) {
      blurEmail();
      blurPassword();
      return;
    }

    const payload: CreateApplicationUserDto = {
      email: email,
      password: password,
    };

    try {
      setIsLoading(true);
      await registerClient.register(payload).then();
      toast({
        description: "Now wait for Admin to validate your account.",
      });
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }

    resetEmail();
    resetPassword();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
        <CardDescription>Create your account here.</CardDescription>
        <Label htmlFor="login text-red-400">{error}</Label>
        <form id="register" onSubmit={submitHandler}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="email">email</Label>
              <Input
                id="email"
                placeholder="@email"
                onBlur={blurEmail}
                value={email}
                onChange={changeEmail}
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
              className="disabled:opacity-75 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <ReloadIcon className="animate-spin me-1" /> : <></>}{" "}
              Create Account
            </Button>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
}

export default Register;

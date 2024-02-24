import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { useContext } from "react";
import { IAuthContext, AuthContext } from "@/contexts/AuthContext/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Login from "../login/Login";
import Register from "../register/Register";
import { AvatarIcon } from "@radix-ui/react-icons";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function AuthorizeDialog() {
  const { isLoggedIn, email, handleLogout } =
    useContext<IAuthContext>(AuthContext);

  return (
    <Dialog>
      {isLoggedIn ? (
        <Alert className="rounded-none border-x-0">
          <AvatarIcon className="h-4 w-4" />
          <AlertTitle>Welcome! {email}</AlertTitle>
          <AlertDescription className="flex flex-col">
            Now you can change anything.{" "}
            <Button className="h-8 w-fit my-1" onClick={handleLogout} variant="secondary">
              Sign Out
            </Button>
          </AlertDescription>
        </Alert>
      ) : (
        <DialogTrigger asChild>
          <Button className="w-full h-12 rounded-none" variant="secondary">
            Log In
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-[450px]">
        <Tabs defaultValue="login" className="w-[400px] mx-0 mt-5">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Login />
          </TabsContent>
          <TabsContent value="register">
            <Register />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

export default AuthorizeDialog;

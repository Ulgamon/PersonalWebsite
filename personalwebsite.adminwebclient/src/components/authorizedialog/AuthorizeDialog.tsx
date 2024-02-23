import { Button } from "../ui/button";
import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { useContext } from "react";
import { IAuthContext, AuthContext } from "@/contexts/AuthContext/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Login from "../login/Login";
import Register from "../register/Register";

function AuthorizeDialog() {
  const { isLoggedIn } = useContext<IAuthContext>(AuthContext);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {isLoggedIn ? (
          ""
        ) : (
          <Button className="w-full my-3" variant="secondary">
            Log In
          </Button>
        )}
      </DialogTrigger>

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

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
// import { useState } from "react";
// import { Client } from "@/helpers/clients";
// import { apiUrl } from "@/helpers/constants";

function Login() {
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const loginClient = new Client(apiUrl);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Log In</CardTitle>
        <CardDescription>Log in to your admin account here.</CardDescription>
        <form>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="@username" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="@password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Log In</Button>
          </CardFooter>
        </form>
      </CardHeader>
    </Card>
  );
}

export default Login;

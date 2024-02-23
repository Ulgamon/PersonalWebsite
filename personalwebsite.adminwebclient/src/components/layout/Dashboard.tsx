import LeftPanel from "@/components/leftpanel/LeftPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { IAuthContext, AuthContext } from "@/contexts/AuthContext/AuthContext";
import { Button } from "../ui/button";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";

function Dashboard() {
  const { isLoggedIn } = useContext<IAuthContext>(AuthContext);
  return (
    <ResizablePanelGroup className="w-full min-h-screen" direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <Dialog>
          <DialogTrigger asChild>
            {isLoggedIn ? "" : <Button className="w-full my-3" variant="secondary">Log In</Button>}
          </DialogTrigger>

          <DialogContent className="w-64 h-40 bg-black fixed">
            <p>HAHAHAH</p>
          </DialogContent>
        </Dialog>
        <LeftPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <Outlet />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Dashboard;

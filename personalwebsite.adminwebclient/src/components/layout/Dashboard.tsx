import LeftPanel from "@/components/leftpanel/LeftPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Outlet } from "react-router-dom";

function Dashboard() {
  return (
    <ResizablePanelGroup className="w-full min-h-screen" direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <LeftPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}><Outlet /></ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Dashboard;

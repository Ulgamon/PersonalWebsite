import LeftPanel from "@/layout/LeftPanel";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

function Dashboard() {
  return (
    <ResizablePanelGroup className="w-full min-h-screen" direction="horizontal">
      <ResizablePanel defaultSize={20}>
        <LeftPanel />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>Two</ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default Dashboard;

import { Button } from "@/components/ui/button.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen w-full flex justify-center items-center">
      <Card className="w-fit bg-stone-100 dark:bg-slate-900">
        <CardHeader>
          <CardTitle className="text-6xl text-center">404</CardTitle>
        </CardHeader>
        <CardContent>
          <Label className="text-red-500 text-4xl mx-auto block">
            <IoWarningOutline className="inline text-4xl mb-1.5 me-1" />
            Page Not Found
          </Label>
          <Button className="mx-auto px-0 w-full" variant="link">
            <Link to={"/"}>Go Back To Home Page</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CreateBlogPost() {
  return (
    <main className="bg-gray-200 w-full min-h-screen flex justify-center items-center">
      <Card className="rounded-none">
        <CardHeader>
          <CardTitle>Create Blog Post</CardTitle>
          <CardDescription>
            Blog post will be created with default template.
          </CardDescription>
        </CardHeader>

        <CardFooter>
          <Button className="ms-auto">Continue</Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default CreateBlogPost;

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateBlogPostDto } from "@/helpers/clients";

function CreateBlogPost() {
  const defaultBlogPost: CreateBlogPostDto = {
    blogMdText: "# This is your starting template",
    imgUrl: "You should put image url here.",
    title: "Hello World!",
  };

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


  }

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
          <form id="createblogpost" onSubmit={submitHandler}>
            <Button type="submit" className="ms-auto">
              Continue
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}

export default CreateBlogPost;

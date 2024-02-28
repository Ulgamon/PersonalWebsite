import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Client, CreateBlogPostDto, IClient } from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";
import { useState } from "react";
import { redirect } from "react-router-dom";

function CreateBlogPost() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const defaultBlogPost: CreateBlogPostDto = {
      blogMdText: "# This is your starting template",
      imgUrl: "You should put image url here.",
      title: "Hello World!",
    };

    const client: IClient = new Client(apiUrl);
    try {
      setIsLoading(true);
      const response = await client.blogPostsPOST(defaultBlogPost);
      // This needs to be either tested or tried out
      redirect(`/updateblogpost/${response}`);
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
    } finally {
      setIsLoading(false);
    }
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

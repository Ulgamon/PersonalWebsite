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
import { ReloadIcon } from "@radix-ui/react-icons";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";

function CreateBlogPost() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { toast } = useToast();
  const { getCookie } = useContext(AuthContext);
  const navigate = useNavigate();

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const defaultBlogPost: CreateBlogPostDto = {
      blogMdText: "# This is your starting template",
      imgUrl: "You should put image url here.",
      title: "Hello World!",
      categories: [],
    };

    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers = {} as { [key: string]: string };
        init.headers["Authorization"] = `Bearer ${accessToken}`;

        return fetch(url, init);
      },
    });
    try {
      setIsLoading(true);
      const response = await client.blogPostsPOST(defaultBlogPost);
      // This needs to be either tested or tried out
      navigate(`/updateblogpost/${response}`);
    } catch (e: unknown) {
      if (typeof e === "string") {
        setError(e);
      } else if (e instanceof Error) {
        setError(e.message);
      }
      toast({
        variant: "destructive",
        title: "Something went wrong!",
        description: error,
      });
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
            <Button
              type="submit"
              disabled={isLoading}
              className="ms-auto disabled:opacity-75 hover:disabled:cursor-not-allowed"
            >
              {isLoading ? <ReloadIcon className="animate-spin me-2" /> : <></>}{" "}
              Continue
            </Button>
          </form>
        </CardFooter>
      </Card>
    </main>
  );
}

export default CreateBlogPost;

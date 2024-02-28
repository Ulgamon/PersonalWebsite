import MdxComponent from "@/components/mdxcomponent/MdxComponent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { Client, IClient, UpdateBlogPostDto } from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";
import { Pencil2Icon, ReloadIcon } from "@radix-ui/react-icons";
import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

function UpdateBlogPost() {
  const [blogPostDto, setBlogPostDto] = useState<UpdateBlogPostDto>({
    blogMdText: "",
    id: 0,
    imgUrl: "",
    title: "",
    categories: [],
    published: false,
  });
  const { blogId } = useParams();
  // isLoading is for initial load that loads blog post data
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // isSaving is for saving the data
  const [isSaving, setIsSaving] = useState<boolean>(false);
  // isPublishing
  const [isPublishing, setIsPublishing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { getCookie } = useContext(AuthContext);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchBlog(blogId: number) {
      const client: IClient = new Client(apiUrl, {
        async fetch(url: RequestInfo, init: RequestInit) {
          const accessToken = getCookie();
          init.headers["Authorization"] = `Bearer ${accessToken}`;

          return fetch(url, init);
        },
      });
      try {
        setIsLoading(true);
        const response = await client.blogPostsGET2(blogId);
        const updateDto: UpdateBlogPostDto = {
          blogMdText: response.blogMdText || "",
          id: response.id || 0,
          imgUrl: response.imgUrl || "",
          title: response.title || "",
          categories: response.categories,
          published: response.published,
        };
        setBlogPostDto(updateDto);
        // This needs to be either tested or tried out
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
    if (blogId) {
      fetchBlog(parseInt(blogId));
    }
  }, []);

  const saveHandler = useCallback(async () => {
    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers["Authorization"] = `Bearer ${accessToken}`;

        return fetch(url, init);
      },
    });
    const id: number = parseInt(blogId ? blogId : "0");
    try {
      setIsSaving(true);
      await client.blogPostsPUT(id, blogPostDto);
      toast({ title: "Successful!", description: "Blog post is saved!" });
      // This needs to be either tested or tried out
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
      setIsSaving(false);
    }
  }, [blogPostDto, setIsSaving, getCookie, blogId, error, toast]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "s" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        saveHandler();
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [saveHandler]);

  async function submitSaveHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveHandler();
  }

  async function submitPublishHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function setMarkdownBlogPost(markdown: string) {
    setBlogPostDto((prevState) => ({ ...prevState, blogMdText: markdown }));
  }

  return (
    <main className="bg-gray-200 min-h-screen">
      {isLoading ? (
        <ReloadIcon className="animate-spin h-10 w-10 mx-auto" />
      ) : (
        <>
          <MdxComponent
            setParentValue={setMarkdownBlogPost}
            defaultValue={blogPostDto.blogMdText}
          />
          <Alert className="w-1/2 mx-auto mt-5">
            <Pencil2Icon className="w-4 h-4" />
            <AlertTitle>Tip</AlertTitle>
            <AlertDescription>
              Press <strong>Ctrl + S</strong> to save the document any time you
              want.
            </AlertDescription>
          </Alert>

          <div className="flex justify-end p-5">
            <form name="saveblogpost" onSubmit={submitSaveHandler}>
              <Button
                disabled={isSaving}
                type="submit"
                variant="outline"
                className="m-1 disabled:opacity-75 disabled:hover:cursor-not-allowed"
              >
                {isSaving ? (
                  <>
                    <ReloadIcon className="animate-spin h-4 w-4 me-2" />
                    Saving...
                  </>
                ) : (
                  "Save"
                )}
              </Button>
            </form>
            <Dialog>
              <DialogTrigger>
                <Button className="m-1">Publish</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  Are you absolutely sure you want to publish?
                </DialogHeader>
                <DialogDescription>
                  This will publish your blog post look at it again you might
                  find another mistake.
                </DialogDescription>
                <DialogFooter className="flex justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                  <Button type="button">Publish</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}
    </main>
  );
}

export default UpdateBlogPost;

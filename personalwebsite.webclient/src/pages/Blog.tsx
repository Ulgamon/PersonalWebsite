import AppOutlet from "@/components/app-outlet/AppOutlet.tsx";
import Search from "@/components/search/Search.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.tsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Skeleton } from "@/components/ui/skeleton.tsx";
import { Client, IClient, ReturnBlogPostDto } from "@/helpers/clients.ts";
import { apiUrl, returnDateTime } from "@/helpers/constants.ts";
import { lazy, Suspense, useEffect, useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
const BlogComments = lazy(
  () => import("@/components/blog-comments/BlogComments.tsx")
);
import { PrismAsyncLight as ReactSyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "@/context/theme-provider.tsx";
import { Button } from "@/components/ui/button.tsx";
import { FaRegCopy } from "react-icons/fa";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCheck } from "react-icons/fa6";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.tsx";
import { Input } from "@/components/ui/input.tsx";

const Blog = () => {
  const [data, setData] = useState<ReturnBlogPostDto>({
    blogMdText: "",
    categories: [],
    createdDate: "",
    id: 0,
    imgUrl: "",
    published: true,
    publishedDate: "",
    title: "",
    updatedDate: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { blogId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      try {
        setIsLoading(true);
        const response = await client.blogPostsGET4(parseInt(blogId || ""));
        setData(response);
      } catch (e: unknown) {
        if (typeof e === "string") {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [blogId]);

  if (error.length > 0) {
    return (
      <Label className="text-red-400 mx-auto mt-3 block">
        <IoWarningOutline className="inline text-2xl mb-1.5 me-1" />
        Something went wrong! Please try again.
      </Label>
    );
  }

  return (
    <AppOutlet>
      <div className="w-full mx-auto relative z-0">
        <div
          style={{
            backgroundImage: `url("${data.imgUrl}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="w-full flex justify-center items-end mx-auto h-[calc(100vh-4rem)] text-black text-4xl m-0 dark:text-white"
        >
          <div className="w-full text-white mx-auto">
            <div className="w-fit mx-auto">
              <Card className="rounded-xl border-b-0 shadow-none rounded-b-none pb-10 pt-5 px-5">
                <CardHeader className="py-3">
                  <CardTitle>
                    <h1 className="font-bold text-themeOrange dark:text-themeBlue text-3xl mt-2 md:text-6xl">
                      {data.title}
                    </h1>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Breadcrumb className="text-xl font-semibold mx-1">
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink className="text-lg">
                          <Link to="/">Home</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-lg" />
                      <BreadcrumbItem className="text-lg">
                        <BreadcrumbLink>
                          <Link to="/blog">Blog</Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator className="text-lg" />
                      <BreadcrumbItem className="text-lg">
                        <BreadcrumbLink>{data.id}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div className="max-w-[1000px] mx-auto px-1 min-h-screen">
          {isLoading ? (
            <BlogDataSkeleton />
          ) : (
            <BlogData
              blogMdText={data.blogMdText || ""}
              categories={data.categories}
              publishedDate={data.publishedDate || ""}
            />
          )}
          <Suspense>
            <BlogComments blogId={parseInt(blogId || "")} />
          </Suspense>
        </div>
      </div>
    </AppOutlet>
  );
};

export default Blog;

const BlogData = ({
  blogMdText,
  categories,
  publishedDate,
}: ReturnBlogPostDto) => {
  const { theme } = useTheme();
  return (
    <div className="">
      <aside className="mt-10">
        <Search />
      </aside>
      <section>
        <ul className="flex mt-5">
          {categories?.map((el) => (
            <li className="me-0.5" key={el.id}>
              <Badge variant="secondary">{el.categoryName}</Badge>
            </li>
          ))}
        </ul>
        <ShareLink />
        <div>
          <p className="opacity-75 mb-10 text-sm">
            <CiCalendarDate className="inline mb-1 me-1" />
            {returnDateTime(publishedDate)}
          </p>
        </div>
        <div>
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={{
              code(props) {
                const { children, className, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <>
                    <CopyButton text={children} />
                    <ReactSyntaxHighlighter
                      PreTag="div"
                      children={String(children).replace(/\n$/, "")}
                      language={match[1]}
                      className="rounded-md text-xs md:text-base"
                      style={theme === "light" ? coldarkCold : coldarkDark}
                    />
                  </>
                ) : (
                  <code {...rest} className={className}>
                    {children}
                  </code>
                );
              },
            }}
            className="prose w-full dark:prose-invert max-w-none"
          >
            {blogMdText}
          </Markdown>
        </div>
      </section>
    </div>
  );
};

const BlogDataSkeleton = () => {
  return (
    <Card className="my-20">
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-10 w-full rounded-lg mt-5 mb-10" />
        </CardTitle>
        <CardContent>
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
          <Skeleton className="h-4 w-full rounded-lg my-2" />
        </CardContent>
      </CardHeader>
    </Card>
  );
};

interface ICopyButton {
  text: React.ReactNode;
}
const CopyButton = ({ text }: ICopyButton) => {
  const [copied, setCopied] = useState<boolean>(false);

  const toggleCopied = () => {
    if (copied === false) {
      setCopied(true);
    }
  };

  useEffect(() => {
    let toggle: NodeJS.Timeout;
    if (copied === true) {
      toggle = setTimeout(() => setCopied(false), 3000);
    } else {
      toggle = setTimeout(() => {}, 3000);
    }
    return () => {
      clearTimeout(toggle);
    };
  }, [copied]);

  return (
    <CopyToClipboard text={text?.toString() || ""} onCopy={toggleCopied}>
      <Button
        variant="ghost"
        // onClick={toggleCopied}
        className="font-semibold flex ms-auto font-mono"
      >
        {copied ? (
          <>
            <FaCheck className="text-base me-1" />
            Copied
          </>
        ) : (
          <>
            <FaRegCopy className="text-base me-1" />
            Copy
          </>
        )}
      </Button>
    </CopyToClipboard>
  );
};

const ShareLink = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const toggleCopied = () => {
    if (copied === false) {
      setCopied(true);
    }
  };

  useEffect(() => {
    let toggle: NodeJS.Timeout;
    if (copied === true) {
      toggle = setTimeout(() => setCopied(false), 3000);
    } else {
      toggle = setTimeout(() => {}, 3000);
    }
    return () => {
      clearTimeout(toggle);
    };
  }, [copied]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="my-3">
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={window.location.href} readOnly />
          </div>
          <CopyToClipboard text={window.location.href} onCopy={toggleCopied}>
            <Button type="submit" size="sm" className="px-3">
              <span className="sr-only">Copy</span>
              {copied ? (
                <FaCheck className="h-4 w-4" />
              ) : (
                <FaRegCopy className="h-4 w-4" />
              )}
            </Button>
          </CopyToClipboard>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

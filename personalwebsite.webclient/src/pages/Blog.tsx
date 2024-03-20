import AppOutlet from "@/components/app-outlet/AppOutlet";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Client, IClient, ReturnBlogPostDto } from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";

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
        console.log(response);
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
      <div className="w-full mx-auto relative -top-16 z-0">
        <div
          style={{
            backgroundImage: `url("${data.imgUrl}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
          className="w-full flex justify-center transition will-change-transform items-end mx-auto h-screen object-cover text-black text-4xl m-0 dark:text-white"
        >
          <div className="w-fit mx-auto mb-24">
            <h1 className="font-bold text-7xl">Blog Posts</h1>
            <Breadcrumb className="text-xl font-semibold mx-1 my-2">
              <BreadcrumbList>
                <BreadcrumbItem className="text-lg">
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-lg" />
                <BreadcrumbItem className="text-lg">
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem className="text-lg">
                  <BreadcrumbLink>{data.id}</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="max-w-[1000px] mx-auto min-h-screen">
          <div className="grid">
            <section>{isLoading ? <BlogDataSkeleton /> : <></>}</section>
            <aside></aside>
          </div>
        </div>
      </div>
    </AppOutlet>
  );
};

export default Blog;

const BlogDataSkeleton = () => {
  return (
    <Card>
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

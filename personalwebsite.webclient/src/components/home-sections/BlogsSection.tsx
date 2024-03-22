import { Element } from "react-scroll";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import {
  Client,
  IClient,
  PaginateBlogPostsDto,
  ReturnBlogPostsDto,
} from "@/helpers/clients";
import { apiUrl, returnDateTime } from "@/helpers/constants";
import { Skeleton } from "../ui/skeleton";
import { Label } from "@radix-ui/react-label";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
const BlogsSection = () => {
  return (
    <Element className="max-w-screen-customMaxWidth mx-auto w-full" name="blogs">
      <section id="blogs" className="my-10 mb-16">
        <h3 className="text-5xl font-bold text-center">My Blog</h3>
        <p className="text-center text-lg my-5">Most recent blog posts.</p>
        <BlogsList />
        <Button className="mx-auto my-5 block">
          <Link to={"/blog"}>See More</Link>
        </Button>
      </section>
    </Element>
  );
};

export default BlogsSection;

const BlogsList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<PaginateBlogPostsDto>({
    blogPostsDtos: [],
    currentPage: 0,
    hasNext: false,
    hasPrev: false,
    numberOfElements: 0,
  });
  const [error, setError] = useState<string>("");

  // hook for fetching data
  useEffect(() => {
    const fetchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      try {
        setIsLoading(true);
        const response = await client.blogPostsGET3(3, 1);
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
  }, []);

  if (error.length > 0) {
    return (
      <Label className="text-red-400 mx-auto mt-3 block">
        <IoWarningOutline className="inline text-2xl mb-1.5 me-1" />
        Something went wrong! Please try again.
      </Label>
    );
  }

  return (
    <ul className="grid md:grid-cols-3 gap-5 mx-1 md:mx-16">
      {isLoading ? (
        <>
          <BlogsSkeleton />
          <BlogsSkeleton />
          <BlogsSkeleton />
        </>
      ) : (
        data.blogPostsDtos?.map((el) => (
          <li key={el.id}>
            <BlogsCard data={el} />
          </li>
        ))
      )}
    </ul>
  );
};

interface BlogsCardProps {
  data: ReturnBlogPostsDto;
}
const BlogsCard = ({ data }: BlogsCardProps) => {
  return (
    <Link to={"/blog/" + data.id}>
      <Card className="overflow-clip h-full">
        <img
          src={data.imgUrl}
          className="w-full aspect-square object-contain"
        />
        <CardHeader>
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">{data.blogMdText?.slice(0, 100)}...</p>
        </CardContent>
        <CardFooter>
          <p className="opacity-50 ms-auto text-sm">
            {returnDateTime(data.publishedDate)}
          </p>
        </CardFooter>
      </Card>
    </Link>
  );
};

const BlogsSkeleton = () => {
  return (
    <Card className="overflow-clip h-full">
      <Skeleton className="w-full aspect-square" />

      <CardHeader>
        <CardTitle>
          <Skeleton className="text-lg w-full h-6 rounded-lg" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="text-lg w-full h-12 rounded-lg" />
      </CardContent>
      <CardFooter>
        {" "}
        <Skeleton className="text-lg w-full h-6 rounded-lg" />
      </CardFooter>
    </Card>
  );
};

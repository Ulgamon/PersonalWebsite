import { Element } from "react-scroll";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { useEffect, useState } from "react";
import {
  Client,
  IClient,
  PaginateBlogPostsDto,
  ReturnBlogPostsDto,
} from "@/helpers/clients.ts";
import { apiUrl, returnDateTime } from "@/helpers/constants.ts";
import { Skeleton } from "../ui/skeleton.tsx";
import { Label } from "../ui/label.tsx";
import { IoWarningOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { Button } from "../ui/button.tsx";
import { animated } from "@react-spring/web";
import useImageScale from "@/hooks/useImageScale.tsx";
import Markdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
const BlogsSection = () => {
  return (
    <Element
      className="max-w-screen-customMaxWidth mx-auto w-full"
      name="blogs"
    >
      <section id="blogs" className="my-10 mb-16">
        <h3 className="text-3xl sm:text-5xl font-bold text-center">My Blog</h3>
        <p className="text-center my-5">Most recent blog posts.</p>
        <BlogsList />
        <Link to={"/blog"}>
          <Button className="mx-auto my-5 block">More Posts</Button>
        </Link>
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
    <ul className="grid md:grid-cols-3 gap-2 mx-1 md:mx-16">
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
  const { scale, handleMouseEnter, handleMouseLeave } = useImageScale();

  return (
    <Link
      to={"/blog/" + data.id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="overflow-clip h-full">
        <div className="overflow-clip">
          <animated.div className="aspect-video" style={{ scale: scale }}>
            <img
              src={data.imgUrl}
              className="w-full aspect-video object-cover"
              alt="blog post background image"
            />
          </animated.div>
        </div>
        <CardHeader>
          <CardTitle className="text-lg">{data.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Markdown
            className="text-sm"
            disallowedElements={["img", "a", "code"]}
            rehypePlugins={[rehypeRaw]}
            remarkPlugins={[remarkGfm]}
          >
            {data.blogMdText?.slice(0, 100) + "..."}
          </Markdown>
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
      <Skeleton className="w-full aspect-video" />

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

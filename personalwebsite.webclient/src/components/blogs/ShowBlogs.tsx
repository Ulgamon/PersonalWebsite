import {
  Client,
  IClient,
  PaginateBlogPostsDto,
  ReturnBlogPostsDto,
} from "@/helpers/clients";
import { apiUrl, returnDateTime } from "@/helpers/constants";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../ui/pagination";
import { Label } from "../ui/label";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../ui/button";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Search from "../search/Search";
import Categories from "./Categories";
import { CiCalendarDate } from "react-icons/ci";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

const ShowBlogs = () => {
  const [data, setData] = useState<PaginateBlogPostsDto>({
    blogPostsDtos: [],
    currentPage: 0,
    hasNext: false,
    hasPrev: false,
    numberOfElements: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      try {
        setIsLoading(true);
        const response = await client.blogPostsGET3(10, page);
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
  }, [page]);

  const addToPage = (num: number) => {
    setPage((prevState) => prevState + num);
  };

  if (error.length > 0) {
    return (
      <Label className="text-red-400 mx-auto mt-3 block">
        <IoWarningOutline className="inline text-2xl mb-1.5 me-1" />
        Something went wrong! Please try again.
      </Label>
    );
  }

  return (
    <div className="w-full my-16 mx-auto grid gap-x-10 lg:grid-cols-3">
      <ul className="grid order-last lg:order-first w-full gap-3 col-span-2">
        {isLoading ? (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        ) : (
          data.blogPostsDtos?.map((el) => (
            <li key={el.id}>
              <BlogCard
                blogMdText={el.blogMdText}
                id={el.id}
                imgUrl={el.imgUrl}
                publishedDate={el.publishedDate}
                title={el.title}
              />
            </li>
          ))
        )}
        <Pagination className="my-10">
          <PaginationContent>
            <PaginationItem className="flex">
              <Button
                onClick={() => addToPage(-1)}
                disabled={data.hasPrev === true ? false : true}
                variant="ghost"
                className="disabled:opacity-40"
              >
                <SlArrowLeft className="p-0 me-1 text-sm" />
                Previous
              </Button>
            </PaginationItem>
            {data.hasPrev && (
              <PaginationItem>
                <Button onClick={() => addToPage(-1)} variant="ghost">
                  {page - 1}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <Button variant="outline">{page}</Button>
            </PaginationItem>
            {data.hasNext && (
              <PaginationItem>
                <Button onClick={() => addToPage(1)} variant="ghost">
                  {page + 1}
                </Button>
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <Button
                onClick={() => addToPage(1)}
                disabled={data.hasNext === true ? false : true}
                variant="ghost"
                className="disabled:opacity-40"
              >
                Next
                <SlArrowRight className="p-0 ms-1 text-sm" />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </ul>
      <div className="col-span-2 lg:col-span-1 w-full">
        <Search />
        <Categories />
      </div>
    </div>
  );
};

export default ShowBlogs;

const BlogCard = ({
  blogMdText,
  id,
  imgUrl,
  publishedDate,
  title,
}: ReturnBlogPostsDto) => {
  return (
    <Link to={"/blog/" + id}>
      <Card className="overflow-clip mx-1">
        <div className="flex flex-col md:flex-row">
          <img
            className="w-full aspect-video md:aspect-[4/3] md:w-1/3 md:max-w-[300px] object-cover"
            src={imgUrl}
            alt={title}
          />
          <div className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {blogMdText?.slice(0, 200) + "..."}
              </Markdown>
            </CardContent>
            <CardFooter>
              <p className="opacity-50 text-sm">
                <CiCalendarDate className="inline mb-1 me-1" />
                {returnDateTime(publishedDate)}
              </p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const BlogCardSkeleton = () => {
  return (
    <Card className="w-full max-w-[800px] mx-auto">
      <div className="flex">
        <Skeleton className="w-1/3 h-max" />
        <div className="w-full">
          <CardHeader>
            <Skeleton className="w-full rounded-lg h-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full my-4 rounded-lg h-4" />
            <Skeleton className="w-full rounded-lg h-4" />
          </CardContent>
          <CardFooter>
            <Skeleton className="w-full rounded-lg h-4" />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

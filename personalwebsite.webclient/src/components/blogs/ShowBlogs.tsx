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
  }, []);

  return (
    <div className="w-full my-16 mx-auto">
      <ul className="grid w-full gap-3">
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
      </ul>
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
      <Card className="overflow-clip max-w-[800px] mx-auto">
        <div className="flex">
          <img className="w-1/3 max-w-[300px] object-cover" src={imgUrl} alt={title} />
          <div className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{blogMdText?.slice(0, 200)}</p>
            </CardContent>
            <CardFooter>
              <p className="opacity-50 text-sm">{returnDateTime(publishedDate)}</p>
            </CardFooter>
          </div>
        </div>
      </Card>
    </Link>
  );
};

const BlogCardSkeleton = () => {
  return (
    <Card>
      <div className="flex">
        <Skeleton className="w-1/3 h-full" />
        <div className="w-full">
          <CardHeader>
            <Skeleton className="w-full rounded-lg h-6" />
          </CardHeader>
          <CardContent>
            <Skeleton className="w-full rounded-lg h-6" />
            <Skeleton className="w-full rounded-lg h-6" />
          </CardContent>
          <CardFooter>
            <Skeleton className="w-full rounded-lg h-6" />
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

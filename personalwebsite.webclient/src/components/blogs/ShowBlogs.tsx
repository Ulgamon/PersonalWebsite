import {
  Client,
  GetSearchDto,
  IClient,
  PaginateBlogPostsDto,
  PaginateCategoriesDto,
  ReturnBlogPostsDto,
  ReturnCategoriesDto,
} from "@/helpers/clients.ts";
import { apiUrl, returnDateTime } from "@/helpers/constants.ts";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card.tsx";
import { Link } from "react-router-dom";
import { Skeleton } from "../ui/skeleton.tsx";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
} from "../ui/pagination.tsx";
import { Label } from "../ui/label.tsx";
import { IoWarningOutline } from "react-icons/io5";
import { Button } from "../ui/button.tsx";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import Search from "../search/Search.tsx";
import { CiCalendarDate } from "react-icons/ci";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import useImageScale from "@/hooks/useImageScale.tsx";
import { animated } from "@react-spring/web";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group.tsx";

const ShowBlogs = () => {
  const [data, setData] = useState<PaginateBlogPostsDto>({
    blogPostsDtos: [],
    currentPage: 0,
    hasNext: false,
    hasPrev: false,
    numberOfElements: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoading2, setIsLoading2] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [fetchedCategories, setFetchedCategories] =
    useState<PaginateCategoriesDto>({
      categories: [],
      currentPage: 0,
      hasNext: false,
      hasPrev: false,
    });
  const [categories, setCategories] = useState<ReturnCategoriesDto[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      const searchDto: GetSearchDto = {
        categories: categories,
      };
      try {
        setIsLoading(true);
        const response = await client.search(page, 10, searchDto);
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
  }, [page, categories]);

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      try {
        setIsLoading2(true);
        const response = await client.categoriesGET(20, 1);
        setFetchedCategories(response);
      } catch (e: unknown) {
        if (typeof e === "string") {
          setError(e);
        } else if (e instanceof Error) {
          setError(e.message);
        }
      } finally {
        setIsLoading2(false);
      }
    };
    fetchData();
  }, []);

  const addToPage = (num: number) => {
    setPage((prevState) => prevState + num);
  };

  const clickOnToggleGroup = (id: number) => {
    if (categories.filter((el) => el.id === id).length > 0) {
      setCategories((pr) => pr.filter((el) => el.id !== id));
    } else {
      setCategories((pr) => [
        ...pr,
        { id: id, categoryName: "S", description: "S" },
      ]);
    }
    setPage(1);
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
    <div className="w-full my-16 mx-auto grid gap-x-10 lg:grid-cols-3 items-start">
      <ul className="grid order-last lg:order-first w-full gap-3 col-span-2">
        {isLoading ? (
          <>
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </>
        ) : (data.blogPostsDtos?.length || 0) > 0 ? (
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
        ) : (
          <Label className="text-red-400 mx-auto mt-3 block">
            <IoWarningOutline className="inline text-2xl mb-1.5 me-1" />
            Couldn't find results for your search.
          </Label>
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
      <div className="col-span-2 lg:col-span-1 w-full lg:sticky lg:top-20 lg:mb-32">
        <Search />
        {isLoading2 ? (
          <CategoriesSkeleton />
        ) : (
          <div className="w-full">
            <h4 className="text-center my-5 text-2xl font-semibold">
              Categories
            </h4>
            <ToggleGroup
              type="multiple"
              className="flex flex-col my-2 ms-1 items-start"
            >
              {fetchedCategories.categories &&
                fetchedCategories.categories.map((el) => (
                  <ToggleGroupItem
                    onClick={() => clickOnToggleGroup(el.id || 0)}
                    key={el.id}
                    value={el.id?.toString() || ""}
                    variant="outline"
                  >
                    {el.categoryName} ({el.numberOfBlogPosts})
                  </ToggleGroupItem>
                ))}
            </ToggleGroup>
          </div>
        )}
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
  const { scale, handleMouseEnter, handleMouseLeave } = useImageScale();

  return (
    <Link to={"/blog/" + id}>
      <Card
        className="overflow-clip mx-1"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex justify-stretch items-stretch flex-col md:flex-row">
          <div className="overflow-clip w-full md:w-2/3 flex items-stretch">
            <animated.div style={{ scale: scale }}>
              <img
                className="w-full h-full aspect-video md:aspect-[4/3] object-cover"
                src={imgUrl}
                alt="blog background image"
              />
            </animated.div>
          </div>
          <div className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">{title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm w-52 sm:w-full">
              <Markdown
                className="w-full"
                disallowedElements={["img", "a", "code"]}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
              >
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

const CategoriesSkeleton = () => {
  return (
    <div>
      <Skeleton className="w-24 h-8 m-1" />
      <Skeleton className="w-24 h-8 m-1" />
      <Skeleton className="w-24 h-8 m-1" />
      <Skeleton className="w-24 h-8 m-1" />
    </div>
  );
};

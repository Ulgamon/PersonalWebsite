import { Client, IClient, PaginateCategoriesDto } from "@/helpers/clients";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { IoWarningOutline } from "react-icons/io5";
import { Skeleton } from "../ui/skeleton";
import { apiUrl } from "@/helpers/constants";
import { Button } from "../ui/button";

const Categories = () => {
  const [data, setData] = useState<PaginateCategoriesDto>({
    categories: [],
    currentPage: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      try {
        setIsLoading(true);
        const response = await client.categoriesGET(10, 1);
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
    <div className="w-full mx-5 my-5">
      <h5 className="text-xl font-semibold">Categories</h5>
      <ul className="my-3">
        {isLoading ? (
          <>
            <Skeleton className="w-full h-4 rounded-lg my-4" />
            <Skeleton className="w-full h-4 rounded-lg my-4" />
            <Skeleton className="w-full h-4 rounded-lg my-4" />
          </>
        ) : (
          data.categories?.map((el) => (
            <li className="" key={el.id}>
              <Button variant="link">
                {el.categoryName}({el.numberOfBlogPosts})
              </Button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Categories;

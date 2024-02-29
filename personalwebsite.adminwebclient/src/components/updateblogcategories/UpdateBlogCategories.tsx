import {
  Client,
  IClient,
  PaginateCategoriesDto,
  ReturnCategoryDto,
} from "@/helpers/clients";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { useToast } from "../ui/use-toast";
import { apiUrl } from "@/helpers/constants";
import { ReloadIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Checkbox } from "../ui/checkbox";

interface IUpdateBlogCategories {
  setCategories: (categories: ReturnCategoryDto[]) => void;
  categories: ReturnCategoryDto[];
}

function UpdateBlogCategories({
  setCategories,
  categories,
}: IUpdateBlogCategories) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getCookie } = useContext(AuthContext);
  const [size, setSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [tempCategories, setTempCategories] =
    useState<ReturnCategoryDto[]>(categories);
  const { toast } = useToast();

  const [paginatedCategories, setPaginatedCategories] =
    useState<PaginateCategoriesDto>({
      categories: [],
      currentPage: 0,
      hasPrev: false,
      hasNext: false,
    });

  useEffect(() => {
    setCategories([...tempCategories]);
  }, [setCategories, tempCategories]);

  useEffect(() => {
    async function fetchBlogs() {
      const client: IClient = new Client(apiUrl, {
        async fetch(url: RequestInfo, init: RequestInit) {
          const accessToken = getCookie();
          init.headers["Authorization"] = `Bearer ${accessToken}`;

          return fetch(url, init);
        },
      });
      try {
        setIsLoading(true);
        const response = await client.categoriesGET(size, page);
        // This needs to be either tested or tried out
        setPaginatedCategories(response);
      } catch (e: unknown) {
        let error: string = "";
        if (typeof e === "string") {
          error = e;
        } else if (e instanceof Error) {
          error = e.message;
        }
        toast({
          variant: "destructive",
          title: "Couldn't fetch categories.",
          description: error,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, [size, page]);

  function selectChangeHandler(value: string) {
    setSize(parseInt(value));
  }

  function goToPage(num: number) {
    setPage(num);
  }

  const checkBoxHandler = (
    checked: string | boolean,
    category: ReturnCategoryDto
  ) => {
    if (!checked) {
      setTempCategories((prevState) =>
        prevState.filter((el) => el.id !== category.id)
      );
    } else {
      setTempCategories((prevState) => [...prevState, category]);
    }
  };

  return (
    <main className="min-h-screenw-full mt-5 bg-white">
      {isLoading ? (
        <ReloadIcon className="animate-spin h-4 w-4 mx-auto py-2" />
      ) : (
        <></>
      )}
      <Table className="grid">
        <TableCaption className="flex justify-center">
          <p className="m-2">
            This is a list of most recent Blog Posts. Page: {page} with Size:{" "}
            {size}
          </p>
          <Select onValueChange={selectChangeHandler}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder={size} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Checked</TableHead>
            <TableHead className="w-[10%]">Id</TableHead>
            <TableHead className="w-[10%]">Name</TableHead>
            <TableHead className="w-[10%]">Description</TableHead>
            <TableHead className="w-[10%]">Posts</TableHead>
          </TableRow>
          <TableBody>
            {paginatedCategories.categories?.map((el) => (
              <TableRow key={el.id} className="max-h-10">
                <TableCell className="w-[10%]">
                  <Checkbox
                    checked={
                      tempCategories.filter((e) => e.id === el.id).length > 0
                    }
                    onCheckedChange={(checked: string | boolean) =>
                      checkBoxHandler(checked, el)
                    }
                  />
                </TableCell>
                <TableCell className="w-[10%]">{el.id}</TableCell>
                <TableCell className="w-[10%]">{el.categoryName}</TableCell>
                <TableCell className="text-ellipsis overflow-hidden w-[10%]">
                  {el.description}
                </TableCell>
                <TableCell className="w-[10%]">
                  {el.numberOfBlogPosts}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHeader>
      </Table>
      <Pagination className="my-10">
        <PaginationContent>
          <PaginationItem>
            <Button variant="ghost" disabled={!paginatedCategories.hasPrev}>
              <PaginationPrevious
                aria-disabled={!paginatedCategories.hasPrev}
                onClick={() =>
                  goToPage(
                    paginatedCategories.currentPage
                      ? paginatedCategories.currentPage - 1
                      : 1
                  )
                }
              />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              {paginatedCategories.currentPage}
            </PaginationLink>
          </PaginationItem>
          {paginatedCategories.hasNext && (
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  goToPage(
                    paginatedCategories.currentPage
                      ? paginatedCategories.currentPage + 1
                      : 1
                  )
                }
              >
                {paginatedCategories.currentPage
                  ? paginatedCategories.currentPage + 1
                  : 0}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" disabled={!paginatedCategories.hasNext}>
              <PaginationNext
                onClick={() =>
                  goToPage(
                    paginatedCategories.currentPage
                      ? paginatedCategories.currentPage + 1
                      : 1
                  )
                }
              />
            </Button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}

export default UpdateBlogCategories;

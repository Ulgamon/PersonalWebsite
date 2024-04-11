import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Client, IClient, PaginateCategoriesDto } from "@/helpers/clients";
import { useContext, useEffect, useState } from "react";
import { apiUrl } from "@/helpers/constants";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { ReloadIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SelectGroup } from "@radix-ui/react-select";
import CreateCategory from "@/components/createcategory/CreateCategory";
import UpdateCategory from "@/components/updatecategory/UpdateCategory";

function Categories() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const { getCookie } = useContext(AuthContext);
  const [size, setSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { toast } = useToast();

  const [paginatedCategories, setPaginatedCategories] =
    useState<PaginateCategoriesDto>({
      categories: [],
      currentPage: 0,
      hasPrev: false,
      hasNext: false,
    });

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
  }, [size, page, change]);

  function setChangeHandler() {
    setChange((prevState) => !prevState);
  }

  function selectChangeHandler(value: string) {
    setSize(parseInt(value));
  }

  function goToPage(num: number) {
    setPage(num);
  }

  async function deleteCategory(id: number) {
    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers["Authorization"] = `Bearer ${accessToken}`;

        return fetch(url, init);
      },
    });
    try {
      await client.categoriesDELETE(id);
      // This needs to be either tested or tried out
      setChange((prevState) => !prevState);
      toast({
        title: "Deletion was successfull",
        description: `You successfully deleted category with id: ${id}`,
      });
    } catch (e: unknown) {
      let error: string = "";
      if (typeof e === "string") {
        error = e;
      } else if (e instanceof Error) {
        error = e.message;
      }
      toast({
        variant: "destructive",
        title: "Category deletion went wrong!",
        description: error,
      });
    }
  }

  return (
    <main className="min-h-screenw-full">
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
          <CreateCategory changeHandler={setChangeHandler} />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Id</TableHead>
            <TableHead className="w-[10%]">Name</TableHead>
            <TableHead className="w-[10%]">Description</TableHead>
            <TableHead className="w-[10%]">Delete</TableHead>
            <TableHead className="w-[10%]">Update</TableHead>
            <TableHead className="w-[10%]">Posts</TableHead>
          </TableRow>
          <TableBody>
            {paginatedCategories.categories?.map((el) => (
              <TableRow key={el.id} className="max-h-10">
                <TableCell className="w-[10%]">{el.id}</TableCell>
                <TableCell className="w-[10%]">{el.categoryName}</TableCell>
                <TableCell className="text-ellipsis overflow-hidden w-[10%]">
                  {el.description}
                </TableCell>
                <TableCell className="w-[10%] mx-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="secondary">
                        <TrashIcon className="h-5 w-5" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                          After deleting blog post there is no recovery.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <DialogClose>
                          <Button variant="secondary">Close</Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          onClick={() => deleteCategory(el.id || 0)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-right flex w-[10%]">
                  <UpdateCategory
                    changeHandler={setChangeHandler}
                    category={el}
                  />
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

export default Categories;

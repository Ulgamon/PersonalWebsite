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
import { Client, IClient, PaginateBlogPostsDto } from "@/helpers/clients";
import React, { useContext, useEffect, useState } from "react";
import { apiUrl } from "@/helpers/constants";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import {
  CheckIcon,
  Cross2Icon,
  ExternalLinkIcon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
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
import { Link } from "react-router-dom";
import { SelectGroup } from "@radix-ui/react-select";

function BlogPosts() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const { getCookie } = useContext(AuthContext);
  const [size, setSize] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const { toast } = useToast();

  const [paginatedBlogPosts, setPaginatedBlogPosts] =
    useState<PaginateBlogPostsDto>({
      blogPostsDtos: [],
      numberOfElements: 0,
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
        const response = await client.blogPostsGET(size, page);
        // This needs to be either tested or tried out
        console.log(response);
        setPaginatedBlogPosts(response);
      } catch (e: unknown) {
        let error: string = "";
        if (typeof e === "string") {
          error = e;
        } else if (e instanceof Error) {
          error = e.message;
        }
        toast({
          variant: "destructive",
          title: "Something went wrong!",
          description: error,
        });
      } finally {
        setIsLoading(false);
      }
    }
    fetchBlogs();
  }, [size, page, change]);

  function selectChangeHandler(value: string) {
    setSize(parseInt(value));
  }

  function goToPage(num: number) {
    setPage(num);
  }

  async function deleteBlogPost(id: number) {
    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers["Authorization"] = `Bearer ${accessToken}`;

        return fetch(url, init);
      },
    });
    try {
      await client.blogPostsDELETE(id);
      // This needs to be either tested or tried out
      setChange((prevState) => !prevState);
      toast({
        title: "Deletion was successfull",
        description: `You successfully deleted blog post with id: ${id}`,
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
        title: "Blog post deletion went wrong!",
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
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[10%]">Id</TableHead>
            <TableHead className="w-[10%]">Title</TableHead>
            <TableHead className="w-[10%]">Markdown</TableHead>
            <TableHead className="w-[10%]">Published</TableHead>
            <TableHead className="w-[10%]">Published Date</TableHead>
            <TableHead className="w-[10%]">Delete</TableHead>
            <TableHead className="w-[10%]">Link</TableHead>
          </TableRow>
          <TableBody>
            {paginatedBlogPosts.blogPostsDtos?.map((el) => (
              <TableRow key={el.id} className="max-h-10">
                <TableCell className="w-[10%]">{el.id}</TableCell>
                <TableCell className="w-[10%]">{el.title}</TableCell>
                <TableCell className="text-ellipsis overflow-hidden w-[10%]">
                  {el.blogMdText}
                </TableCell>
                <TableCell className="w-[10%]">
                  {el.published ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    <Cross2Icon className="w-5 h-5" />
                  )}
                </TableCell>
                <TableCell className="w-[10%]">{el.publishedDate}</TableCell>
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
                          onClick={() => deleteBlogPost(el.id || 0)}
                          variant="destructive"
                        >
                          Delete
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
                <TableCell className="text-right w-[10%]">
                  <Link to={`/updateblogpost/${el.id}`}>
                    <ExternalLinkIcon className="w-5 h-5" />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableHeader>
      </Table>
      <Pagination className="my-10">
        <PaginationContent>
          <PaginationItem>
            <Button variant="ghost" disabled={!paginatedBlogPosts.hasPrev}>
              <PaginationPrevious
                aria-disabled={!paginatedBlogPosts.hasPrev}
                onClick={() =>
                  goToPage(
                    paginatedBlogPosts.currentPage
                      ? paginatedBlogPosts.currentPage - 1
                      : 1
                  )
                }
              />
            </Button>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink isActive>
              {paginatedBlogPosts.currentPage}
            </PaginationLink>
          </PaginationItem>
          {paginatedBlogPosts.hasNext && (
            <PaginationItem>
              <PaginationLink
                onClick={() =>
                  goToPage(
                    paginatedBlogPosts.currentPage
                      ? paginatedBlogPosts.currentPage + 1
                      : 1
                  )
                }
              >
                {paginatedBlogPosts.currentPage
                  ? paginatedBlogPosts.currentPage + 1
                  : 0}
              </PaginationLink>
            </PaginationItem>
          )}
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <Button variant="ghost" disabled={!paginatedBlogPosts.hasNext}>
              <PaginationNext
                onClick={() =>
                  goToPage(
                    paginatedBlogPosts.currentPage
                      ? paginatedBlogPosts.currentPage + 1
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

export default BlogPosts;

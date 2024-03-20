import { FormEvent, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CiCalendarDate, CiSearch } from "react-icons/ci";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import {
  Client,
  GetSearchDto,
  IClient,
  PaginateBlogPostsDto,
  ReturnBlogPostsDto,
} from "@/helpers/clients";
import { Link } from "react-router-dom";
import { apiUrl, returnDateTime } from "@/helpers/constants";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoWarningOutline } from "react-icons/io5";
import { Label } from "../ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Search = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<PaginateBlogPostsDto>({
    blogPostsDtos: [],
    currentPage: 0,
    hasNext: false,
    hasPrev: false,
    numberOfElements: 0,
  });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const searchData = async () => {
      setError("");
      const client: IClient = new Client(apiUrl);
      const searchDto: GetSearchDto = {
        categories: [],
        search: search,
      };
      try {
        setIsLoading(true);
        const response = await client.search(searchDto);
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
    const timeoutId = setTimeout(searchData, 200);
    return () => clearTimeout(timeoutId);
    // searchData();
  }, [search]);

  const inputHandler = (event: FormEvent<HTMLInputElement>) => {
    console.log(event.currentTarget.value, "JEBEM TI SVE");
    setSearch(event.currentTarget.value);
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
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className="flex text-sm w-fit mx-auto"
      >
        <CiSearch className="me-1 text-md" />
        <p className="font-normal text-neutral-500 me-2">Quick Search...</p>
        <p className="font-semibold">Ctrl K</p>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={search}
          onInput={inputHandler}
          placeholder="Quick search..."
        />
        <CommandList>
          {isLoading ? (
            <AiOutlineLoading3Quarters className="mx-auto h-5 my-4 text-xl animate-spin" />
          ) : (
            <>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="search results">
                {data.blogPostsDtos?.map((el) => (
                  <SearchItem
                    key={el.id}
                    id={el.id}
                    blogMdText={el.blogMdText}
                    publishedDate={el.publishedDate}
                    title={el.title}
                  />
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default Search;

// function highlightMatchingText(markdown: string, search: string) {
//   // title should always stay intact and if it has a match i will replace it
//   const myRegExp = new RegExp(search, "i");

// }

const SearchItem = ({
  id,
  title,
  blogMdText,
  publishedDate,
}: ReturnBlogPostsDto) => {
  return (
    <Link className="mb-2 block" to={"/blog/" + id}>
      <CommandItem value={title + " " + blogMdText}>
        <Card className="rounded-md p-0 m-0 w-full">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs">{blogMdText}</CardContent>
          <CardFooter>
            <p className="opacity-50 text-sm">
              <CiCalendarDate className="inline mb-1 me-1" />
              {returnDateTime(publishedDate)}
            </p>
          </CardFooter>
        </Card>
      </CommandItem>
    </Link>
  );
};

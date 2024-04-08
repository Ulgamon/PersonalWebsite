import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogClose,
  DialogFooter,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useContext, useState } from "react";
import { Client, CreateCategoryDto, IClient } from "@/helpers/clients";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { apiUrl } from "@/helpers/constants";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";

interface ICreateCategory {
  changeHandler: () => void;
}

function CreateCategory({ changeHandler }: ICreateCategory) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getCookie } = useContext(AuthContext);
  const { toast } = useToast();
  const [createCategoryDto, setCreateCategoryDto] = useState<CreateCategoryDto>(
    {
      categoryName: "",
      description: "",
    }
  );

  function changeName(event: React.ChangeEvent<HTMLInputElement>) {
    setCreateCategoryDto((prevState) => ({
      ...prevState,
      categoryName: event.target.value,
    }));
  }

  function changeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setCreateCategoryDto((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers = {} as { [key: string]: string };

        init.headers["Authorization"] = `Bearer ${accessToken}`;

        return fetch(url, init);
      },
    });
    try {
      setIsLoading(true);
      await client.categoriesPOST(createCategoryDto);
      // This needs to be either tested or tried out
      changeHandler();
      const defaultCategory: CreateCategoryDto = {
        categoryName: "",
        description: "",
      };
      setCreateCategoryDto(defaultCategory);
      toast({
        title: "Category Created Successfully.",
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
        title: "Couldn't create category.",
        description: error,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="ms-2">
          Create Category
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form name="createcategory" onSubmit={submitHandler}>
          <DialogHeader className="my-2">
            <DialogTitle>Create Category</DialogTitle>
            <DialogDescription>
              Here you can create a new category.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="name">Category Name:</Label>
            <Input
              name="name"
              id="name"
              placeholder="Type name of the category here."
              value={createCategoryDto.categoryName}
              onChange={changeName}
            />
          </div>
          <div className="my-4">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Type your description here"
              value={createCategoryDto.description}
              onChange={changeDescription}
            />
          </div>
          <DialogFooter className="my-2">
            <DialogClose>
              <Button variant="secondary">Close</Button>
            </DialogClose>
            <Button type="submit" className="ms-1">
              {isLoading ? (
                <ReloadIcon className="animate-spin h-4 w-4 me-2" />
              ) : (
                <></>
              )}
              {isLoading ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCategory;

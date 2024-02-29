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
import {
  Client,
  IClient,
  ReturnCategoriesDto,
  UpdateCategoryDto,
} from "@/helpers/clients";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { apiUrl } from "@/helpers/constants";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";

interface IUpdateCategory {
  changeHandler: () => void;
  category: ReturnCategoriesDto;
}

function UpdateCategory({ changeHandler, category }: IUpdateCategory) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getCookie } = useContext(AuthContext);
  const { toast } = useToast();
  const [updateCategoryDto, setUpdateCategoryDto] = useState<UpdateCategoryDto>(
    {
      categoryName: category.categoryName || "",
      description: category.description || "",
      id: category.id || 0,
    }
  );

  function changeName(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateCategoryDto((prevState) => ({
      ...prevState,
      categoryName: event.target.value,
    }));
  }

  function changeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUpdateCategoryDto((prevState) => ({
      ...prevState,
      description: event.target.value,
    }));
  }

  async function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const client: IClient = new Client(apiUrl, {
      async fetch(url: RequestInfo, init: RequestInit) {
        const accessToken = getCookie();
        init.headers["Authorization"] = `Bearer ${accessToken}`;
        return fetch(url, init);
      },
    });
    try {
      setIsLoading(true);
      await client.categoriesPUT(category.id || 0, updateCategoryDto);
      // This needs to be either tested or tried out
      changeHandler();
      toast({
        title: "Category Updated Successfully.",
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
        title: "Couldn't update category.",
        description: error,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="me-auto">
          <UpdateIcon className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form name="createcategory" onSubmit={submitHandler}>
          <DialogHeader className="my-2">
            <DialogTitle>Update Category: {category.categoryName}</DialogTitle>
            <DialogDescription>Here you can update category.</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="name">Category Name:</Label>
            <Input
              name="name"
              id="name"
              placeholder="Type name of the category here."
              value={updateCategoryDto.categoryName}
              onChange={changeName}
            />
          </div>
          <div className="my-4">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              name="description"
              id="description"
              placeholder="Type your description here"
              value={updateCategoryDto.description}
              onChange={changeDescription}
            />
          </div>
          <DialogFooter className="my-2">
            <DialogClose>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" className="ms-1">
              {isLoading ? (
                <ReloadIcon className="animate-spin h-4 w-4 me-2" />
              ) : (
                <></>
              )}
              {isLoading ? "Updating..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCategory;

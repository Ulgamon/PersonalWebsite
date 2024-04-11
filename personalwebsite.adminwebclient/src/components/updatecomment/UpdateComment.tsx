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
  ReturnCommentsDto,
  UpdateCommentDto,
} from "@/helpers/clients";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { AuthContext } from "@/contexts/AuthContext/AuthContext";
import { apiUrl } from "@/helpers/constants";
import { ReloadIcon, UpdateIcon } from "@radix-ui/react-icons";
import { useToast } from "../ui/use-toast";

interface IUpdateComment {
  changeHandler: () => void;
  comment: ReturnCommentsDto;
}

function UpdateComment({ changeHandler, comment }: IUpdateComment) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getCookie } = useContext(AuthContext);
  const { toast } = useToast();
  const [updateCommentDto, setUpdateCommentDto] = useState<UpdateCommentDto>({
    comment1: comment.comment1 || "",
    id: comment.id || 0,
    name: comment.name || "",
  });

  function changeName(event: React.ChangeEvent<HTMLInputElement>) {
    setUpdateCommentDto((prevState) => ({
      ...prevState,
      name: event.target.value,
    }));
  }

  function changeDescription(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setUpdateCommentDto((prevState) => ({
      ...prevState,
      comment: event.target.value,
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
      await client.commentsPUT(comment.id || 0, updateCommentDto);
      // This needs to be either tested or tried out
      changeHandler();
      toast({
        title: "Comment Updated Successfully.",
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
        title: "Couldn't update comment.",
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
        <form name="createcomment" onSubmit={submitHandler}>
          <DialogHeader className="my-2">
            <DialogTitle>Update Comment: {comment.id}</DialogTitle>
            <DialogDescription>Here you can update comment.</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="name">comment Name:</Label>
            <Input
              name="name"
              id="name"
              placeholder="Type name of the comment here."
              value={updateCommentDto.name}
              onChange={changeName}
            />
          </div>
          <div className="my-4">
            <Label htmlFor="description">Comment:</Label>
            <Textarea
              name="comment"
              id="comment"
              placeholder="Type your comment here"
              value={updateCommentDto.comment1}
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

export default UpdateComment;

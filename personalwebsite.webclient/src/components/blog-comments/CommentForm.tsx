import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { FormEvent, useState } from "react";
import useInput from "@/hooks/useInput";
import { Client, CreateCommentDto, IClient } from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";

interface ICommentForm {
  commentId?: number;
  blogId?: number;
}

const CommentForm = ({ commentId, blogId }: ICommentForm) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const {
    blurInputHandler: blurNameInputHandler,
    changeInputHandler: changeNameInputHandler,
    enteredValue: name,
    invalidInput: nameInvalidInput,
    valueIsValid: nameIsValid,
    reset: resetName,
  } = useInput((value) => (value.trim() ? true : false));

  const {
    blurInputHandler: blurEmailInputHandler,
    changeInputHandler: changeEmailInputHandler,
    enteredValue: email,
    invalidInput: emailInvalidInput,
    valueIsValid: emailIsValid,
    reset: resetEmail,
  } = useInput((value) => (value.trim() ? true : false));

  const {
    blurInputHandler: blurCommentInputHandler,
    changeInputHandler: changeCommentInputHandler,
    enteredValue: comment,
    invalidInput: commentInvalidInput,
    valueIsValid: commentIsValid,
    reset: resetComment,
  } = useInput((value) => (value.trim() ? true : false));

  const canSubmitForm = nameIsValid && emailIsValid && commentIsValid;

  const postComment = async (name: string, email: string, comment: string) => {
    setIsLoading(true);
    setError("");
    const client: IClient = new Client(apiUrl);
    const sendValue: CreateCommentDto = {
      name: name,
      email: email,
      blogPostId: blogId,
      commentId: commentId,
      comment1: comment,
    };
    try {
      setIsLoading(true);
      const response = await client.commentsPOST(sendValue);
      console.log(response);
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

  const submitHandler = async (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmitForm) {
      blurNameInputHandler();
      blurEmailInputHandler();
      blurCommentInputHandler();
      return;
    }
    await postComment(name, email, comment);

    resetName();
    resetEmail();
    resetComment();
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={submitHandler}>
          <div className="flex flex-col mb-4">
            <Label className="mb-0.5">
              Full Name:{" "}
              <p className="inline text-red-400">
                {nameInvalidInput ? "*(cannot leave empty)" : ""}
              </p>
            </Label>
            <Input
              type="text"
              value={name}
              placeholder="Your Name"
              onChange={changeNameInputHandler}
              onBlur={blurNameInputHandler}
              className={`w-full`}
            />
          </div>
          <div className="flex flex-col mb-4">
            <Label className="mb-0.5">
              Email:{" "}
              <p className="inline text-red-400">
                {emailInvalidInput ? "*(cannot leave empty)" : ""}
              </p>
            </Label>
            <Input
              type="text"
              name="email"
              value={email}
              onChange={changeEmailInputHandler}
              onBlur={blurEmailInputHandler}
              className={`w-full rounded-md `}
              placeholder="Email Address"
            />
          </div>
          <div className="flex flex-col mb-4">
            <Label className="mb-0.5">
              Comment:{" "}
              <p className="inline text-red-400">
                {commentInvalidInput ? "*(cannot leave empty)" : ""}
              </p>
            </Label>
            <Textarea
              placeholder="Your comment"
              value={comment}
              onChange={changeCommentInputHandler}
              onBlur={blurCommentInputHandler}
              className={`w-full `}
              name="comment"
              rows={5}
            ></Textarea>
          </div>
          <Button
            type="submit"
            disabled={isLoading}
            className="disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="flex">
                <AiOutlineLoading3Quarters className="me-2 text-xl animate-spin" />
                Sending
              </div>
            ) : (
              <div className="flex">Comment</div>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CommentForm;

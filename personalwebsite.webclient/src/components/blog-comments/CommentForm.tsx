import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "../ui/button.tsx";
import { Card, CardContent } from "../ui/card.tsx";
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { Textarea } from "../ui/textarea.tsx";
import { FormEvent, useEffect, useRef, useState } from "react";
import useInput from "@/hooks/useInput.tsx";
import { Client, CreateCommentDto, IClient } from "@/helpers/clients.ts";
import { apiUrl } from "@/helpers/constants.ts";
import { IoWarningOutline } from "react-icons/io5";
import { animated, useSpring } from "@react-spring/web";

interface ICommentForm {
  commentId?: number;
  blogId?: number;
  open: boolean;
  toggle: () => void;
}

const CommentForm = ({ commentId, blogId, open, toggle }: ICommentForm) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const ref = useRef<HTMLDivElement>(null);
  const [props, api] = useSpring(() => ({
    from: {
      height: 0,
    },
    to: {
      height: 0,
    },
  }));

  useEffect(() => {
    if (open) {
      api.start({
        from: { height: 0 },
        to: { height: (ref.current?.offsetHeight || 0) + 16 || null },
      });
    } else {
      api.start({
        from: { height: (ref.current?.offsetHeight || 0) + 16 || null },
        to: { height: 0 },
      });
    }
  }, [ref, api, open]);

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
  } = useInput((value) =>
    value.trim().length >= 3 && value.trim().length <= 100 ? true : false
  );

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
    if (!(error.length > 0)) {
      resetName();
      resetEmail();
      resetComment();
      toggle();
    }
  };

  return (
    <animated.div className="h-full" style={{ overflow: "hidden", ...props }}>
      <div ref={ref}>
        <Card className="m-2 mb-10 rounded-md bg-blue-50 h-auto dark:bg-slate-900">
          <CardContent>
            <form onSubmit={submitHandler}>
              <div className="flex flex-col mt-5 mb-4">
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
                  {commentInvalidInput ? (
                    <p className="inline text-red-400">
                      {`(${comment.length}/100)*(length must be 3 to 100 characters)`}{" "}
                    </p>
                  ) : (
                    `(${comment.length}/100)`
                  )}
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
              {error && (
                <Label className="text-red-400 mt-3 block">
                  <IoWarningOutline className="inline text-2xl mb-1.5 me-1" />
                  Something went wrong! Please try again.
                </Label>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </animated.div>
  );
};

export default CommentForm;

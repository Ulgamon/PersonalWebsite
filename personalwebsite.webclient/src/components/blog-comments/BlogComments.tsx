import { IoClose, IoWarningOutline } from "react-icons/io5";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import {
  Client,
  IClient,
  PaginateCommentsDto,
  ReturnCommentsDto,
} from "@/helpers/clients";
import { apiUrl, returnDateTime, returnTime } from "@/helpers/constants";
import { CiCalendarDate } from "react-icons/ci";
import { LuCornerDownRight, LuWatch } from "react-icons/lu";
import { Button } from "../ui/button";
import { HiOutlineReply } from "react-icons/hi";
import CommentForm from "./CommentForm";
import { Skeleton } from "../ui/skeleton";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";

interface IBlogComments {
  blogId: number;
}

const BlogComments = ({ blogId }: IBlogComments) => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<PaginateCommentsDto>({
    comments: [],
    currentPage: 1,
    hasNext: false,
    hasPrev: false,
  });
  const [change, setChange] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const toggleChange = () => {
    setChange((prev) => !prev);
  };

  useEffect(() => {
    const fetchData = async () => {
      const size = 10;
      setError("");
      const client: IClient = new Client(apiUrl);
      try {
        setIsLoading(true);
        const response = await client.commentsGET2(blogId, size, page);
        setData((prev) => {
          if ((prev.currentPage || 0) < (response.currentPage || 0)) {
            return {
              currentPage: response.currentPage,
              hasNext: response.hasNext,
              hasPrev: response.hasPrev,
              comments: prev.comments?.concat(response?.comments || []),
            };
          }
          if ((prev.currentPage || 0) === (response.currentPage || 0)) {
            return response;
          }
          return prev;
        });
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
  }, [page, blogId, change]);

  return (
    <Card className="my-10 rounded-md">
      <CardHeader>
        <CardTitle className="text-xl">Comments</CardTitle>
        <Button
          onClick={() => {
            setOpen((pr) => !pr);
          }}
          className="font-normal w-fit px-2 h-8 text-sx"
          variant="secondary"
        >
          {open ? (
            <>
              <IoClose className="me-1" />
              Close
            </>
          ) : (
            <>
              <FaRegCommentAlt className="me-1 mt-0.5" />
              Comment
            </>
          )}
        </Button>
        <CommentForm open={open} toggle={toggleChange} blogId={blogId} />
      </CardHeader>
      {isLoading ? (
        <></>
      ) : error.length > 0 ? (
        <Label className="text-yellow-500 m-5 mx-auto mt-3 block">
          <IoWarningOutline className="inline ms-10 text-2xl mb-1.5 me-1" />
          There are no comments currently.
        </Label>
      ) : (
        <CardContent className="m-0 p-0">
          {data.comments?.map((el) => {
            return (
              <div key={el.id}>{recursiveComments(el, toggleChange, 0)}</div>
            );
          })}
        </CardContent>
      )}
      <CardFooter>
        <Button
          disabled={data.hasNext ? false : true}
          className="disabled:opacity-75 mx-auto disabled:cursor-not-allowed"
          onClick={() => {
            setPage((pr) => pr + 1);
          }}
        >
          {isLoading ? (
            <div className="flex">
              <AiOutlineLoading3Quarters className="me-2 text-xl animate-spin" />
              Loading
            </div>
          ) : (
            <>Load More</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogComments;

interface IComment {
  comment: ReturnCommentsDto;
  toggle: () => void;
  children?: JSX.Element | JSX.Element[] | string;
  level: number;
}

const Comment = ({ comment, toggle, children, level }: IComment) => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen((pr) => !pr);
  };

  return (
    <>
      <Card className="w-full my-1 mx-1 rounded-md">
        <CardHeader className="flex flex-row flex-wrap items-center">
          <h4 className="sm:text-lg mt-0.5 font-semibold inline">
            {comment.name}
          </h4>
          <p className="opacity-75 my-10 text-xs ms-2">
            <CiCalendarDate className="inline me-1 mb-1" />
            {returnDateTime(comment.createdDate)}
          </p>
          <p className="opacity-75 my-10 text-xs ms-2">
            <LuWatch className="inline mb-1" />
            {returnTime(comment.createdDate)}
          </p>
        </CardHeader>
        <CardContent>{comment.comment1}</CardContent>
        {level > 0 ? (
          <></>
        ) : (
          <CardFooter>
            <Button
              onClick={toggleOpen}
              className="font-normal px-2 h-8 text-sx"
              variant="secondary"
            >
              {open ? (
                <>
                  <IoClose className="me-1" />
                  Close
                </>
              ) : (
                <>
                  <HiOutlineReply className="me-1" />
                  Reply
                </>
              )}
            </Button>
          </CardFooter>
        )}

        {children}

        {level > 0 ? (
          <></>
        ) : (
          <CommentForm toggle={toggle} commentId={comment.id} open={open} />
        )}
      </Card>
    </>
  );
};

function recursiveComments(
  comment: ReturnCommentsDto,
  toggle: () => void,
  level: number = 0
): JSX.Element {
  const temp: ReturnCommentsDto[] = comment.inverseCommentNavigation || [];
  if (temp.length > 0) {
    const el: JSX.Element = (
      <>
        <div className="flex flex-row">
          {level > 0 ? <LuCornerDownRight className="ms-2 sm:ms-5" /> : <></>}
          <Comment
            level={level}
            key={comment.id}
            comment={comment}
            toggle={toggle}
          />
        </div>
        {temp.map((el) => (
          <div key={el.id}>{recursiveComments(el, toggle, level + 1)}</div>
        ))}
      </>
    );
    return el;
  }
  return (
    <div className="flex content-center items-center">
      {level > 0 ? <LuCornerDownRight className="ms-2 sm:ms-5" /> : <></>}

      <Comment
        level={level}
        key={comment.id}
        comment={comment}
        toggle={toggle}
      />
    </div>
  );
}

import { IoWarningOutline } from "react-icons/io5";
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
    fetchData();
  }, [page, blogId]);

  return (
    <Card className="my-10">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      {isLoading ? (
        <>Loading...</>
      ) : error.length > 0 ? (
        <Label className="text-red-400 m-5 mx-auto mt-3 block">
          <IoWarningOutline className="inline ms-10 text-2xl mb-1.5 me-1" />
          Something went wrong! Please try again.
        </Label>
      ) : (
        <CardContent>
          {data.comments?.map((el) => {
            return (
              <div key={el.id}>{recursiveComments(el, toggleChange, 0)}</div>
            );
          })}
        </CardContent>
      )}
    </Card>
  );
};

export default BlogComments;

interface IComment {
  comment: ReturnCommentsDto;
  toggle?: () => void;
  children?: JSX.Element | JSX.Element[] | string;
}

const Comment = ({ comment, toggle, children }: IComment) => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center">
        <h4 className="text-sm font-bold inline">{comment.name}</h4>
        <p className="opacity-75 my-10 text-xs pb-1 ms-2">
          <CiCalendarDate className="inline mb-1" />
          {returnDateTime(comment.createdDate)}
        </p>
        <p className="opacity-75 my-10 text-xs pb-1 ms-2">
          <LuWatch className="inline mb-1" />
          {returnTime(comment.createdDate)}
        </p>
      </CardHeader>
      <CardContent>{comment.comment1}</CardContent>
      <CardFooter></CardFooter>
      {children}
    </Card>
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
        <div className="flex">
          {level > 0 ? <LuCornerDownRight className="text-2xl" /> : <></>}
          <Comment key={comment.id} comment={comment} toggle={toggle} />
        </div>
        {temp.map((el) => (
          <div key={el.id}>{recursiveComments(el, toggle, level + 1)}</div>
        ))}
      </>
    );
    return el;
  }
  return (
    <div className="flex">
      {level > 0 ? <LuCornerDownRight className="text-2xl" /> : <></>}

      <Comment key={comment.id} comment={comment} toggle={toggle} />
    </div>
  );
}

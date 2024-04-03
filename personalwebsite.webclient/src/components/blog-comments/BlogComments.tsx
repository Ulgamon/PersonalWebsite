import { IoWarningOutline } from "react-icons/io5";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { useEffect, useState } from "react";
import { Client, IClient, PaginateCommentsDto } from "@/helpers/clients";
import { apiUrl } from "@/helpers/constants";

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
  }, [page]);

  return (
    <Card className="my-10">
      <CardHeader>
        <CardTitle>Comments</CardTitle>
      </CardHeader>
      {error.length > 0 ? (
        <Label className="text-red-400 m-5 mx-auto mt-3 block">
          <IoWarningOutline className="inline ms-10 text-2xl mb-1.5 me-1" />
          Something went wrong! Please try again.
        </Label>
      ) : (
        <CardContent></CardContent>
      )}
    </Card>
  );
};

export default BlogComments;

const Comment = () => {};

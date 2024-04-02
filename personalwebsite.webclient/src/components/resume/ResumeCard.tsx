import { ResumeItem } from "@/helpers/data";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card";
import { Button } from "../ui/button";

const ResumeCard = ({
  image,
  duration,
  description,
  institution,
  title,
  link,
}: ResumeItem) => {
  return (
    <Card className="h-full overflow-clip">
      <img className="w-full aspect-video" src={image} alt="Description image of the institution." />
      <CardHeader>
        <CardTitle className="text-2xl mb-4 text-themeOrange dark:text-themeBlue">
          {duration}
        </CardTitle>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{institution}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
      <CardFooter>
        {link ? (
          <Button className="mx-auto" variant="link">
            <a href={link} target="_blank">
              See Certificate
            </a>
          </Button>
        ) : (
          ""
        )}
      </CardFooter>
    </Card>
  );
};

export default ResumeCard;

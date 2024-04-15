import { ResumeItem } from "@/helpers/data.ts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../ui/card.tsx";
import useImageScale from "@/hooks/useImageScale.tsx";
import { animated } from "@react-spring/web";

const ResumeCard = ({
  image,
  duration,
  description,
  institution,
  title,
  link,
}: ResumeItem) => {
  const { scale, handleMouseEnter, handleMouseLeave } = useImageScale();
  return (
    <Card
      className="h-full overflow-clip"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="overflow-clip">
        <animated.div className="aspect-video" style={{ scale: scale }}>
          <a href={link} target="_blank">
            <img
              className="w-full aspect-video"
              src={image}
              alt={institution}
            />
          </a>
        </animated.div>
      </div>
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
      <CardFooter />
    </Card>
  );
};

export default ResumeCard;

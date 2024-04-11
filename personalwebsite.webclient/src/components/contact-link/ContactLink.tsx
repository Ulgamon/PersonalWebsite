import useImageScale from "@/hooks/useImageScale.tsx";
import { Button } from "../ui/button.tsx";
import { Card, CardContent } from "../ui/card.tsx";
import { animated } from "@react-spring/web";

interface IContactLinkProps {
  to: string;
  text: string;
  children: JSX.Element | JSX.Element[] | string;
}

const ContactLink = ({ to, text, children }: IContactLinkProps) => {
  const { scale, handleMouseEnter, handleMouseLeave } = useImageScale();
  return (
    <li className="mx-auto w-full">
      <animated.div style={{ scale }}>
        <a href={to} target="_blank">
          <Card
            className="px-0"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <CardContent>
              <div className="text-7xl flex justify-center mt-7">
                {children}
              </div>

              <Button variant="link" className="px-0 flex mx-auto">
                {text}
              </Button>
            </CardContent>
          </Card>
        </a>
      </animated.div>
    </li>
  );
};

export default ContactLink;

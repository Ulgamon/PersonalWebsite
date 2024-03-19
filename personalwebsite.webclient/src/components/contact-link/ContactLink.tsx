import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface IContactLinkProps {
  to: string;
  text: string;
  children: JSX.Element | JSX.Element[] | string;
}

const ContactLink = ({ to, text, children }: IContactLinkProps) => {
  return (
    <li className="mx-auto w-full">
      <a href={to} target="_blank">
        <Card className="px-0">
          <CardContent>
            <div className="text-7xl flex justify-center mt-7">{children}</div>
            <Button variant="link" className="px-0 flex mx-auto">
              {text}
            </Button>
          </CardContent>
        </Card>
      </a>
    </li>
  );
};

export default ContactLink;

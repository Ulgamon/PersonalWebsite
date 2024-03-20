import { Button } from "../ui/button";
import { IoArrowForward } from "react-icons/io5";

const Footer = () => {
  return (
    <footer className="w-full bg-orange-300 dark:bg-slate-900">
      <div className="max-w-[1400px] mx-auto md:px-16 py-10">
        <ul className="grid grid-cols-3 ">
          <li className="">
            <LinkHeader>Links:</LinkHeader>
            <FooterNavLink to="/#home" text="Home" />
            <FooterNavLink to="/#about" text="About" />
            <FooterNavLink to="/#services" text="Services" />
            <FooterNavLink to="/#projects" text="Projects" />
            <FooterNavLink to="/#contact" text="Contact" />
          </li>
          <li className="">
            <LinkHeader>Services:</LinkHeader>
            <FooterNavLink to="/#home" text="Home" />
            <FooterNavLink to="/#about" text="About" />
            <FooterNavLink to="/#services" text="Services" />
            <FooterNavLink to="/#projects" text="Projects" />
            <FooterNavLink to="/#contact" text="Contact" />
          </li>
        </ul>
      </div>
    </footer>
  );
};
export default Footer;

interface FooterNavLinkProps {
  to: string;
  text: string;
}
const FooterNavLink = ({ to, text }: FooterNavLinkProps) => {
  return (
    <Button className="text-lg flex px-2" variant="link">
      <IoArrowForward className="me-1" />
      <a href={to}>{text}</a>
    </Button>
  );
};

interface LinkHeaderProps {
  children: string;
}
const LinkHeader = ({ children }: LinkHeaderProps) => {
  return <h6 className="text-2xl font-bold dark:text-white">{children}</h6>;
};

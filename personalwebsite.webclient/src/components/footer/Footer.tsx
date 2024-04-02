import { Link } from "react-scroll";
import { Button } from "../ui/button";
import {
  IoArrowForward,
  IoLogoGithub,
  IoLogoLinkedin,
  IoMail,
  IoPhonePortraitOutline,
} from "react-icons/io5";
import useImageScale from "@/hooks/useImageScale";
import { animated } from "@react-spring/web";
import Search from "../search/Search";

const Footer = () => {
  return (
    <footer className="w-full bg-orange-400 dark:bg-slate-900">
      <div className="max-w-[1400px] mx-auto md:px-16 py-16">
        <div className="mb-6">
          <Search />
        </div>
        <ul className="grid grid-cols-2 ">
          <li className="flex justify-center items-center">
            <FooterNavLink to="home" text="HOME" />
            <FooterNavLink to="about" text="ABOUT" />
            <FooterNavLink to="services" text="SERVICES" />
            <FooterNavLink to="projects" text="PROJECTS" />
            <FooterNavLink to="contact" text="CONTACT" />
          </li>
          <li className="flex justify-center">
            <SMIcons to="https://github.com/Ulgamon">
              <IoLogoGithub />
            </SMIcons>
            <SMIcons to="mailto://ilicjustin@gmail.com">
              <IoMail />
            </SMIcons>
            <SMIcons to="tel://+381642143238">
              <IoPhonePortraitOutline />
            </SMIcons>
            <SMIcons to="https://www.linkedin.com/in/justin-ilic/">
              <IoLogoLinkedin />
            </SMIcons>
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
    <Button className="text-sm flex mx-1" variant="link">
      <IoArrowForward className="me-0.5" />
      <Link to={to}>{text}</Link>
    </Button>
  );
};

interface ISMIcons {
  children: JSX.Element | JSX.Element[] | string;
  to: string;
}
const SMIcons = ({ children, to }: ISMIcons) => {
  const { scale, handleMouseEnter, handleMouseLeave } = useImageScale();
  return (
    <a className="text-5xl mx-3" href={to}>
      <animated.div
        style={{ scale }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </animated.div>
    </a>
  );
};

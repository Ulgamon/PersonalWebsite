import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
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
import { useLocation } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-orange-400 dark:bg-slate-900">
      <div className="max-w-[1400px] mx-auto md:px-16 pt-12 pb-12">
        <ul>
          <li className="flex mb-5 flex-wrap justify-center items-center">
            <FooterNavLink to="home" text="HOME" />
            <FooterNavLink to="about" text="ABOUT" />
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
  const location = useLocation();

  return (
    <Button className="text-sm p-0 flex mx-2" variant="link">
      <IoArrowForward className="me-0.5" />
      {location.pathname !== "/" ? (
        <NavLink to="/">{text}</NavLink>
      ) : (
        <Link to={to} offset={-90}>
          {text}
        </Link>
      )}
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

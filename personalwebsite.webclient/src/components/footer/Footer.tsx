import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { Button } from "../ui/button.tsx";
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
            <FooterNavLink to="home" text="home" />
            <FooterNavLink to="about" text="about" />
            <FooterNavLink to="resume" text="resume" />
            <FooterNavLink to="skills" text="skills" />
            <FooterNavLink to="projects" text="projects" />
            <FooterNavLink to="blogs" text="blog" />
            <FooterNavLink to="contact" text="contact" />
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
    <>
      {location.pathname !== "/" ? (
        <NavLink to={"/#" + text}>
          <Button className="text-sm p-0 flex mx-2 uppercase" variant="link">
            <IoArrowForward className="me-0.5" />
            {text}{" "}
          </Button>
        </NavLink>
      ) : (
        <Link to={to} offset={-90}>
          <Button className="text-sm p-0 flex mx-2 uppercase" variant="link">
            <IoArrowForward className="me-0.5" />
            {text}{" "}
          </Button>
        </Link>
      )}
    </>
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

import AnimatedSwitch from "../animated-switch/AnimatedSwitch";
import Logo from "../logo/Logo";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IoMenu } from "react-icons/io5";
import BigNavLink from "../big-nav-link.tsx/BigNavLink";
import useShowNavbar from "@/hooks/useShowNavbar";
import { animated, useTransition } from "@react-spring/web";

interface IAppOutlet {
  children: string | JSX.Element | JSX.Element[];
}

const AppOutlet = ({ children }: IAppOutlet) => {
  const shouldShow = useShowNavbar();
  const transition = useTransition(shouldShow, {
    from: { y: -100 },
    enter: { y: 0 },
    leave: { y: -100 },
  });
  return (
    <main className="w-full max-w-[1400px] mx-auto min-h-screen text-slate-900 dark:text-neutral-200">
      <nav className="flex justify-between sm:justify-around content-center">
        <Logo />
        <ul className="hidden lg:flex content-center items-center my-3">
          <li>
            <BigNavLink to="#home">Home</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="#about">About</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="#resume">Resume</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="#services">Services</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="#skills">Skills</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="#projects">Projects</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="/blog">Blog</BigNavLink>{" "}
          </li>
          <li>
            <BigNavLink to="#contact">Contact</BigNavLink>{" "}
          </li>
        </ul>
        <AnimatedSwitch className="hidden lg:block m-3" />
        <Sheet>
          <SheetTrigger asChild>
            <IoMenu className="flex lg:hidden text-4xl mt-3 me-4" />
          </SheetTrigger>
          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                <AnimatedSwitch className="mx-auto" />
              </SheetTitle>
            </SheetHeader>
            <ul>
              <li>Tojica</li>
              <li>Tojica</li>
              <li>Tojica</li>
              <li>Tojica</li>
            </ul>
          </SheetContent>
        </Sheet>
      </nav>
      {transition(
        (style, show) =>
          show && (
            <animated.div
              style={style}
              className="fixed max-w-[1400px] mx-auto w-full bg-white dark:bg-slate-950 pb-2 flex top-0 z-50 m-0 justify-between sm:justify-around content-center"
            >
              <Logo />
              <ul className="hidden lg:flex content-center items-center my-3">
                <li>
                  <BigNavLink to="#home">Home</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="#about">About</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="#resume">Resume</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="#services">Services</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="#skills">Skills</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="#projects">Projects</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="/blog">Blog</BigNavLink>{" "}
                </li>
                <li>
                  <BigNavLink to="#contact">Contact</BigNavLink>{" "}
                </li>
              </ul>
              <AnimatedSwitch className="hidden lg:block m-3" />
              <Sheet>
                <SheetTrigger asChild>
                  <IoMenu className="flex lg:hidden text-4xl mt-3 me-4" />
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>
                      <AnimatedSwitch className="block mx-auto" />
                    </SheetTitle>
                  </SheetHeader>
                  <ul>
                    <li>Tojica</li>
                    <li>Tojica</li>
                    <li>Tojica</li>
                    <li>Tojica</li>
                  </ul>
                </SheetContent>
              </Sheet>
            </animated.div>
          )
      )}
      {children}
      <footer></footer>
    </main>
  );
};

export default AppOutlet;

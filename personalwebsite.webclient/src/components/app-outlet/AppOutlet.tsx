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
import SheetNavLink from "../sheet-nav-link/SheetNavLink";
import Footer from "../footer/Footer";

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
    <main className="w-full mx-auto min-h-screen absolute z-50 text-slate-900 dark:text-neutral-200">
      <nav className="w-full relative z-50 pb-3">
        <div className="max-w-screen-customMaxWidth mx-auto flex justify-between sm:justify-around content-center">
          <Logo />
          <ul className="hidden lg:flex content-center items-center mt-3">
            <li>
              <BigNavLink to="home">Home</BigNavLink>{" "}
            </li>
            <li>
              <BigNavLink to="about">About</BigNavLink>{" "}
            </li>
            <li>
              <BigNavLink to="resume">Resume</BigNavLink>{" "}
            </li>
            <li>
              <BigNavLink to="skills">Skills</BigNavLink>{" "}
            </li>
            <li>
              <BigNavLink to="projects">Projects</BigNavLink>{" "}
            </li>
            <li>
              <BigNavLink to="blogs">Blog</BigNavLink>{" "}
            </li>
            <li>
              <BigNavLink to="contact">Contact</BigNavLink>{" "}
            </li>
          </ul>
          <AnimatedSwitch className="hidden lg:block mt-3 mx-3" />
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
              <ul className="my-2">
                <li>
                  <SheetNavLink to="home">Home</SheetNavLink>{" "}
                </li>
                <li>
                  <SheetNavLink to="about">About</SheetNavLink>{" "}
                </li>
                <li>
                  <SheetNavLink to="resume">Resume</SheetNavLink>{" "}
                </li>
                <li>
                  <SheetNavLink to="skills">Skills</SheetNavLink>{" "}
                </li>
                <li>
                  <SheetNavLink to="projects">Projects</SheetNavLink>{" "}
                </li>
                <li>
                  <SheetNavLink to="blogs">Blog</SheetNavLink>{" "}
                </li>
                <li>
                  <SheetNavLink to="contact">Contact</SheetNavLink>{" "}
                </li>
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {transition(
        (style, show) =>
          show && (
            <animated.div
              style={style}
              className="bg-white dark:bg-slate-950 top-0 z-50 p-0 m-0 w-full shadow-sm dark:shadow-slate-800 fixed"
            >
              <div className="max-w-screen-customMaxWidth mx-auto w-full pb-3 lg:pb-1 flex justify-between sm:justify-around content-center">
                <Logo />
                <ul className="hidden lg:flex content-center items-center mt-1">
                  <li>
                    <BigNavLink to="home">Home</BigNavLink>{" "}
                  </li>
                  <li>
                    <BigNavLink to="about">About</BigNavLink>{" "}
                  </li>
                  <li>
                    <BigNavLink to="resume">Resume</BigNavLink>{" "}
                  </li>

                  <li>
                    <BigNavLink to="skills">Skills</BigNavLink>{" "}
                  </li>
                  <li>
                    <BigNavLink to="projects">Projects</BigNavLink>{" "}
                  </li>
                  <li>
                    <BigNavLink to="blogs">Blog</BigNavLink>{" "}
                  </li>
                  <li>
                    <BigNavLink to="contact">Contact</BigNavLink>{" "}
                  </li>
                </ul>
                <AnimatedSwitch className="hidden lg:block m-3" />
                <Sheet>
                  <SheetTrigger asChild>
                    <IoMenu className="flex lg:hidden text-4xl mt-3.5 me-4" />
                  </SheetTrigger>
                  <SheetContent side="right">
                    <SheetHeader>
                      <SheetTitle>
                        <AnimatedSwitch className="block mx-auto" />
                      </SheetTitle>
                    </SheetHeader>
                    <ul>
                      <li>
                        <SheetNavLink to="home">Home</SheetNavLink>{" "}
                      </li>
                      <li>
                        <SheetNavLink to="about">About</SheetNavLink>{" "}
                      </li>
                      <li>
                        <SheetNavLink to="resume">Resume</SheetNavLink>{" "}
                      </li>
                      <li>
                        <SheetNavLink to="skills">Skills</SheetNavLink>{" "}
                      </li>
                      <li>
                        <SheetNavLink to="projects">Projects</SheetNavLink>{" "}
                      </li>
                      <li>
                        <SheetNavLink to="blogs">Blog</SheetNavLink>{" "}
                      </li>
                      <li>
                        <SheetNavLink to="contact">Contact</SheetNavLink>{" "}
                      </li>
                    </ul>
                  </SheetContent>
                </Sheet>
              </div>
            </animated.div>
          )
      )}
      {children}

      <Footer />
    </main>
  );
};

export default AppOutlet;

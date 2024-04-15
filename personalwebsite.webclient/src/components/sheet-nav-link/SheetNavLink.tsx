import { AnimateLink } from "@/helpers/constants.ts";
import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";

interface ISheetNavLinkProps {
  to: string;
  children: string;
}

const SheetNavLink = ({ to, children }: ISheetNavLinkProps) => {
  const location = useLocation();
  const [show, setShow] = useState<AnimateLink>({
    active: false,
    animate: false,
  });
  const transition = useTransition(show, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    // config: {
    //   mass: 5,
    //   friction: 50,
    // },
  });

  const mouseEnterHandler = () => {
    if (show.active === false) {
      setShow((pr) => ({ active: pr.active, animate: true }));
    }
  };

  const mouseLeaveHandler = () => {
    if (show.active === false) {
      setShow({
        active: false,
        animate: false,
      });
    }
  };

  if (location.pathname === "/") {
    return (
      <Link
        className={
          "font-Sansation w-full flex relative z-50 cursor-pointer py-2 ps-4 my-1 rounded-xl"
        }
        to={to}
        smooth={true}
        spy={true}
        offset={-90}
        duration={400}
        onSetActive={() => setShow({ active: true, animate: true })}
        onSetInactive={() => setShow({ active: false, animate: false })}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {children}
        {transition(
          (style, item) =>
            item.animate && (
              <animated.div
                style={style}
                className="w-full top-0 start-0 rounded-xl ps-4 -z-10 mx-auto h-full absolute block dark:bg-themeBlue bg-themeOrange"
              />
            )
        )}
      </Link>
    );
  }

  return (
    <NavLink
      to={"/#" + to}
      className={
        "font-semibold w-full relative cursor-pointer py-2 ps-4 block my-1 rounded-xl"
      }
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {children}
      {transition(
        (style, item) =>
          item.animate && (
            <animated.div
              style={style}
              className="w-full top-0 start-0 rounded-xl ps-4 -z-10 mx-auto h-full absolute block dark:bg-themeBlue bg-themeOrange"
            />
          )
      )}
    </NavLink>
  );
};

export default SheetNavLink;

import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";

interface IBigNavLinkProps {
  to: string;
  children: string;
}

const BigNavLink = ({ to, children }: IBigNavLinkProps) => {
  // const [props, api] =
  const location = useLocation();
  const [show, setShow] = useState<boolean>(false);
  const transition = useTransition(show, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
    config: {
      mass: 5,
      friction: 50,
    },
  });

  const mouseEnterHandler = () => {
    setShow(true);
  };

  const mouseLeaveHandler = () => {
    setShow(false);
  }

  if (location.pathname === "/") {
    return (
      <Link
        className={"font-semibold relative cursor-pointer mx-3"}
        activeClass=" text-themeOrange dark:text-themeBlue"
        to={to}
        smooth={true}
        spy={true}
        offset={-90}
        duration={400}
        onSetActive={() => setShow(true)}
        onSetInactive={() => setShow(false)}
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
      >
        {children}
        {transition(
          (style, item) =>
            item && (
              <animated.div
                style={style}
                className="w-full mx-auto h-0.5 absolute block dark:bg-themeBlue bg-themeOrange ms-3 px-4"
              />
            )
        )}
      </Link>
    );
  }

  return (
    <NavLink
      to={"/"}
      className={"font-semibold relative cursor-pointer mx-3"}
      onMouseEnter={mouseEnterHandler}
      onMouseLeave={mouseLeaveHandler}
    >
      {children}
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="w-full mx-auto h-0.5 absolute block dark:bg-themeBlue bg-themeOrange ms-3 px-4"
            />
          )
      )}
    </NavLink>
  );
};

export default BigNavLink;

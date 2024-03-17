import { useTransition, animated } from "@react-spring/web";
import { useState } from "react";
import { Link } from "react-scroll";

interface IBigNavLinkProps {
  to: string;
  children: string;
}

const BigNavLink = ({ to, children }: IBigNavLinkProps) => {
  // const [props, api] =
  const [show, setShow] = useState<boolean>(false);
  const transition = useTransition(show, {
    from: { scale: 0 },
    enter: { scale: 1 },
    leave: { scale: 0 },
  });
  return (
    <Link
      className={"font-semibold relative cursor-pointer mx-3 hover:opacity-75"}
      activeClass=" text-orange-400 dark:text-blue-300"
      to={to}
      smooth={true}
      spy={true}
      offset={-90}
      duration={400}
      onSetActive={() => setShow(true)}
      onSetInactive={() => setShow(false)}
    >
      {children}
      {transition(
        (style, item) =>
          item && (
            <animated.div
              style={style}
              className="w-full mx-auto h-0.5 absolute block dark:bg-blue-300 bg-orange-400 ms-3 px-4"
            />
          )
      )}
    </Link>
  );
};

export default BigNavLink;

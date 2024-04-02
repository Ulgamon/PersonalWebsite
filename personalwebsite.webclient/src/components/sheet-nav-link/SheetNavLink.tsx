import { NavLink, useLocation } from "react-router-dom";
import { Link } from "react-scroll";

interface ISheetNavLinkProps {
  to: string;
  children: string;
}

const SheetNavLink = ({ to, children }: ISheetNavLinkProps) => {
  const location = useLocation();

  if (location.pathname === "/") {
    return (
      <Link
        className={
          "font-semibold w-full cursor-pointer py-2 ps-4 block my-1 rounded-xl hover:bg-themeOrange hover:dark:bg-themeBlue"
        }
        activeClass=" bg-themeOrange dark:bg-themeBlue"
        to={to}
        smooth={true}
        spy={true}
        offset={-90}
        duration={400}
      >
        {children}
      </Link>
    );
  }

  return (
    <NavLink
      to={"/"}
      className={
        "font-semibold w-full cursor-pointer py-2 ps-4 block my-1 rounded-xl hover:bg-themeOrange hover:dark:bg-themeBlue"
      }
    >
      {children}
    </NavLink>
  );
};

export default SheetNavLink;

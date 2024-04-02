import { Link } from "react-scroll";

interface ISheetNavLinkProps {
  to: string;
  children: string;
}

const SheetNavLink = ({ to, children }: ISheetNavLinkProps) => {
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
};

export default SheetNavLink;

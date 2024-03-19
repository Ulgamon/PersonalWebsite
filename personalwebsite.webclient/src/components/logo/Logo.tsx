import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/">
      <h2 className="font-CafeDeParis ms-4 mt-3 text-4xl dark:text-themeBlue rounded-xl text-themeOrange">
        Justin
      </h2>
    </NavLink>
  );
};

export default Logo;

import { NavLink } from "react-router-dom";

const Logo = () => {
  return (
    <NavLink to="/">
      <h2 className="font-CafeDeParis ms-4 mt-3 text-4xl dark:text-blue-300 rounded-xl text-orange-300">
        Justin
      </h2>
    </NavLink>
  );
};

export default Logo;

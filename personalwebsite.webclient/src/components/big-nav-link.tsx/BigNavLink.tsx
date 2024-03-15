import { NavLink } from "react-router-dom";

interface IBigNavLinkProps {
  to: string;
  children: string;
}

const BigNavLink = ({ to, children }: IBigNavLinkProps) => {
  return (
    <NavLink className="font-semibold mx-3 hover:opacity-75" to={to}>
      {children}
    </NavLink>
  );
};

export default BigNavLink;

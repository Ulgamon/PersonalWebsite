import { NavLink } from "react-router-dom";
import { Badge } from "../ui/badge";
import { ReactNode } from "react";

export enum LinkMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

interface CustomNavLinkProps {
  type: LinkMethod;
  children?: ReactNode;
  to: string;
}

function CustomNavLink({ type, children, to }: CustomNavLinkProps) {
  let color: string = "bg-green-300";
  switch (type) {
    case LinkMethod.POST:
      color = "bg-yellow-400";
      break;
    case LinkMethod.DELETE:
      color = "bg-red-400";
      break;
    case LinkMethod.PUT:
      color = "bg-orange-400";
      break;
  }

  return (
    <li>
      <NavLink
        className={({ isActive }) => {
          const defStyle: string =
            "grid grid-cols-2 hover:bg-slate-300 py-3 px-2 truncate ";
          return isActive ? defStyle + " bg-slate-200 " : defStyle;
        }}
        to={to}
      >
        <Badge className={"font-bold me-3 w-fit " + color}>{type}</Badge>
        {children}
      </NavLink>
    </li>
  );
}

export default CustomNavLink;

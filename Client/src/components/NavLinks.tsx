import { useDashboardContext } from "../pages/Dashboard";
import links from "../utils/links";
import { NavLink } from "react-router";

interface NavLinkType {
  isBigSideBar?: boolean;
}

function NavLinks({ isBigSideBar = false }: NavLinkType) {
  const { toggleSideBar, user } = useDashboardContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, icon } = link;
        const { role } = user;
        if (role !== "admin" && path === "admin") return;
        return (
          <NavLink
            to={path}
            key={text}
            className={"nav-link"}
            onClick={isBigSideBar ? () => {} : toggleSideBar}
            end
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
}

export default NavLinks;

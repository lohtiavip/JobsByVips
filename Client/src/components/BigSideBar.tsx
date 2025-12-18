import Wrapper from "../assets/wrappers/BigSideBar";
import { useDashboardContext } from "../pages/Dashboard";
import Logo from "./Logo";
import NavLinks from "./NavLinks";

export default function BigSideBar() {
  const { showSideBar } = useDashboardContext();
  return (
    <Wrapper>
      <div
        className={
          !showSideBar ? "sidebar-container show-sidebar" : "sidebar-container"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSideBar />
        </div>
      </div>
    </Wrapper>
  );
}

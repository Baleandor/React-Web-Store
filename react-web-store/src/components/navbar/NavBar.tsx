import { NavLink } from "react-router";
import { ROUTES } from "../../utils/routes";
import CartLink from "./CartLink";
import SearchBar from "./SearchBar";
import StoreLogo from "./StoreLogo";
import UserMenu from "./UserMenu";

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-lime-900 bg-zinc-800/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
        <StoreLogo />

        <div className="order-last w-full md:order-none md:mx-auto md:w-auto md:max-w-xl md:flex-1">
          <SearchBar />
        </div>

        <nav className="ml-auto flex items-center gap-1 sm:gap-2 md:ml-0">
          <UserMenu />
          <NavLink
            to={ROUTES.SELL}
            className={({ isActive }) =>
              `rounded-md px-3 py-1.5 text-sm text-cyan-200 hover:bg-lime-900/60 hover:text-cyan-100 ${
                isActive ? "bg-lime-900/60" : ""
              }`
            }
          >
            Sell items
          </NavLink>
          <CartLink />
        </nav>
      </div>
    </header>
  );
}

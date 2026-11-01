import { useCallback, useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { supabaseClient } from "../../supabase/client";
import { useAppSelector } from "../../store/hooks";
import { useClickOutside } from "../../hooks/useClickOutside";
import { useNotify } from "../../hooks/useNotify";
import { ROUTES } from "../../utils/routes";

const menuItemClass =
  "block w-full px-3 py-2 text-left text-sm text-cyan-200 hover:bg-lime-900/60 hover:text-cyan-100";

export default function UserMenu() {
  const { user, status } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const notify = useNotify();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const close = useCallback(() => setIsOpen(false), []);
  useClickOutside(containerRef, close, isOpen);

  if (status === "loading") return <span className="w-20" />;

  if (!user) {
    return (
      <Link
        to={ROUTES.LOGIN}
        className="rounded-md px-3 py-1.5 text-sm text-cyan-200 hover:bg-lime-900/60 hover:text-cyan-100"
      >
        Sign in
      </Link>
    );
  }

  const logout = async () => {
    close();
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      notify.error(error);
      return;
    }
    notify.success("Logged out. Come back for more krumpin'!");
    navigate(ROUTES.HOME);
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
        className="flex max-w-40 items-center gap-1 rounded-md px-3 py-1.5 text-sm text-cyan-200 hover:bg-lime-900/60 hover:text-cyan-100"
      >
        <span className="truncate">Hello, {user.displayName}!</span>
        <span aria-hidden>▾</span>
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full right-0 z-50 mt-1 w-44 overflow-hidden rounded-md border border-lime-700 bg-zinc-800 py-1 shadow-xl"
        >
          <Link
            role="menuitem"
            to={ROUTES.MY_WISHLIST}
            onClick={close}
            className={menuItemClass}
          >
            Wishlist
          </Link>
          <Link
            role="menuitem"
            to={ROUTES.MY_OFFERS}
            onClick={close}
            className={menuItemClass}
          >
            My offers
          </Link>
          <button
            role="menuitem"
            type="button"
            onClick={logout}
            className={menuItemClass}
          >
            Log out
          </button>
        </div>
      )}
    </div>
  );
}

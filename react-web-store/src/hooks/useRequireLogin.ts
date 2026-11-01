import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAppSelector } from "../store/hooks";
import { ROUTES } from "../utils/routes";

/**
 * Returns a guard that runs `action` when signed in, otherwise sends the
 * user to the login page and brings them back here afterwards.
 */
export function useRequireLogin() {
  const user = useAppSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const location = useLocation();

  return useCallback(
    (action: () => void) => {
      if (user) action();
      else navigate(ROUTES.LOGIN, { state: { from: location } });
    },
    [user, navigate, location],
  );
}

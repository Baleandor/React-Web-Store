import { Navigate, Outlet, useLocation } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { ROUTES } from "../../utils/routes";
import Spinner from "../ui/Spinner";

/** Renders child routes for signed-in users; everyone else goes to the login page. */
export default function RequireAuth() {
  const { user, status } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (status === "loading") return <Spinner />;
  if (!user)
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;

  return <Outlet />;
}

import { isRouteErrorResponse, Link, useRouteError } from "react-router";
import { ROUTES } from "../../utils/routes";

export default function RouteError() {
  const error = useRouteError();
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : error instanceof Error
      ? error.message
      : "Unknown error";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-6 text-center">
      <img src="/images/KRUMPIN.png" alt="" className="h-48" />
      <h1 className="text-4xl font-bold text-red-300">Somefing got krumped!</h1>
      <p className="text-lime-200/80">{message}</p>
      <Link to={ROUTES.HOME} className="btn">
        Back to home
      </Link>
    </div>
  );
}

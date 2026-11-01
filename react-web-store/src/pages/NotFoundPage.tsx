import { Link } from "react-router";
import { ROUTES } from "../utils/routes";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="text-7xl font-bold text-lime-400">404</p>
      <h1 className="text-3xl font-bold text-lime-100">Page not found!</h1>
      <p className="text-lime-200/70">
        Da page ya lookin' for got krumped, or it never existed.
      </p>
      <Link to={ROUTES.HOME} className="btn">
        Back to home
      </Link>
    </div>
  );
}

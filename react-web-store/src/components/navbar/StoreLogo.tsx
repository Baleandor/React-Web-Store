import { Link } from "react-router";
import { ROUTES } from "../../utils/routes";

export default function StoreLogo() {
  return (
    <Link to={ROUTES.HOME} className="shrink-0">
      <img
        src="/images/goffrocker.png"
        alt="Dok Scrap Krumpa's store - home"
        className="h-12 w-auto sm:h-14"
      />
    </Link>
  );
}

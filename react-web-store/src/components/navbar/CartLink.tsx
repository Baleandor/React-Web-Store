import { Link } from "react-router";
import { useAppSelector } from "../../store/hooks";
import { selectCartQuantity } from "../../store/cartSelectors";
import { ROUTES } from "../../utils/routes";

export default function CartLink() {
  const cartQuantity = useAppSelector(selectCartQuantity);

  return (
    <Link
      to={ROUTES.CART}
      aria-label={`Cart, ${cartQuantity} item${cartQuantity === 1 ? "" : "s"}`}
      className="group relative block size-12 p-1"
    >
      <img
        src="/images/shopping-cart.png"
        alt=""
        className="size-full object-contain transition-transform group-hover:scale-110"
      />
      {cartQuantity > 0 && (
        <span className="absolute -top-0.5 -right-0.5 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-zinc-800 bg-red-600 px-1 text-[10px] font-bold text-white">
          {cartQuantity > 99 ? "99+" : cartQuantity}
        </span>
      )}
    </Link>
  );
}

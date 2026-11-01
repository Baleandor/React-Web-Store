import { Link } from "react-router";
import EmptyState from "../components/ui/EmptyState";
import PageHeader from "../components/ui/PageHeader";
import ProductImage from "../components/ui/ProductImage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectCartItems,
  selectCartQuantity,
  selectCartTotal,
} from "../store/cartSelectors";
import {
  clearCart,
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  type CartItem,
} from "../store/cartSlice";
import { formatPrice } from "../utils/format";
import { paths, ROUTES } from "../utils/routes";

function CartRow({ item }: { item: CartItem }) {
  const dispatch = useAppDispatch();

  return (
    <li className="flex gap-4 py-4">
      <Link to={paths.product(item.id)} className="shrink-0">
        <ProductImage src={item.image} alt={item.title} className="size-24" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <Link
          to={paths.product(item.id)}
          className="line-clamp-2 text-lime-50 hover:underline"
        >
          {item.title}
        </Link>
        <div className="mt-auto flex flex-wrap items-center gap-4">
          <div className="flex items-center rounded-md border border-lime-700">
            <button
              type="button"
              aria-label={`Decrease quantity of ${item.title}`}
              className="px-3 py-1 text-cyan-200 hover:bg-lime-900/60"
              onClick={() => dispatch(decreaseQuantity(item.id))}
            >
              −
            </button>
            <span className="min-w-10 px-2 text-center text-lime-100">
              {item.quantity}
            </span>
            <button
              type="button"
              aria-label={`Increase quantity of ${item.title}`}
              className="px-3 py-1 text-cyan-200 hover:bg-lime-900/60"
              onClick={() => dispatch(increaseQuantity(item.id))}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="text-sm link"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      </div>

      <div className="shrink-0 text-right">
        <p className="text-lg font-semibold text-lime-100">
          {formatPrice(item.price * item.quantity)}
        </p>
        {item.quantity > 1 && (
          <p className="text-sm text-lime-200/70">
            {formatPrice(item.price)} each
          </p>
        )}
      </div>
    </li>
  );
}

export default function CartPage() {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const quantity = useAppSelector(selectCartQuantity);
  const total = useAppSelector(selectCartTotal);

  if (items.length === 0) {
    return (
      <EmptyState title="Yer cart is empty">
        <Link to={ROUTES.HOME} className="btn">
          Go find some loot
        </Link>
      </EmptyState>
    );
  }

  return (
    <>
      <PageHeader title="Your cart" />
      <div className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <ul className="divide-y divide-lime-900 card px-4">
          {items.map((item) => (
            <CartRow key={item.id} item={item} />
          ))}
        </ul>

        <aside className="flex h-fit flex-col gap-4 card p-5">
          <h2 className="text-lg font-semibold text-lime-100">Summary</h2>
          <div className="flex justify-between text-lime-200/80">
            <span>Items</span>
            <span>{quantity}</span>
          </div>
          <div className="flex justify-between border-t border-lime-900 pt-4 text-xl font-semibold text-lime-100">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <button
            type="button"
            className="btn"
            onClick={() => dispatch(clearCart())}
          >
            Clear cart
          </button>
        </aside>
      </div>
    </>
  );
}

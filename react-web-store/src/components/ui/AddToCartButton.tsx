import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addToCart } from "../../store/cartSlice";
import { selectItemQuantity } from "../../store/cartSelectors";
import { useRequireLogin } from "../../hooks/useRequireLogin";
import { useNotify } from "../../hooks/useNotify";
import type { Product } from "../../types";

type AddToCartButtonProps = {
  product: Pick<Product, "id" | "title" | "price" | "image">;
};

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const dispatch = useAppDispatch();
  const notify = useNotify();
  const requireLogin = useRequireLogin();
  const quantity = useAppSelector((state) =>
    selectItemQuantity(state, product.id),
  );

  const handleClick = () =>
    requireLogin(() => {
      const { id, title, price, image } = product;
      dispatch(addToCart({ id, title, price, image }));
      notify.success("Added to cart");
    });

  return (
    <button type="button" className="btn btn-solid" onClick={handleClick}>
      {quantity > 0 ? `In cart (${quantity}) · Add more` : "Add to cart"}
    </button>
  );
}

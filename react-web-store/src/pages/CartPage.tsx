import { useAppSelector } from "../store/hooks";
import { selectCartItemsArray, selectTotalCartPrice } from "../store/cartSelectors";
import ItemInCart from "../components/common/ItemInCart";

export default function CartPage() {
  const cartItems = useAppSelector(selectCartItemsArray);
  const totalCartPrice = useAppSelector(selectTotalCartPrice);

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="text-lime-300 text-center">No items in cart</div>
      ) : (
        <>
          <div>
            {cartItems.map((item) => {
              return <ItemInCart key={item.id} {...item} />;
            })}
          </div>
          <div>
            <span className="p-2 text-lime-300 text-center">
              Total: ${totalCartPrice}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

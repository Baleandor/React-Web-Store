import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";
import { selectCartQuantity } from "../../../store/cartSelectors";
import { ROUTE_PATH } from "../../../utils/urls";

export default function ShoppingCart() {
  const navigate = useNavigate();
  const cartQuantity = useAppSelector(selectCartQuantity);

  return (
    <div
      className="relative w-20 h-20 p-2 cursor-pointer group"
      onClick={() => navigate(ROUTE_PATH.CART)}
    >
      {/* Cart Icon */}
      <img
        src="/images/shopping-cart.png"
        alt="Shopping Cart"
        className="w-full h-full object-contain transition-transform group-hover:scale-110"
      />

      {/* Quantity Badge */}
      {cartQuantity > 0 && (
        <div className="absolute inset-0 flex items-center justify-center translate-x-1">
          <div className="flex items-center justify-center min-w-[26px] h-6 bg-red-600 text-white text-xs font-bold rounded-full border-2 border-zinc-800">
            {cartQuantity > 99 ? "99+" : cartQuantity}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryItem } from "../../utils/api";
import { useAppDispatch } from "../../store/hooks";
import { increaseItemQuantity, decreaseItemQuantity, removeFromCart, setItemPrice } from "../../store/cartSlice";
import { CategoryItemDetailsType } from "../../types";
import { ErrorTracker } from "../../utils/errorTracker";
import ImageWithLoading from "./ImageWithLoading";

type ItemInCartProps = {
  id: number;
  quantity: number;
  price: number;
};

export default function ItemInCart({ id, quantity, price }: ItemInCartProps) {
  const dispatch = useAppDispatch();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { data, error, isLoading } = useQuery<CategoryItemDetailsType, Error>(
    ["category", id],
    () => getCategoryItem(id)
  );

  useEffect(() => {
    if (data?.id && data?.price) {
      dispatch(setItemPrice({ id: data.id, price: data.price }));
    }
  }, [data?.price, data?.id, dispatch]);

  if (isLoading) {
    return (
      <div className="p-2 m-2 rounded border border-lime-800 text-lime-300 flex text-center">
        <div className="flex-1 text-lime-200">Loading...</div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-2 m-2 rounded border border-lime-800 text-lime-300 flex text-center">
        <div className="flex-1 text-red-400">Item not found</div>
      </div>
    );
  }

  return (
    <div className=" border-b border-lime-700 p-4 flex items-start gap-4">
      {/* Product Image */}
      <div className="flex-shrink-0">
        <ImageWithLoading
          src={data.image}
          alt={data.title}
          className="w-32 h-32 object-cover rounded border border-lime-600"
          onLoad={() => setIsImageLoaded(true)}
          onError={() => setIsImageLoaded(true)} // Show content even if image fails
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0" style={{ opacity: isImageLoaded ? 1 : 0.5, transition: 'opacity 0.3s ease' }}>
        <h3 className="text-lime-100 font-medium text-lg mb-2 line-clamp-2">
          {data.title}
        </h3>

        {/* Quantity and Controls */}
        <div className="flex items-center gap-4 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-lime-200 text-sm">Qty:</span>
            <div className="flex items-center border border-lime-600 rounded">
              <button
                className="px-2 py-1 text-cyan-200 hover:text-cyan-100 hover:bg-lime-800 transition-colors"
                onClick={() => dispatch(decreaseItemQuantity(id))}
              >
                -
              </button>
              <span className="px-3 py-1 text-lime-100 bg-zinc-700 min-w-[40px] text-center">
                {quantity}
              </span>
              <button
                className="px-2 py-1 text-cyan-200 hover:text-cyan-100 hover:bg-lime-800 transition-colors"
                onClick={() => dispatch(increaseItemQuantity(id))}
              >
                +
              </button>
            </div>
          </div>

          <button
            className="text-cyan-200 hover:text-cyan-100 text-sm underline"
            onClick={() => dispatch(removeFromCart(id))}
          >
            Delete
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="flex-shrink-0 text-right" style={{ opacity: isImageLoaded ? 1 : 0.5, transition: 'opacity 0.3s ease' }}>
        <div className="text-lime-100 font-bold text-xl">${data.price * quantity}</div>
        {quantity > 1 && (
          <div className="text-lime-300 text-sm mt-1">${data.price} each</div>
        )}
      </div>

      <ErrorTracker error={error} />
    </div>
  );
}

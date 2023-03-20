import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../../hooks/CartContext";

export default function ShoppingCart() {

    const navigate = useNavigate()

    const { cartQuantity } = useCart()



    return (
        <div className="w-40 h-20">
            <img src="/images/shopping-cart.png" className=" w-24 h-12 cursor-pointer relative top-4" onClick={() => navigate(`/cart`)}></img>
            {cartQuantity > 0 && <div className="flex h-5 w-5 absolute top-11 right-20 p-3 items-center justify-center bg-green-900 text-red-400 rounded-full">{cartQuantity}</div>}
        </div>
    )
}
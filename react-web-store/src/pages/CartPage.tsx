import React from "react";
import { useCart } from "../hooks/CartContext";
import ItemInCart from "../components/common/ItemInCart";


export default function CartPage() {

    const { totalCartPrice, cartItems } = useCart()


    return (
        <div>
            <div>
                {cartItems.map(item => {
                    return (
                        <ItemInCart key={item.id} {...item} />
                    )
                })}
            </div>
            <div>
                <span className="p-2 text-lime-300 text-center">Total: ${totalCartPrice}</span>
            </div>
        </div>
    )
}
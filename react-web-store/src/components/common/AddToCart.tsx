import React from "react";
import { useCart } from "../../hooks/CartContext";

type AddToCartProps = {
    id: number
}

export default function AddToCart({ id }: AddToCartProps) {

    const { increaseItemCartQuantity } = useCart()

    return (

        <button className="p-1 bg-lime-800 rounded cursor-pointer" onClick={() => increaseItemCartQuantity(id)}>Cart</button>

    )
}
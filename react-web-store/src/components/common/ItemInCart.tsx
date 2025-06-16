import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryItem } from "../../utils/api";
import { useCart } from "../../hooks/CartContext";
import { CategoryItemDetailsType } from "../../types";
import { errorTracker } from "../../utils/errorTracker";


type ItemInCartProps = {
    id: number,
    quantity: number,
    title: string,
    price: number,
    description: string,
    image: string
}

export default function ItemInCart({ id, quantity, title, price, description, image }: ItemInCartProps) {

    const { data, error } = useQuery<CategoryItemDetailsType, Error>(["category", id], () => getCategoryItem(id))

    errorTracker(error)

    const { increaseItemCartQuantity, decreaseItemCartQuantity, removeFromCart, setItemPrice } = useCart()

    const totalPrice = data?.price ? data.price * quantity : 0

    useEffect(() => {
        if (data?.id && data?.price) {

            setItemPrice(data.id, data.price)
        }
    }, [data?.price, data?.id, setItemPrice])


    return (
        <div className="p-2 m-2 rounded border border-lime-800 text-lime-300 flex text-center">
            <div className="flex-1">
                <div className="p-1">{title}</div>
                <div className="p-1">{description}</div>
                <div className="p-1">${price}</div>
            </div>
            <div className="flex-1">
                <img src={image} className="h-20 object-fill"></img>
            </div>
            <div className="flex-1 flex">
                <button className="p-1 mx-1 border border-lime-400 rounded flex-1 max-w-[30px] text-cyan-200 hover:text-cyan-100" onClick={() => increaseItemCartQuantity(id)}>+</button>
                {quantity > 1 && <div className="p-1 text-center flex-1 max-w-[30px] text-lime-100">x{quantity}</div>}
                <button className="p-1 mx-1 border border-lime-400 rounded flex-1 max-w-[30px] text-cyan-200 hover:text-cyan-100" onClick={() => decreaseItemCartQuantity(id)}>-</button>
                <button className="p-1 mx-1 border border-lime-400 rounded flex-1 max-w-[30px] text-cyan-200 hover:text-cyan-100" onClick={() => removeFromCart(id)}>X</button>
            </div>
        </div>
    )
}
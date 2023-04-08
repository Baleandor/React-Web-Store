import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCategoryItem } from "../../utils/api";
import { useCart } from "../../hooks/CartContext";
import { CategoryItemDetailsType } from "../../types";


type ItemInCartProps = {
    id: number,
    quantity: number,

}

export default function ItemInCart({ id, quantity }: ItemInCartProps) {

    const { data, error } = useQuery<CategoryItemDetailsType, Error>(["category", id], () => getCategoryItem(id))

    error && alert(error.message)

    const { increaseItemCartQuantity, decreaseItemCartQuantity, removeFromCart, setItemPrice } = useCart()

    const totalPrice = data?.price ? data.price * quantity : 0

    useEffect(() => {
        if (data?.id && data?.price) {

            setItemPrice(data.id, data.price)
        }
    }, [data?.price, data?.id, setItemPrice])


    return (
        <div className="p-2 m-2 rounded border border-lime-800 text-lime-300 flex text-center">
            <div className="h-60 w-64 ">
                <img src={data?.image} className="h-60 w-64 object-fill" />
            </div>

            <div className="p-1 flex flex-col justify-between flex-1">
                <div className="flex justify-between">
                    <span className="max-w-[200px]">{data?.title} </span>
                    <span >Price: ${data?.price}</span>
                </div>

                <div className="flex items-center justify-center">
                    <button className="p-1 mx-1 border border-lime-400 rounded flex-1 max-w-[30px] text-cyan-400" onClick={() => increaseItemCartQuantity(id)}>+</button>
                    {quantity > 1 && <div className="p-1 text-center flex-1 max-w-[30px] text-lime-400">x{quantity}</div>}
                    <button className="p-1 mx-1 border border-lime-400 rounded flex-1 max-w-[30px] text-cyan-400" onClick={() => decreaseItemCartQuantity(id)}>-</button>
                    <button className="p-1 mx-1 border border-lime-400 rounded flex-1 max-w-[30px] text-cyan-400" onClick={() => removeFromCart(id)}>X</button>
                    <span className="flex-1 max-w-[30px]"> ${totalPrice}</span>
                </div>

            </div>
        </div>
    )
}
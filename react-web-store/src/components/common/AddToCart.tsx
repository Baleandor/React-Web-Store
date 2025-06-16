import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";
import { supabaseClient } from "../../supabase/client";
import { ROUTE_PATH } from "../../utils/urls";


type AddToCartProps = {
    id: number
}


export default function AddToCart({ id }: AddToCartProps) {

    const navigate = useNavigate()

    const { increaseItemCartQuantity } = useCart()

    const handleCart = async () => {

        const { data, error } = await supabaseClient.auth.getSession()

        error && alert(error.message)

        if (data?.session?.user) {
            increaseItemCartQuantity(id)
        } else {
            navigate(ROUTE_PATH.LOGIN)
        }
    }


    return (
        <button className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100" onClick={handleCart}>Cart</button>
    )
}
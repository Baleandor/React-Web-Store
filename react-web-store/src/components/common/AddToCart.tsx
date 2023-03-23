import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/CartContext";
import { supabaseClient } from "../../supabase/client";


type AddToCartProps = {
    id: number
}


export default function AddToCart({ id }: AddToCartProps) {

    const navigate = useNavigate()

    const { increaseItemCartQuantity } = useCart()

    const handleCart = async () => {

        const { data } = await supabaseClient.auth.getSession()

        if (data?.session?.user) {
            increaseItemCartQuantity(id)
        } else {
            navigate('/login')
        }
    }


    return (
        <button className="p-1 border border-lime-400 text-cyan-400 rounded cursor-pointer" onClick={handleCart}>Cart</button>
    )
}
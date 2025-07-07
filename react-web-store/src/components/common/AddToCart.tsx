import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hooks";
import { increaseItemQuantity } from "../../store/cartSlice";
import { supabaseClient } from "../../supabase/client";
import { ROUTE_PATH } from "../../utils/urls";
import ShrekErrorBox from "./ShrekErrorBox";


type AddToCartProps = {
    id: number
}


export default function AddToCart({ id }: AddToCartProps) {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    const handleCart = async () => {

        const { data, error } = await supabaseClient.auth.getSession()

        if (error) {
            setErrorMessage(error.message)
            return
        }

        if (data?.session?.user) {
            dispatch(increaseItemQuantity(id))
        } else {
            navigate(ROUTE_PATH.LOGIN)
        }
    }


    return (
        <>
            <button className="p-1 border border-lime-400 text-cyan-200 rounded cursor-pointer hover:text-cyan-100" onClick={handleCart}>Cart</button>
            <ShrekErrorBox errorMessage={errorMessage} />
        </>
    )
}
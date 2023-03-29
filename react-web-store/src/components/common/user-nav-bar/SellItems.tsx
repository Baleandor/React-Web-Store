import React from "react";
import {  useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";


export default function SellItems() {

    const navigate = useNavigate()

    const handleSellItemsClick = async () => {

        const { data, error } = await supabaseClient.auth.getSession()

        error && alert(error.message)

        if (data?.session?.user) {
            navigate('/sell-items')
        } else {
            navigate('/login')
        }
    }


    return (
        <div className="inline-flex relative text-cyan-400 w-28 h-14 mx-1 p-1 justify-center top-4 cursor-pointer hover:border-lime-400 hover:border hover:rounded">
            <span className="self-center text-xl" onClick={handleSellItemsClick}>Sell Items</span>
        </div>
    )
}
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";




export default function UserProfileDropDown() {

    const navigate = useNavigate()

    const logout = async () => {
        await supabaseClient.auth.signOut()
    }


    return (
        <ul className="absolute grid grild-cols-1 place-items-center bg-lime-900  text-lime-400 w-24 h-28 justify-center align-center top-16 right-[290px] text-center rounded">
            <a className="cursor-pointer hover:text-lime-100 hover:underline" >Wishlist</a>
            <a className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => navigate('/my-offers')}>My Offers</a>
            <a className="cursor-pointer hover:text-lime-100 hover:underline" onClick={logout}>Logout</a>
        </ul>
    )
}
import React from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";

type UserProfileDropDownType = {
    handleClick: () => void
}


export default function UserProfileDropDown({ handleClick }: UserProfileDropDownType) {

    const navigate = useNavigate()

    const logout = async () => {
        await supabaseClient.auth.signOut()
    }


    return (
        <ul className="absolute grid grild-cols-1 place-items-center bg-lime-900  text-lime-400 w-24 h-28 justify-center align-center top-16 right-[290px] text-center rounded">
            <li className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => {
                navigate('/my-wishlist')
                handleClick()
            }}>Wishlist</li>
            <li className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => {
                navigate('/my-offers')
                handleClick()
            }}>My Offers</li>
            <li className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => {
                logout()
                handleClick()
            }}>Logout</li>
        </ul>
    )
}
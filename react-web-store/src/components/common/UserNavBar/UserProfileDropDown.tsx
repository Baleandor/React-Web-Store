import React from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import { ROUTE_PATH } from "../../../utils/urls";


type UserProfileDropDownType = {
    closeProfileDropdown: () => void
}


export default function UserProfileDropDown({ closeProfileDropdown }: UserProfileDropDownType) {

    const navigate = useNavigate()

    const profileDropdownMenuClick = (address: string) => {
        navigate(address)
        closeProfileDropdown()
    }

    const logout = async () => {

        const { error } = await supabaseClient.auth.signOut()

        error && alert(error.message)
    }


    return (
        <ul className="absolute grid grild-cols-1 place-items-center bg-lime-900  text-lime-400 w-24 h-28 justify-center align-center top-16 right-[290px] text-center rounded">
            <li className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => profileDropdownMenuClick(ROUTE_PATH.MY_WISHLIST)}>Wishlist</li>
            <li className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => profileDropdownMenuClick(ROUTE_PATH.MY_OFFERS)}>My Offers</li>
            <li className="cursor-pointer hover:text-lime-100 hover:underline" onClick={() => {
                logout()
                closeProfileDropdown()
            }}>Logout</li>
        </ul>
    )
}
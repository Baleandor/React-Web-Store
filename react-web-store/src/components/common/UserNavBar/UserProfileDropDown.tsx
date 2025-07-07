import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import { ROUTE_PATH } from "../../../utils/urls";
import ShrekErrorBox from "../ShrekErrorBox";


type UserProfileDropDownType = {
    closeProfileDropdown: () => void
}


export default function UserProfileDropDown({ closeProfileDropdown }: UserProfileDropDownType) {

    const navigate = useNavigate()
    const location = useLocation();
    const isFirstRender = useRef(true);
    const dropdownRef = useRef<HTMLUListElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined)

    // Close dropdown when route changes (but not on initial mount)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        closeProfileDropdown();
    }, [location.pathname, closeProfileDropdown]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeProfileDropdown();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeProfileDropdown]);

    const profileDropdownMenuClick = (address: string) => {
        navigate(address)
        closeProfileDropdown()
    }

    const logout = async () => {

        const { error } = await supabaseClient.auth.signOut()

        if (error) {
            setErrorMessage(error.message)
        }
    }


    return (
        <>
            <ul ref={dropdownRef} className="absolute grid grild-cols-1 place-items-center bg-lime-900  text-cyan-200 w-24 h-28 justify-center align-center top-14 right-40 text-center rounded">
                <li className="cursor-pointer hover:text-cyan-100 hover:underline" onClick={() => profileDropdownMenuClick(ROUTE_PATH.MY_WISHLIST)}>Wishlist</li>
                <li className="cursor-pointer hover:text-cyan-100 hover:underline" onClick={() => profileDropdownMenuClick(ROUTE_PATH.MY_OFFERS)}>My Offers</li>
                <li className="cursor-pointer hover:text-cyan-100 hover:underline" onClick={() => {
                    logout()
                    closeProfileDropdown()
                }}>Logout</li>
            </ul>
            <ShrekErrorBox errorMessage={errorMessage} />
        </>
    )
}
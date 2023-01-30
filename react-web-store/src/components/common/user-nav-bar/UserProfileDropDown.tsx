import React from "react";

export default function UserProfileDropDown() {
    return (
        <ul className="absolute grid grild-cols-1 place-items-center bg-lime-900  text-lime-400 w-24 h-28 justify-center align-center top-16 right-[290px] text-center rounded">
            <a className="cursor-pointer hover:text-lime-100 hover:underline">Profile</a>
            <a className="cursor-pointer hover:text-lime-100 hover:underline">My Offers</a>
            <a className="cursor-pointer hover:text-lime-100 hover:underline">Logout</a>
        </ul>
    )
}
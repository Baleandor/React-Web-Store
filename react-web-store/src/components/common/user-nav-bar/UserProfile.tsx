import React from "react";
import { useState } from "react";
import UserProfileDropDown from "./UserProfileDropDown";

export default function UserProfile() {
    const [open, setOpen] = useState(false)

    return (
        <>
            <div className="inline-flex relative text-lime-400 w-28 h-14 mx-1 p-1 justify-center align-center top-4 text-center cursor-pointer hover:border-lime-400 hover:border hover:rounded" onClick={() => setOpen(!open)}>
                <div>
                    Hello Username!
                </div>
            </div>
            {open && <UserProfileDropDown />}
        </>
    )
}
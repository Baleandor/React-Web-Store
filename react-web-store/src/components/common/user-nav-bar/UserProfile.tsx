import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import UserProfileDropDown from "./UserProfileDropDown";

const { data, error } = await supabaseClient.auth.getSession()

export default function UserProfile() {
    const [open, setOpen] = useState(false)

    const navigate = useNavigate()

    const [user, setUser] = useState<any>(null);

    useEffect(() => {

        setUser(data?.session?.user)

        const { data: authListener } = supabaseClient.auth.onAuthStateChange(
            (event) => {
                switch (event) {
                    case "SIGNED_IN":
                        setUser(data?.session?.user);
                        break;
                    case "SIGNED_OUT":
                        setUser(null);
                        break;
                    default:
                }
            }
        )

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, [data])

    return (
        <>
            <div className="inline-flex relative text-lime-400 w-28 h-14 mx-1 p-1 justify-center align-center top-4 text-center cursor-pointer hover:border-lime-400 hover:border hover:rounded" >
                <div className="p1 flex">
                    {data.session?.user ?
                        <div className="self-center" onClick={() => setOpen(!open)}>Hello, {data.session.user.user_metadata.username}!</div>
                        : <span className="self-center text-xl" onClick={() => { navigate("/register") }}>Register</span>}
                </div>
            </div>
            {open && <UserProfileDropDown />}
        </>
    )
}



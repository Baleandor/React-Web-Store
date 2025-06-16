import React, { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import UserProfileDropDown from "./UserProfileDropDown";
import { ROUTE_PATH } from "../../../utils/urls";
import { errorTracker } from "../../../utils/errorTracker";



const { data, error } = await supabaseClient.auth.getSession()

export default function UserProfile() {

    const navigate = useNavigate()

    const [user, setUser] = useState<User | null>(null);
    
    const [open, setOpen] = useState(false)
    
    const closeProfileDropdown = () => {
        setOpen(false)
    }
    
    const openProfileDropdown = () => {
        setOpen(true)
    }
    
    
    errorTracker(error)


    useEffect(() => {

        setUser(data?.session?.user || null)

        const { data: authListener } = supabaseClient.auth.onAuthStateChange(
            (event, session) => {
                if (session?.user) {
                    setUser(session?.user || null)
                } else {
                    setUser(null)
                }
            }
        )

        return () => {
            authListener.subscription.unsubscribe();
        }
    }, [])


    return (
        <div>
            <div className="inline-flex relative text-cyan-200 hover:text-cyan-100 w-28 h-14 mx-1 p-1 justify-center align-center top-4 text-center cursor-pointer hover:border-lime-400 hover:border hover:rounded" >
                <div className="flex">
                    {user ?
                        <div className="self-center" onClick={openProfileDropdown}>Hello, {data?.session?.user.user_metadata.username}!</div>
                        : <span className="self-center text-xl" onClick={() => { navigate(ROUTE_PATH.REGISTER) }}>Register</span>}
                </div>
            </div>
            {open && <UserProfileDropDown closeProfileDropdown={closeProfileDropdown} />}
        </div>


    )
}



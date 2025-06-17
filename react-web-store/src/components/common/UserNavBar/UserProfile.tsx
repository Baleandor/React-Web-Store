import React, { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import UserProfileDropDown from "./UserProfileDropDown";
import { ROUTE_PATH } from "../../../utils/urls";
import { errorTracker } from "../../../utils/errorTracker";

const { data, error } = await supabaseClient.auth.getSession();

export default function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const [open, setOpen] = useState(false);

  const closeProfileDropdown = () => {
    setOpen(false);
  };

  const openProfileDropdown = () => {
    setOpen(true);
  };

  errorTracker(error);

  useEffect(() => {
    setUser(data?.session?.user || null);

    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          setUser(session?.user || null);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="inline-flex text-cyan-200 hover:text-cyan-100 w-18 h-8 p-1 justify-center align-center text-center cursor-pointer border border-transparent hover:border-lime-400 hover:rounded">
        <div className="flex">
          {user ? (
            <div className="self-center text-l" onClick={openProfileDropdown}>
              Hello, {data?.session?.user.user_metadata.username}!
            </div>
          ) : (
            <span
              className="self-center text-l"
              onClick={() => {
                navigate(ROUTE_PATH.REGISTER);
              }}
            >
              Register
            </span>
          )}
        </div>
      </div>
      {open && (
        <UserProfileDropDown closeProfileDropdown={closeProfileDropdown} />
      )}
    </div>
  );
}

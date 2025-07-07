import React, { useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabaseClient } from "../../../supabase/client";
import UserProfileDropDown from "./UserProfileDropDown";
import { ROUTE_PATH } from "../../../utils/urls";
import { ErrorTracker } from "../../../utils/errorTracker";

export default function UserProfile() {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<any>(null);

  const [open, setOpen] = useState(false);

  const closeProfileDropdown = () => {
    setOpen(false);
  };


  const toggleProfileDropdown = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        setError(error);
      } else {
        setUser(data?.session?.user || null);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: authListener } = supabaseClient.auth.onAuthStateChange(
      (_, session) => {
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
            <div className="self-center text-l" onClick={toggleProfileDropdown}>
              Hello, {user.user_metadata.display_name}!
            </div>
          ) : (
            <span
              className="self-center text-l"
              onClick={() => {
                navigate(ROUTE_PATH.REGISTER);
              }}
            >
              Sign In
            </span>
          )}
        </div>
      </div>
      {open && (
        <UserProfileDropDown closeProfileDropdown={closeProfileDropdown} />
      )}
      <ErrorTracker error={error} />
    </div>
  );
}

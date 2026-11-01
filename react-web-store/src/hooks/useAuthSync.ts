import { useEffect } from "react";
import type { User } from "@supabase/supabase-js";
import { supabaseClient } from "../supabase/client";
import { useAppDispatch } from "../store/hooks";
import { sessionChanged, type AuthUser } from "../store/authSlice";

const toAuthUser = (user: User): AuthUser => ({
  id: user.id,
  email: user.email,
  displayName: user.user_metadata?.display_name ?? user.email ?? "Boy",
});

/** Mirrors the Supabase session into the Redux store. Mount once at the app root. */
export function useAuthSync() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Fires immediately with INITIAL_SESSION, then on every sign-in/out.
    const { data } = supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        dispatch(
          sessionChanged(session?.user ? toAuthUser(session.user) : null),
        );
      },
    );

    return () => data.subscription.unsubscribe();
  }, [dispatch]);
}

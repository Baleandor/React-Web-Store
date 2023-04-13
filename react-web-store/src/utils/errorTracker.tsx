import { AuthError } from "@supabase/supabase-js";
import { useEffect } from "react";

export const errorTracker = (error: Error | AuthError | null) => {

    useEffect(() => {

        if (error) {
            return alert(error.message)
        }

    }, [error])
}
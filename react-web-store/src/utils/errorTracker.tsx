import { AuthError } from "@supabase/supabase-js";
import React from "react";
import ShrekErrorBox from "../components/common/ShrekErrorBox";

type ErrorTrackerProps = {
    error: Error | AuthError | null
}

export const ErrorTracker: React.FC<ErrorTrackerProps> = ({ error }) => {
    return <ShrekErrorBox errorMessage={error?.message} />
}

// Deprecated: Use ErrorTracker component instead
export const errorTracker = (error: Error | AuthError | null) => {
    console.warn('errorTracker function is deprecated. Use ErrorTracker component instead.')
    // Do nothing - alerts removed
}
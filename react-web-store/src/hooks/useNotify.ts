import { useMemo } from "react";
import { useAppDispatch } from "../store/hooks";
import { showToast } from "../store/uiSlice";
import { getErrorMessage } from "../utils/errors";

export function useNotify() {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      success: (message: string) => dispatch(showToast(message, "success")),
      error: (error: unknown) =>
        dispatch(showToast(getErrorMessage(error), "error")),
    }),
    [dispatch],
  );
}

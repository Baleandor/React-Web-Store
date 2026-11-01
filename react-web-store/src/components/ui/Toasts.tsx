import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { dismissToast, type Toast } from "../../store/uiSlice";

const TOAST_DURATION_MS = 3500;

function ToastItem({ toast }: { toast: Toast }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(
      () => dispatch(dismissToast(toast.id)),
      TOAST_DURATION_MS,
    );
    return () => clearTimeout(timer);
  }, [dispatch, toast.id]);

  const isError = toast.type === "error";

  return (
    <div
      role={isError ? "alert" : "status"}
      className={`pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${
        isError
          ? "border-red-400/60 bg-zinc-900 text-red-200"
          : "border-lime-400/60 bg-lime-900 text-lime-100"
      }`}
    >
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        aria-label="Dismiss notification"
        className="text-lg leading-none opacity-70 hover:opacity-100"
        onClick={() => dispatch(dismissToast(toast.id))}
      >
        ×
      </button>
    </div>
  );
}

/** Global notification stack. Errors bring out an angry Ork. */
export default function Toasts() {
  const toasts = useAppSelector((state) => state.ui.toasts);
  const hasError = toasts.some((toast) => toast.type === "error");

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed right-4 bottom-4 z-50 flex w-80 max-w-[calc(100vw-2rem)] flex-col items-end gap-2"
    >
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} />
      ))}
      {hasError && (
        <img src="/images/KRUMPIN.png" alt="" className="h-40 drop-shadow-xl" />
      )}
    </div>
  );
}

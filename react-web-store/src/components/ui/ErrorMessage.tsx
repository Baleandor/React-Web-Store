import { getErrorMessage } from "../../utils/errors";

type ErrorMessageProps = {
  error: unknown;
  onRetry?: () => void;
};

export default function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div
      role="alert"
      className="flex flex-col items-center gap-4 card px-6 py-12 text-center"
    >
      <img src="/images/KRUMPIN.png" alt="" className="h-32" />
      <p className="text-lg text-red-300">{getErrorMessage(error)}</p>
      {onRetry && (
        <button type="button" className="btn" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
}

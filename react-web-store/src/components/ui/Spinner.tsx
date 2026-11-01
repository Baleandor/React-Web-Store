type SpinnerProps = {
  label?: string;
};

export default function Spinner({ label = "Loading..." }: SpinnerProps) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 py-16 text-lime-200"
    >
      <span className="size-8 animate-spin rounded-full border-4 border-lime-800 border-t-lime-400" />
      <span className="text-sm">{label}</span>
    </div>
  );
}
